import { Button, Card, CardBody, Flex, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { FaMars, FaVenus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import AnimalCarousel from './AnimalCarousel.jsx';

export default function AnimalCard({ animal, onAdopt }) {
  const isMale = animal.gender === '男生';

  return (
    <Card
      role="group"
      overflow="hidden"
      rounded="2xl"
      bg="white"
      border="1px solid"
      borderColor="orange.100"
      boxShadow="0 8px 20px rgba(111, 69, 31, 0.10)"
      transition="all 0.24s ease"
      _hover={{ transform: 'translateY(-6px)', boxShadow: '0 18px 34px rgba(111, 69, 31, 0.20)' }}
    >
      <AnimalCarousel images={animal.images || []} name={animal.name} />
      <CardBody p={5}>
        <VStack align="stretch" spacing={3}>
          <Flex align="center" justify="space-between" gap={3}>
            <Text fontSize={{ base: '2xl', lg: 'xl' }} fontWeight="900" color="warm.brown" noOfLines={1}>
              {animal.name}
            </Text>
            <HStack color={isMale ? 'blue.400' : 'pink.400'} spacing={1} flexShrink={0}>
              <Icon as={isMale ? FaMars : FaVenus} boxSize={5} />
              <Text fontWeight="800">{animal.gender}</Text>
            </HStack>
          </Flex>

          <SimpleGrid columns={1} spacingY={1} fontSize="sm">
            <Info label="品種" value={animal.breed} />
            <Info label="年齡" value={animal.age} />
            <Info label="個性" value={animal.personality} />
            <Info label="健康狀況" value={animal.healthStatus} />
          </SimpleGrid>

          <HStack>
            <Button as={Link} to={`/animals/${animal.id}`} variant="outline" colorScheme="orange" flex="1">
              查看詳細
            </Button>
            <Button
              leftIcon={<FaHeart />}
              bg="warm.orange"
              color="white"
              flex="1"
              boxShadow="0 8px 16px rgba(255, 138, 61, 0.34)"
              _hover={{ bg: 'warm.orangeDark', transform: 'scale(1.05)' }}
              onClick={() => onAdopt?.(animal)}
            >
              我想認養
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
}

function Info({ label, value }) {
  return (
    <HStack spacing={3} align="start">
      <Text minW="76px" fontWeight="900" color="warm.brown" whiteSpace="nowrap">
        {label}
      </Text>
      <Text color="gray.700" noOfLines={1}>
        {value || '-'}
      </Text>
    </HStack>
  );
}
