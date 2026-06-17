import { Box, Button, Container, Grid, Heading, HStack, Icon, IconButton, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { getFavorites, toggleFavorite } from '../utils/storage.js';

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setFavorites(getFavorites());
    setLoading(true);
    odooApi
      .getAnimal(id)
      .then(setAnimal)
      .catch(() => setAnimal(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Message title="正在從 Odoo 載入毛孩資料..." />;
  if (!animal) return <Message title="找不到這筆 Odoo 毛孩產品" actionText="回毛孩列表" to="/animals" />;

  const images = animal.images?.length ? animal.images : ['https://placehold.co/900x650/fff8ea/6f451f?text=Warm+Paws'];
  const isFavorite = favorites.includes(animal.id);
  const genderIcon = animal.gender === '男生' ? FaMars : FaVenus;
  const move = (step) => setActive((current) => (current + step + images.length) % images.length);
  const traitTags = animal.traitTags?.length ? animal.traitTags : ['尚未填寫個性特質'];
  const ratings = animal.ratings?.length ? animal.ratings : [];
  const suitableHomes = animal.suitableHomes?.length ? animal.suitableHomes : ['尚未在 Odoo 填寫適合家庭條件'];
  const aboutParagraphs = [animal.rescueStory, animal.about].filter(Boolean).join('\n').split('\n').filter(Boolean);

  return (
    <Box bg="warm.cream" py={{ base: 6, md: 8 }}>
      <Container maxW="1220px" px={{ base: 4, md: 8 }}>
        <HStack mb={5} fontWeight="800" color="warm.brown" spacing={3} flexWrap="wrap">
          <Link to="/">首頁</Link>
          <Text>&gt;</Text>
          <Link to="/animals">找毛孩</Link>
          <Text>&gt;</Text>
          <Text>{animal.name}</Text>
        </HStack>

        <Grid templateColumns={{ base: '1fr', lg: '1.35fr 1fr' }} gap={6}>
          <ImageGallery images={images} animal={animal} active={active} setActive={setActive} move={move} />

          <Box bg="white" rounded="24px" p={{ base: 5, md: 7 }} boxShadow="0 14px 34px rgba(111, 69, 31, 0.12)" border="1px solid" borderColor="orange.100">
            <HStack justify="space-between" align="start">
              <Box>
                <HStack bg="green.100" color="green.700" rounded="full" px={4} py={1} w="fit-content" mb={4}>
                  <Box boxSize="10px" rounded="full" bg="green.500" />
                  <Text fontWeight="900">{animal.statusLabel || '開放認養中'}</Text>
                </HStack>
                <HStack>
                  <Heading color="warm.brown" fontSize={{ base: '4xl', md: '5xl' }}>
                    {animal.name}
                  </Heading>
                  <Icon as={genderIcon} color={animal.gender === '男生' ? 'blue.400' : 'pink.400'} boxSize={9} />
                </HStack>
              </Box>
              <IconButton
                aria-label="加入收藏"
                icon={<Icon as={isFavorite ? FaHeart : FaRegHeart} />}
                rounded="full"
                color={isFavorite ? 'warm.rose' : 'warm.orange'}
                bg="orange.50"
                onClick={() => setFavorites(toggleFavorite(animal.id))}
              />
            </HStack>

            <VStack align="stretch" spacing={0} mt={6} bg="warm.cream" rounded="22px" p={4}>
              <DetailLine icon={FaPaw} label="品種" value={animal.breed} />
              <DetailLine icon={FaHouseChimney} label="年齡" value={animal.age} />
              <DetailLine icon={genderIcon} label="性別" value={`${animal.gender}${animal.neutered ? `（${animal.neutered}）` : ''}`} />
              <DetailLine icon={FaWeightScale} label="體重" value={animal.weight ? `${animal.weight} 公斤` : '-'} />
              <DetailLine icon={FaBriefcaseMedical} label="個性" value={animal.personality} />
              <DetailLine icon={FaShieldHeart} label="健康狀況" value={animal.healthStatus} />
              <DetailLine icon={FaBaby} label="晶片" value={animal.chipStatus} />
              <DetailLine icon={FaLocationDot} label="所在地" value={animal.location} />
            </VStack>

            <HStack mt={7} spacing={4} flexWrap="wrap">
              <Button leftIcon={<FaHeart />} bg="linear-gradient(135deg, #ff7b6e, #ff8a3d)" color="white" size="lg" px={9} onClick={() => navigate(`/adoption/apply/${animal.id}`)}>
                我想認養
              </Button>
              <Button leftIcon={<FaRegHeart />} variant="outline" colorScheme="orange" size="lg" px={9} onClick={() => setFavorites(toggleFavorite(animal.id))}>
                加入收藏
              </Button>
            </HStack>
          </Box>
        </Grid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6} mt={6}>
          <Panel title={`關於${animal.name}`} icon={FaPaw} iconColor="warm.rose">
            {aboutParagraphs.length ? aboutParagraphs.map((paragraph) => <Text key={paragraph} lineHeight="2">{paragraph}</Text>) : <Text>尚未在 Odoo 填寫關於內容。</Text>}
          </Panel>

          <Panel title="健康紀錄" icon={FaShieldHeart} iconColor="green.500">
            <VStack align="stretch" spacing={0}>
              <HealthLine label="疫苗接種" value={animal.vaccineInfo || '-'} />
              <HealthLine label="體內外驅蟲" value={animal.dewormingStatus || '-'} />
              <HealthLine label="結紮手術" value={animal.neutered || '-'} />
              <HealthLine label="晶片植入" value={animal.chipImplantStatus || animal.chipStatus || '-'} />
              <HealthLine label="健康狀況" value={animal.healthRecordStatus || animal.healthStatus || '-'} />
            </VStack>
          </Panel>

          <Panel title="個性特質" icon={FaPaw} iconColor="warm.rose">
            <HStack flexWrap="wrap" mb={5}>
              {traitTags.map((tag) => (
                <Box key={tag} bg="red.50" color="warm.rose" border="1px solid" borderColor="red.100" rounded="full" px={4} py={2} fontWeight="900">
                  {tag}
                </Box>
              ))}
            </HStack>
            <VStack align="stretch" spacing={2}>
              {ratings.map((item) => (
                <HStack key={item.label} justify="space-between">
                  <Text minW="90px" fontWeight="800">{item.label}</Text>
                  <HStack spacing={1}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Icon key={index} as={FaPaw} color={index < Number(item.score || 0) ? 'warm.orange' : 'gray.300'} />
                    ))}
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </Panel>

          <Panel title="適合的家庭" icon={FaHouseChimney} iconColor="warm.green">
            <VStack align="stretch" spacing={3}>
              {suitableHomes.map((tip) => (
                <HStack key={tip}>
                  <Icon as={FaCheck} color="warm.green" />
                  <Text fontWeight="800">{tip}</Text>
                </HStack>
              ))}
            </VStack>
          </Panel>
        </SimpleGrid>

        <Panel title="牠的日常" icon={FaCamera} iconColor="blue.400" mt={6}>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5}>
            {[...images, ...images].slice(0, 4).map((image, index) => (
              <Image key={`${image}-${index}`} src={image} alt={`${animal.name} 日常 ${index + 1}`} h="170px" w="100%" objectFit="cover" rounded="14px" />
            ))}
          </SimpleGrid>
        </Panel>

        <HStack mt={7} bg="linear-gradient(120deg, #ffe7bd 0%, #fff8ea 60%, #ffe0a6 100%)" rounded="24px" p={{ base: 5, md: 7 }} justify="space-between" flexWrap="wrap" gap={4}>
          <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900" color="warm.brown">
            每一次認養，都是一個生命的轉變
            <br />
            給牠一個家，牠會給你全部的愛
          </Text>
          <Button leftIcon={<FaHeart />} bg="warm.orange" color="white" size="lg" px={10} onClick={() => navigate(`/adoption/apply/${animal.id}`)}>
            我想認養{animal.name}
          </Button>
        </HStack>
      </Container>
    </Box>
  );
}

