import { Badge, Box, Card, CardBody, Flex, HStack, Icon, IconButton, Text, VStack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaHeart, FaMars, FaRegHeart, FaVenus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import AnimalCarousel from './AnimalCarousel.jsx';
import { odooApi } from '../services/odooApi.js';
import { getUser, saveUser } from '../utils/storage.js';

const text = {
  male: '\u7537\u751f',
  female: '\u5973\u751f',
  loginFirst: '\u8acb\u5148\u767b\u5165\u6703\u54e1\uff0c\u6536\u85cf\u6703\u5132\u5b58\u5728 Odoo \u5f8c\u7aef\u3002',
  added: '\u5df2\u52a0\u5165\u6536\u85cf',
  removed: '\u5df2\u53d6\u6d88\u6536\u85cf',
  failed: '\u6536\u85cf\u66f4\u65b0\u5931\u6557',
  addFavorite: '\u52a0\u5165\u6536\u85cf',
  removeFavorite: '\u53d6\u6d88\u6536\u85cf',
  detail: '\u67e5\u770b',
  detailSuffix: '\u7684\u8a73\u7d30\u8cc7\u6599',
  emptyBreed: '\u5c1a\u672a\u586b\u5beb',
  emptyAge: '\u5e74\u9f61\u5f85\u88dc',
  approx: '\u7d04',
  emptyPersonality: '\u500b\u6027\u8cc7\u6599\u6e96\u5099\u4e2d\uff0c\u6b61\u8fce\u9ede\u9032\u8a73\u7d30\u9801\u4e86\u89e3\u66f4\u591a\u3002',
};

export default function AnimalCard({ animal }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [favoriteIds, setFavoriteIds] = useState(() => safeFavorites(getUser()?.favorites));
  const genderText = animal.gender || '';
  const isMale = genderText.includes('\u7537') || genderText === 'male';
  const isFavorite = favoriteIds.includes(animal.id);

  useEffect(() => {
    const syncUser = () => setFavoriteIds(safeFavorites(getUser()?.favorites));
    window.addEventListener('warm-paws:user-changed', syncUser);
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('warm-paws:user-changed', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const openDetail = () => {
    if (animal?.id) navigate(`/animals/${animal.id}`);
  };

  const handleFavorite = async (event) => {
    event.stopPropagation();
    const user = getUser();
    if (!user?.token) {
      toast({ title: text.loginFirst, status: 'info' });
      navigate('/login');
      return;
    }

    try {
      const nextIds = await odooApi.toggleMyFavorite(animal.id);
      setFavoriteIds(nextIds);
      saveUser({ ...user, favorites: nextIds });
      toast({ title: nextIds.includes(animal.id) ? text.added : text.removed, status: 'success', duration: 1400 });
    } catch (error) {
      toast({ title: text.failed, description: error.message, status: 'error' });
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`${text.detail} ${animal.name} ${text.detailSuffix}`}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') openDetail();
      }}
      overflow="hidden"
      rounded={{ base: '12px', md: '16px' }}
      bg="white"
      border="1px solid"
      borderColor="orange.100"
      boxShadow="0 10px 24px rgba(111, 69, 31, 0.10)"
      cursor="pointer"
      position="relative"
      aspectRatio="1 / 1"
      display="flex"
      flexDirection="column"
      transition="all 0.22s ease"
      _hover={{ transform: 'translateY(-5px)', boxShadow: '0 18px 34px rgba(111, 69, 31, 0.17)' }}
      _focusVisible={{ outline: '3px solid', outlineColor: 'orange.200' }}
    >
      <Box position="relative" h="45%" flexShrink={0}>
        <AnimalCarousel images={animal.images || []} name={animal.name} height="100%" compact />
        <IconButton
          aria-label={isFavorite ? text.removeFavorite : text.addFavorite}
          icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
          position="absolute"
          top="8px"
          right="8px"
          zIndex={2}
          boxSize="28px"
          minW="28px"
          h="28px"
          p={0}
          rounded="0"
          bg="transparent"
          color={isFavorite ? 'warm.orange' : 'white'}
          fontSize="23px"
          filter="drop-shadow(0 2px 5px rgba(0,0,0,0.45))"
          _hover={{ bg: 'transparent', color: 'warm.orange', transform: 'scale(1.12)' }}
          _active={{ bg: 'transparent', transform: 'scale(0.96)' }}
          onClick={handleFavorite}
        />
      </Box>

      <CardBody p={{ base: 2, md: 3 }} flex="1" overflow="hidden">
        <VStack align="stretch" spacing={{ base: 1, md: 1.5 }} h="100%" overflow="hidden">
          <Flex align="center" justify="space-between" gap={2}>
            <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} fontWeight="900" color="warm.ink" noOfLines={1}>
              {animal.name}
            </Text>
            <HStack color={isMale ? 'blue.400' : 'pink.400'} spacing={1.5} flexShrink={0}>
              <Icon as={isMale ? FaMars : FaVenus} boxSize={{ base: 2.5, sm: 3, md: 3.5 }} />
              <Text fontSize={{ base: '10px', sm: 'xs' }} fontWeight="900" noOfLines={1}>
                {genderText || (isMale ? text.male : text.female)}
              </Text>
            </HStack>
          </Flex>

          <HStack spacing={{ base: 1, md: 1.5 }} flexWrap="wrap" align="start" minH={{ base: '18px', md: '24px' }}>
            <InfoPill>{animal.breed || text.emptyBreed}</InfoPill>
            <InfoPill>{formatAge(animal.age)}</InfoPill>
          </HStack>

          <Text color="gray.700" fontSize={{ base: '10px', sm: 'xs', md: 'sm' }} lineHeight={{ base: '1.35', md: '1.45' }} noOfLines={2} minH="0" overflow="hidden">
            {animal.personality || text.emptyPersonality}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}

function InfoPill({ children }) {
  return (
    <Badge px={{ base: 1.5, md: 2 }} py={0.5} rounded="8px" bg="orange.50" color="warm.brown" fontSize={{ base: '9px', sm: 'xs' }} textTransform="none">
      {children}
    </Badge>
  );
}

function formatAge(age) {
  if (!age) return text.emptyAge;
  return String(age).startsWith(text.approx) ? age : `${text.approx} ${age}`;
}

function safeFavorites(value) {
  return Array.isArray(value) ? value : [];
}
