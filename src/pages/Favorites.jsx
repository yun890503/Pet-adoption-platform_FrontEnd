import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard.jsx';
import { odooApi } from '../services/odooApi.js';
import { getFavorites } from '../utils/storage.js';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favoriteIds = getFavorites();
    odooApi
      .getAnimals()
      .then((animals) => setFavorites((animals || []).filter((animal) => favoriteIds.includes(animal.id))))
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Container maxW="1448px" py={12} px={{ base: 4, md: 8 }}>
        <Heading color="warm.brown" mb={8}>
          我的收藏
        </Heading>
        {loading ? (
          <Text fontSize="xl" fontWeight="800">正在從 Odoo 載入收藏毛孩...</Text>
        ) : favorites.length ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
            {favorites.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} onAdopt={() => {}} />
            ))}
          </SimpleGrid>
        ) : (
          <Text fontSize="xl" fontWeight="800">
            目前還沒有收藏 Odoo 上架的狗狗貓咪。
          </Text>
        )}
      </Container>
    </Box>
  );
}
