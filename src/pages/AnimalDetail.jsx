import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaBaby,
  FaBriefcaseMedical,
  FaCamera,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaHouseChimney,
  FaLocationDot,
  FaMars,
  FaPaw,
  FaRegHeart,
  FaShieldHeart,
  FaSyringe,
  FaVenus,
  FaWeightScale,
} from 'react-icons/fa6';
import { odooApi } from '../services/odooApi.js';
import { getUser, saveUser } from '../utils/storage.js';

const text = {
  loading: '\u6b63\u5728\u5f9e Odoo \u8f09\u5165\u6bdb\u5b69\u8cc7\u6599...',
  notFound: '\u627e\u4e0d\u5230\u9019\u7b46 Odoo \u6bdb\u5b69\u7522\u54c1',
  backList: '\u56de\u6bdb\u5b69\u5217\u8868',
  home: '\u9996\u9801',
  animals: '\u6bdb\u5b69\u5217\u8868',
  status: '\u958b\u653e\u8a8d\u990a\u4e2d',
  favorite: '\u52a0\u5165\u6536\u85cf',
  removeFavorite: '\u5df2\u52a0\u5165\u6536\u85cf',
  loginFirst: '\u8acb\u5148\u767b\u5165\u6703\u54e1\uff0c\u6536\u85cf\u6703\u5132\u5b58\u5728 Odoo \u5f8c\u7aef\u3002',
  added: '\u5df2\u52a0\u5165\u6536\u85cf',
  removed: '\u5df2\u53d6\u6d88\u6536\u85cf',
  failed: '\u6536\u85cf\u66f4\u65b0\u5931\u6557',
  apply: '\u6211\u60f3\u8a8d\u990a',
  breed: '\u54c1\u7a2e',
  age: '\u5e74\u9f61',
  gender: '\u6027\u5225',
  weight: '\u9ad4\u91cd',
  personality: '\u500b\u6027',
  health: '\u5065\u5eb7\u72c0\u6cc1',
  chip: '\u6676\u7247',
  location: '\u6240\u5728\u5730',
  aboutPrefix: '\u95dc\u65bc',
  aboutEmpty: '\u5c1a\u672a\u5728 Odoo \u586b\u5beb\u95dc\u65bc\u5167\u5bb9\u3002',
  healthRecord: '\u5065\u5eb7\u7d00\u9304',
  vaccine: '\u75ab\u82d7\u63a5\u7a2e',
  deworming: '\u9ad4\u5167\u5916\u9a45\u87f2',
  neutered: '\u7d50\u7d2e\u624b\u8853',
  chipImplant: '\u6676\u7247\u690d\u5165',
  traits: '\u500b\u6027\u7279\u8cea',
  suitableHome: '\u9069\u5408\u7684\u5bb6\u5ead',
  daily: '\u7279\u7684\u65e5\u5e38',
  defaultTrait: '\u89aa\u4eba\u53cb\u5584',
  defaultHome: '\u9069\u5408\u9858\u610f\u8010\u5fc3\u966a\u4f34\u7684\u5bb6\u4eba',
  cta1: '\u6bcf\u4e00\u6b21\u8a8d\u990a\uff0c\u90fd\u662f\u4e00\u500b\u751f\u547d\u7684\u8f49\u8b8a',
  cta2: '\u7d66\u4ed6\u4e00\u500b\u5bb6\uff0c\u4ed6\u6703\u7d66\u4f60\u5168\u90e8\u7684\u611b',
  prev: '\u4e0a\u4e00\u5f35',
  next: '\u4e0b\u4e00\u5f35',
  thumbnail: '\u7e2e\u5716',
};

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => safeFavorites(getUser()?.favorites));
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setLoading(true);
    odooApi
      .getAnimal(id)
      .then(setAnimal)
      .catch(() => setAnimal(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const syncUser = () => setFavorites(safeFavorites(getUser()?.favorites));
    window.addEventListener('warm-paws:user-changed', syncUser);
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('warm-paws:user-changed', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const images = useMemo(() => {
    if (animal?.images?.length) return animal.images;
    return ['https://placehold.co/900x650/fff8ea/6f451f?text=Warm+Paws'];
  }, [animal]);

  if (loading) return <Message title={text.loading} />;
  if (!animal) return <Message title={text.notFound} actionText={text.backList} to="/animals" />;

  const isMale = String(animal.gender || '').includes('\u7537');
  const isFavorite = favorites.includes(animal.id);
  const genderIcon = isMale ? FaMars : FaVenus;
  const traitTags = animal.traitTags?.length ? animal.traitTags : [text.defaultTrait];
  const ratings = animal.ratings?.length ? animal.ratings : [];
  const suitableHomes = animal.suitableHomes?.length ? animal.suitableHomes : [text.defaultHome];
  const aboutParagraphs = [animal.rescueStory, animal.about].filter(Boolean).join('\n').split('\n').filter(Boolean);
  const move = (step) => setActive((current) => (current + step + images.length) % images.length);
  const handleFavorite = async () => {
    const user = getUser();
    if (!user?.token) {
      toast({ title: text.loginFirst, status: 'info' });
      navigate('/login');
      return;
    }

    setFavoriteLoading(true);
    try {
      const nextIds = await odooApi.toggleMyFavorite(animal.id);
      setFavorites(nextIds);
      saveUser({ ...user, favorites: nextIds });
      toast({
        title: nextIds.includes(animal.id) ? text.added : text.removed,
        status: 'success',
        duration: 1400,
      });
    } catch (error) {
      toast({ title: text.failed, description: error.message, status: 'error' });
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <Box bg="warm.cream" py={{ base: 4, md: 5 }}>
      <Container maxW="1180px" px={{ base: 4, md: 6 }}>
        <HStack mb={3} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="800" color="warm.brown" spacing={2} flexWrap="wrap">
          <Link to="/">{text.home}</Link>
          <Text>&gt;</Text>
          <Link to="/animals">{text.animals}</Link>
          <Text>&gt;</Text>
          <Text>{animal.name}</Text>
        </HStack>

        <Grid templateColumns={{ base: '1fr', lg: '1.12fr 0.88fr' }} gap={{ base: 4, lg: 5 }} alignItems="start">
          <ImageGallery images={images} animal={animal} active={active} setActive={setActive} move={move} />

          <Box bg="white" rounded="18px" p={{ base: 4, md: 5 }} boxShadow="0 12px 28px rgba(111, 69, 31, 0.10)" border="1px solid" borderColor="orange.100">
            <HStack justify="space-between" align="start">
              <Box minW={0}>
                <HStack bg="green.100" color="green.700" rounded="full" px={3} py={1} w="fit-content" mb={3}>
                  <Box boxSize="8px" rounded="full" bg="green.500" />
                  <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="900">
                    {animal.statusLabel || text.status}
                  </Text>
                </HStack>
                <HStack>
                  <Heading color="warm.brown" fontSize={{ base: '2xl', md: '3xl' }} noOfLines={1}>
                    {animal.name}
                  </Heading>
                  <Icon as={genderIcon} color={isMale ? 'blue.400' : 'pink.400'} boxSize={6} flexShrink={0} />
                </HStack>
              </Box>
              <IconButton
                aria-label={text.favorite}
                icon={<Icon as={isFavorite ? FaHeart : FaRegHeart} />}
                rounded="full"
                size="sm"
                color={isFavorite ? 'warm.rose' : 'warm.orange'}
                bg="orange.50"
                isLoading={favoriteLoading}
                onClick={handleFavorite}
              />
            </HStack>

            <VStack align="stretch" spacing={0} mt={4} bg="warm.cream" rounded="16px" p={{ base: 3, md: 3.5 }}>
              <DetailLine icon={FaPaw} label={text.breed} value={animal.breed} />
              <DetailLine icon={FaHouseChimney} label={text.age} value={animal.age} />
              <DetailLine icon={genderIcon} label={text.gender} value={animal.neutered ? `${animal.gender} (${animal.neutered})` : animal.gender} />
              <DetailLine icon={FaWeightScale} label={text.weight} value={animal.weight ? `${animal.weight} kg` : '-'} />
              <DetailLine icon={FaBriefcaseMedical} label={text.personality} value={animal.personality} />
              <DetailLine icon={FaShieldHeart} label={text.health} value={animal.healthStatus} />
              <DetailLine icon={FaBaby} label={text.chip} value={animal.chipStatus} />
              <DetailLine icon={FaLocationDot} label={text.location} value={animal.location} />
            </VStack>

          </Box>
        </Grid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 4, md: 5 }} mt={5}>
          <Panel title={`${text.aboutPrefix}${animal.name}`} icon={FaPaw} iconColor="warm.rose">
            {aboutParagraphs.length ? (
              aboutParagraphs.map((paragraph) => (
                <Text key={paragraph} fontSize="sm" lineHeight="1.8">
                  {paragraph}
                </Text>
              ))
            ) : (
              <Text fontSize="sm">{text.aboutEmpty}</Text>
            )}
          </Panel>

          <Panel title={text.healthRecord} icon={FaShieldHeart} iconColor="green.500">
            <VStack align="stretch" spacing={0}>
              <HealthLine label={text.vaccine} value={animal.vaccineInfo || '-'} />
              <HealthLine label={text.deworming} value={animal.dewormingStatus || '-'} />
              <HealthLine label={text.neutered} value={animal.neutered || '-'} />
              <HealthLine label={text.chipImplant} value={animal.chipImplantStatus || animal.chipStatus || '-'} />
              <HealthLine label={text.health} value={animal.healthRecordStatus || animal.healthStatus || '-'} />
            </VStack>
          </Panel>

          <Panel title={text.traits} icon={FaPaw} iconColor="warm.rose">
            <HStack flexWrap="wrap" mb={4}>
              {traitTags.map((tag) => (
                <Box key={tag} bg="red.50" color="warm.rose" border="1px solid" borderColor="red.100" rounded="full" px={3} py={1.5} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="900">
                  {tag}
                </Box>
              ))}
            </HStack>
            <VStack align="stretch" spacing={2}>
              {ratings.map((item) => (
                <HStack key={item.label} justify="space-between">
                  <Text minW="76px" fontSize="sm" fontWeight="800">
                    {item.label}
                  </Text>
                  <HStack spacing={1}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Icon key={index} as={FaPaw} color={index < Number(item.score || 0) ? 'warm.orange' : 'gray.300'} boxSize={3.5} />
                    ))}
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Panel>

          <Panel title={text.suitableHome} icon={FaHouseChimney} iconColor="warm.green">
            <VStack align="stretch" spacing={2}>
              {suitableHomes.map((tip) => (
                <HStack key={tip} align="start">
                  <Icon as={FaCheck} color="warm.green" mt={1} boxSize={3.5} />
                  <Text fontSize="sm" fontWeight="800">
                    {tip}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Panel>
        </SimpleGrid>

        <Panel title={text.daily} icon={FaCamera} iconColor="blue.400" mt={5}>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
            {[...images, ...images].slice(0, 4).map((image, index) => (
              <Image key={`${image}-${index}`} src={image} alt={`${animal.name} ${text.daily} ${index + 1}`} h={{ base: '150px', md: '125px' }} w="100%" objectFit="cover" rounded="12px" />
            ))}
          </SimpleGrid>
        </Panel>

        <HStack mt={5} bg="linear-gradient(120deg, #ffe7bd 0%, #fff8ea 60%, #ffe0a6 100%)" rounded="18px" p={{ base: 4, md: 5 }} justify="space-between" flexWrap="wrap" gap={4}>
          <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="900" color="warm.brown">
            {text.cta1}
            <br />
            {text.cta2}
          </Text>
          <Button leftIcon={<FaHeart />} bg="warm.orange" color="white" size="md" px={7} onClick={() => navigate(`/adoption/apply/${animal.id}`)}>
            {text.apply}{animal.name}
          </Button>
        </HStack>
      </Container>
    </Box>
  );
}

function Message({ title, actionText, to }) {
  return (
    <Container maxW="1180px" py={12} px={{ base: 4, md: 6 }}>
      <Box bg="white" rounded="18px" p={6} boxShadow="lg">
        <Heading color="warm.brown" fontSize={{ base: 'xl', md: '2xl' }}>
          {title}
        </Heading>
        {to && (
          <Button as={Link} to={to} mt={6} bg="warm.orange" color="white">
            {actionText}
          </Button>
        )}
      </Box>
    </Container>
  );
}

function ImageGallery({ images, animal, active, setActive, move }) {
  return (
    <Box bg="white" rounded="18px" overflow="hidden" boxShadow="0 12px 28px rgba(111, 69, 31, 0.10)" border="1px solid" borderColor="orange.100">
      <Box position="relative">
        <Image src={images[active]} alt={animal.name} w="100%" h={{ base: '260px', md: '390px', lg: '430px' }} objectFit="cover" />
        <IconButton aria-label={text.prev} icon={<FaChevronLeft />} size={{ base: 'sm', md: 'md' }} position="absolute" left={3} top="50%" transform="translateY(-50%)" rounded="full" bg="white" onClick={() => move(-1)} />
        <IconButton aria-label={text.next} icon={<FaChevronRight />} size={{ base: 'sm', md: 'md' }} position="absolute" right={3} top="50%" transform="translateY(-50%)" rounded="full" bg="white" onClick={() => move(1)} />
        <Box position="absolute" bottom={3} left="50%" transform="translateX(-50%)" bg="blackAlpha.600" color="white" rounded="full" px={3} py={1} fontSize="sm" fontWeight="800">
          {active + 1} / {images.length}
        </Box>
      </Box>
      <HStack p={3} spacing={3} overflowX="auto">
        {images.map((image, index) => (
          <Image key={`${image}-${index}`} src={image} alt={`${animal.name} ${text.thumbnail} ${index + 1}`} w={{ base: '88px', md: '118px' }} h={{ base: '58px', md: '74px' }} objectFit="cover" rounded="10px" border="2px solid" borderColor={active === index ? 'warm.orange' : 'transparent'} cursor="pointer" onClick={() => setActive(index)} />
        ))}
      </HStack>
    </Box>
  );
}

function DetailLine({ icon, label, value }) {
  return (
    <HStack py={2} borderBottom="1px solid" borderColor="whiteAlpha.900" align="start" spacing={2.5}>
      <Icon as={icon} color="warm.orange" mt={0.5} boxSize={4} />
      <Text minW={{ base: '70px', md: '78px' }} fontSize={{ base: 'xs', md: 'sm' }} fontWeight="900" color="warm.brown">
        {label}
      </Text>
      <Text color="gray.700" fontSize={{ base: 'xs', md: 'sm' }} fontWeight="700" noOfLines={2}>
        {value || '-'}
      </Text>
    </HStack>
  );
}

function Panel({ title, icon, iconColor, children, ...props }) {
  return (
    <Box bg="white" rounded="18px" p={{ base: 4, md: 5 }} boxShadow="0 12px 28px rgba(111, 69, 31, 0.09)" border="1px solid" borderColor="orange.100" {...props}>
      <HStack mb={3}>
        <Icon as={icon} color={iconColor} boxSize={5} />
        <Heading fontSize={{ base: 'lg', md: 'xl' }} color="warm.brown">
          {title}
        </Heading>
      </HStack>
      {children}
    </Box>
  );
}

function HealthLine({ label, value }) {
  return (
    <HStack justify="space-between" py={2} borderBottom="1px solid" borderColor="orange.100" align="start" gap={3}>
      <HStack>
        <Icon as={FaSyringe} color="warm.green" boxSize={4} />
        <Text fontSize="sm" fontWeight="900" color="warm.brown">
          {label}
        </Text>
      </HStack>
      <HStack color="green.600" fontSize="sm" fontWeight="900" align="start">
        <Text textAlign="right">{value}</Text>
        <Icon as={FaCheck} mt={1} boxSize={3.5} />
      </HStack>
    </HStack>
  );
}

function safeFavorites(value) {
  return Array.isArray(value) ? value : [];
}
