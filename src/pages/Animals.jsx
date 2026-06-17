import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCat, FaDog, FaMagnifyingGlass, FaPaw } from 'react-icons/fa6';
import AnimalCard from '../components/AnimalCard.jsx';
import AdoptionModal from '../components/AdoptionModal.jsx';
import { odooApi } from '../services/odooApi.js';

const filters = [
  { value: 'all', label: '全部', icon: FaPaw },
  { value: 'dog', label: '狗狗', icon: FaDog },
  { value: 'cat', label: '貓咪', icon: FaCat },
];

export default function Animals() {
  const [type, setType] = useState('all');
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [sort, setSort] = useState('newest');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(true);
      odooApi
        .getAnimals({
          type: type === 'all' ? undefined : type,
          name,
          breed,
          sort,
        })
        .then((data) => setList(Array.isArray(data) ? data : []))
        .catch(() => setList([]))
        .finally(() => setLoading(false));
    }, 220);

    return () => window.clearTimeout(timer);
  }, [type, name, breed, sort]);

  const openModal = (animal) => {
    setSelectedAnimal(animal);
    onOpen();
  };

  return (
    <Box>
      {/* <PageHeader title="所有毛孩清單" subtitle="資料全部由 Odoo 銷售產品中的認養毛孩欄位提供。" /> */}
      <Container maxW="1448px" py={{ base: 7, md: 10 }} px={{ base: 4, md: 8 }}>
        <Box bg="white" p={{ base: 4, md: 5 }} rounded="24px" boxShadow="0 14px 34px rgba(111, 69, 31, 0.12)" border="1px solid" borderColor="orange.100" mb={{ base: 6, md: 8 }}>
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'auto auto auto 1fr 1fr 190px' }} gap={3} alignItems="center">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                leftIcon={<Icon as={filter.icon} />}
                bg={type === filter.value ? 'warm.orange' : 'white'}
                color={type === filter.value ? 'white' : 'warm.brown'}
                border="1px solid"
                borderColor="orange.100"
                onClick={() => setType(filter.value)}
                w={{ base: '100%', xl: 'auto' }}
              >
                {filter.label}
              </Button>
            ))}
            <SearchInput value={name} onChange={setName} placeholder="搜尋名稱" />
            <SearchInput value={breed} onChange={setBreed} placeholder="搜尋品種" />
            <Select value={sort} onChange={(event) => setSort(event.target.value)} rounded="full" bg="white">
              <option value="newest">最新加入</option>
              <option value="age">年齡</option>
              <option value="breed">品種</option>
            </Select>
          </Grid>
        </Box>

        <HStack justify="space-between" mb={5} flexWrap="wrap">
          <Text fontWeight="900" color="warm.brown">
            {loading ? '載入中...' : `共 ${list.length} 位毛孩`}
          </Text>
          {/* <Text fontSize="sm" color="gray.600">
            請在 Odoo 產品勾選「上架為認養毛孩」才會出現在這裡
          </Text> */}
        </HStack>

        {loading ? (
          <EmptyState text="正在載入毛孩資料..." />
        ) : list.length ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={{ base: 5, md: 6 }}>
            {list.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} onAdopt={openModal} />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState text="目前沒有符合條件的毛孩產品。" />
        )}
      </Container>
      <AdoptionModal animal={selectedAnimal} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FaMagnifyingGlass />
      </InputLeftElement>
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rounded="full" bg="white" />
    </InputGroup>
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

export function PageHeader({ title, subtitle }) {
  return (
    <Box bg="linear-gradient(120deg, #fff8ea 0%, #ffe7bd 55%, #e1f5ff 100%)" py={{ base: 10, md: 14, lg: 16 }}>
      <Container maxW="1180px" px={{ base: 4, md: 8 }}>
        <Text fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight="900" color="warm.brown" lineHeight="1.2">
          {title}
        </Text>
        <Text mt={3} fontSize={{ base: 'md', md: 'xl' }} fontWeight="800" color="warm.ink">
          {subtitle}
        </Text>
      </Container>
    </Box>
  );
}