function Message({ title, actionText, to }) {
  return (
    <Container maxW="1180px" py={20}>
      <Box bg="white" rounded="24px" p={8} boxShadow="lg">
        <Heading color="warm.brown">{title}</Heading>
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
    <Box bg="white" rounded="24px" overflow="hidden" boxShadow="0 14px 34px rgba(111, 69, 31, 0.12)" border="1px solid" borderColor="orange.100">
      <Box position="relative">
        <Image src={images[active]} alt={animal.name} w="100%" h={{ base: '330px', md: '560px' }} objectFit="cover" />
        <IconButton aria-label="上一張" icon={<FaChevronLeft />} position="absolute" left={4} top="50%" transform="translateY(-50%)" rounded="full" bg="white" onClick={() => move(-1)} />
        <IconButton aria-label="下一張" icon={<FaChevronRight />} position="absolute" right={4} top="50%" transform="translateY(-50%)" rounded="full" bg="white" onClick={() => move(1)} />
        <Box position="absolute" bottom={4} left="50%" transform="translateX(-50%)" bg="blackAlpha.600" color="white" rounded="full" px={4} py={1} fontWeight="800">
          {active + 1} / {images.length}
        </Box>
      </Box>
      <HStack p={4} spacing={4} overflowX="auto">
        {images.map((image, index) => (
          <Image key={`${image}-${index}`} src={image} alt={`${animal.name} 縮圖 ${index + 1}`} w={{ base: '110px', md: '160px' }} h={{ base: '74px', md: '100px' }} objectFit="cover" rounded="12px" border="3px solid" borderColor={active === index ? 'warm.orange' : 'transparent'} cursor="pointer" onClick={() => setActive(index)} />
        ))}
      </HStack>
    </Box>
  );
}

function DetailLine({ icon, label, value }) {
  return (
    <HStack py={3} borderBottom="1px solid" borderColor="whiteAlpha.900" align="start">
      <Icon as={icon} color="warm.orange" mt={1} />
      <Text minW="90px" fontWeight="900" color="warm.brown">{label}</Text>
      <Text color="gray.700" fontWeight="700">{value || '-'}</Text>
    </HStack>
  );
}

function Panel({ title, icon, iconColor, children, ...props }) {
  return (
    <Box bg="white" rounded="24px" p={{ base: 5, md: 6 }} boxShadow="0 14px 34px rgba(111, 69, 31, 0.10)" border="1px solid" borderColor="orange.100" {...props}>
      <HStack mb={4}>
        <Icon as={icon} color={iconColor} boxSize={6} />
        <Heading fontSize="2xl" color="warm.brown">{title}</Heading>
      </HStack>
      {children}
    </Box>
  );
}

function HealthLine({ label, value }) {
  return (
    <HStack justify="space-between" py={3} borderBottom="1px solid" borderColor="orange.100" align="start">
      <HStack>
        <Icon as={FaSyringe} color="warm.green" />
        <Text fontWeight="900" color="warm.brown">{label}</Text>
      </HStack>
      <HStack color="green.600" fontWeight="900" align="start">
        <Text>{value}</Text>
        <Icon as={FaCheck} mt={1} />
      </HStack>
    </HStack>
  );
}
