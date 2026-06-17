import { Box, Button, Container, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { odooApi } from '../services/odooApi.js';
import { getApplications, getFavorites, getUser } from '../utils/storage.js';

export default function Profile() {
  const user = getUser();
  const applications = getApplications();
  const [favoriteAnimals, setFavoriteAnimals] = useState([]);

  useEffect(() => {
    const favoriteIds = getFavorites();
    odooApi
      .getAnimals()
      .then((animals) => setFavoriteAnimals((animals || []).filter((animal) => favoriteIds.includes(animal.id))))
      .catch(() => setFavoriteAnimals([]));
  }, []);

  return (
    <Box>
      <Container maxW="1180px" py={12} px={{ base: 4, md: 8 }}>
        <VStack align="stretch" spacing={6}>
          <HStack justify="space-between" flexWrap="wrap">
            <Heading color="warm.brown">會員中心</Heading>
            {!user && (
              <Button as={Link} to="/login" bg="warm.orange" color="white">
                登入
              </Button>
            )}
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Panel title="個人資料">
              <Text>姓名：{user?.name || '尚未登入'}</Text>
              <Text>Email：{user?.email || '-'}</Text>
              <Text>電話：{user?.phone || '-'}</Text>
            </Panel>
            <Panel title="我的認養申請">
              {applications.length ? (
                applications.map((item) => (
                  <Text key={item.id || `${item.animalId}-${item.email}`}>
                    {item.animalName || `產品 #${item.animalId}`}｜{item.city}
                  </Text>
                ))
              ) : (
                <Text>目前沒有申請紀錄</Text>
              )}
            </Panel>
            <Panel title="收藏毛孩">
              {favoriteAnimals.length ? (
                favoriteAnimals.map((animal) => (
                  <Text key={animal.id}>
                    {animal.name}｜{animal.breed}
                  </Text>
                ))
              ) : (
                <Text>目前沒有收藏 Odoo 上架毛孩</Text>
              )}
              <Button as={Link} to="/favorites" mt={3} size="sm" variant="outline">
                查看收藏
              </Button>
            </Panel>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}

function Panel({ title, children }) {
  return (
    <VStack align="stretch" bg="white" rounded="24px" p={6} boxShadow="lg" minH="220px">
      <Heading fontSize="xl" color="warm.brown">
        {title}
      </Heading>
      <Box color="gray.700" lineHeight="1.9">
        {children}
      </Box>
    </VStack>
  );
}
