import { Box, Container, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaHeartPulse, FaHouseChimney, FaPaw, FaPeopleRoof, FaShieldHeart } from 'react-icons/fa6';
import { GiDogBowl } from 'react-icons/gi';

const items = [
  { text: '是否有足夠活動空間？', icon: FaHouseChimney },
  { text: '是否能負擔飼料、醫療與日常用品？', icon: GiDogBowl },
  { text: '家人是否都同意認養？', icon: FaPeopleRoof },
  { text: '是否願意陪伴毛孩適應新環境？', icon: FaShieldHeart },
  { text: '是否了解結紮、疫苗與定期健檢的重要性？', icon: FaHeartPulse },
];

export default function PrepSection() {
  return (
    <Box as="section" py={{ base: 8, md: 10 }}>
      <Container maxW="1180px">
        <HStack mb={7} spacing={4} flexWrap="wrap">
          <Icon as={FaPaw} color="warm.orange" boxSize={8} />
          <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="900" color="warm.brown">
            認養前準備
          </Text>
          <Text color="gray.700" fontWeight="700">
            在帶毛孩回家前，請先評估自己是否準備好了
          </Text>
        </HStack>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} spacing={5}>
          {items.map((item, index) => (
            <VStack
              key={item.text}
              align="stretch"
              minH="150px"
              bg="rgba(255,255,255,0.78)"
              border="1px solid"
              borderColor="orange.200"
              rounded="14px"
              p={4}
              boxShadow="0 10px 22px rgba(111, 69, 31, 0.08)"
              transition="all 0.22s ease"
              _hover={{ transform: 'translateY(-6px)', boxShadow: '0 16px 30px rgba(111, 69, 31, 0.16)' }}
            >
              <HStack justify="space-between">
                <Text fontSize="2xl" fontWeight="900" color="warm.orange">
                  {index + 1}
                </Text>
                <Icon as={item.icon} boxSize={9} color={index % 2 ? 'warm.green' : 'warm.sky'} />
              </HStack>
              <Text mt="auto" fontWeight="900" color="warm.ink" lineHeight="1.65" textAlign="center">
                {item.text}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
