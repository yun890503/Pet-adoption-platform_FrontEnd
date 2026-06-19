import { Box, Button, Container, HStack, Image, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../image/129a5a5e-4aba-4480-8df1-d504932ab69.png?url';
import AdoptionModal from '../components/AdoptionModal.jsx';
import AnimalCard from '../components/AnimalCard.jsx';
import PrepSection from '../components/PrepSection.jsx';
import { odooApi } from '../services/odooApi.js';

const MotionBox = motion(Box);

export default function Home() {
  const [featuredAnimals, setFeaturedAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    odooApi
      .getAnimals({ limit: 8, sort: 'newest' })
      .then((data) => setFeaturedAnimals(Array.isArray(data) ? data : []))
      .catch(() => setFeaturedAnimals([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdopt = (animal) => {
    setSelectedAnimal(animal);
    onOpen();
  };

  return (
    <Box>
      <Hero />

      <Container maxW="1280px" py={{ base: 6, md: 4 }} px={{ base: 4, md: 8 }}>
        <HStack justify="space-between" align="start" mb={5} flexWrap="wrap" gap={3}>
          <Box>
            <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="900" color="warm.brown">
              精選待認養毛孩
            </Text>
          </Box>
        </HStack>

        {loading ? (
          <EmptyState text="正在從 Odoo 載入毛孩資料..." />
        ) : featuredAnimals.length ? (
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 2.5, md: 4, lg: 5 }} alignItems="start">
            {featuredAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} onAdopt={handleAdopt} />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState text="目前尚未上架毛孩。" />
        )}

        <Box
          mt={10}
          bg="white"
          rounded="28px"
          p={{ base: 6, md: 8 }}
          textAlign="center"
          boxShadow="0 14px 34px rgba(111, 69, 31, 0.12)"
          border="1px solid"
          borderColor="orange.100"
        >
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="900" color="warm.brown">
            想看更多正在等待家的毛孩嗎？
          </Text>
          <Text mt={2} color="gray.700" fontWeight="700">
            到毛孩列表可以搜尋名稱、品種，也能篩選狗狗或貓咪。
          </Text>
          <Button as={Link} to="/animals" mt={5} bg="warm.orange" color="white" size="lg">
            前往毛孩列表
          </Button>
        </Box>
      </Container>

      <PrepSection />
      <AdoptionModal animal={selectedAnimal} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

function Hero() {
  return (
    <Box as="section" bg="warm.cream" overflow="hidden" borderBottom="1px solid" borderColor="orange.100">
      <MotionBox initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
        <Image
          src={`${heroImage}?v=20260617-hero-2`}
          alt="暖心毛孩認養主視覺"
          w="100%"
          maxW="1280px"
          mx="auto"
          display="block"
          objectFit="contain"
        />
      </MotionBox>
    </Box>
  );
}

function EmptyState({ text }) {
  return (
    <Box bg="white" rounded="24px" p={8} textAlign="center" boxShadow="0 12px 28px rgba(111, 69, 31, 0.10)">
      <Text fontSize="lg" fontWeight="900" color="warm.brown">
        {text}
      </Text>
    </Box>
  );
}
