import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaCalendarDays,
  FaHeart,
  FaHouseChimney,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPaw,
} from 'react-icons/fa6';
import MemberLayout from '../components/MemberLayout.jsx';
import { odooApi } from '../services/odooApi.js';

const text = {
  loading: '\u6b63\u5728\u8b80\u53d6 Odoo \u8a8d\u990a\u7d00\u9304...',
  empty: '\u76ee\u524d\u9084\u6c92\u6709\u5df2\u5b8c\u6210\u7684\u8a8d\u990a\u7d00\u9304\u3002',
  adopted: '\u5df2\u5b8c\u6210\u8a8d\u990a',
  adoptedCount: '\u5df2\u8a8d\u990a\u6bdb\u5b69',
  totalDays: '\u7d2f\u7a4d\u966a\u4f34\u5929\u6578',
  latestDate: '\u6700\u8fd1\u8a8d\u990a\u65e5',
  loveText: '\u6bcf\u4e00\u4efd\u611b\u90fd\u6703\u7e7c\u7e8c\u767c\u5149',
  search: '\u641c\u5c0b\u6bdb\u5b69\u540d\u7a31',
  newest: '\u6700\u65b0\u8a8d\u990a',
  oldest: '\u6700\u65e9\u8a8d\u990a',
  dog: '\u72d7\u72d7',
  cat: '\u8c93\u54aa',
  unknown: '\u5c1a\u672a\u586b\u5beb',
  date: '\u8a8d\u990a\u65e5\u671f',
  number: '\u8a8d\u990a\u7de8\u865f',
  location: '\u8a8d\u990a\u5730\u9ede',
  completed: '\u8a8d\u990a\u6210\u529f',
  viewPet: '\u67e5\u770b\u6bdb\u5b69\u8cc7\u6599',
  browsePets: '\u518d\u53bb\u770b\u770b\u6bdb\u5b69',
  days: '\u5929',
};

export default function AdoptionRecords() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    setLoading(true);
    odooApi
      .getMyAdoptionRecords()
      .then((items) => setOrders(Array.isArray(items) ? items : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const records = useMemo(() => {
    return orders.map((order) => normalizeRecord(order));
  }, [orders]);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return records
      .filter((record) => `${record.name} ${record.breed}`.toLowerCase().includes(keyword))
      .sort((a, b) => {
        const aTime = new Date(a.date || 0).getTime() || 0;
        const bTime = new Date(b.date || 0).getTime() || 0;
        return sort === 'oldest' ? aTime - bTime : bTime - aTime;
      });
  }, [query, records, sort]);

  const totalDays = records.reduce((sum, record) => sum + record.days, 0);
  const latestDate = records[0]?.date || '-';

  return (
    <MemberLayout active="/profile/records">
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 2.5, md: 3 }} mb={4}>
        <Stat icon={FaPaw} value={records.length} label={text.adoptedCount} color="orange" />
        <Stat icon={FaCalendarCheck} value={records.length} label={text.completed} color="green" />
        <Stat icon={FaHouseChimney} value={totalDays} label={text.totalDays} color="pink" />
        <Stat icon={FaHeart} value={latestDate} label={text.latestDate} color="purple" compact />
      </SimpleGrid>

      <Box bg="white" rounded="2xl" border="1px solid" borderColor="orange.100" boxShadow="lg" overflow="hidden">
        <Flex p={4} gap={3} align="center" flexWrap="wrap" borderBottom="1px solid" borderColor="orange.100">
          <HStack flex={{ base: '1 1 100%', md: '0 1 320px' }} bg="white" border="1px solid" borderColor="gray.200" rounded="lg" px={3}>
            <Icon as={FaMagnifyingGlass} color="gray.400" boxSize={4} />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} border="0" fontSize="sm" _focusVisible={{ boxShadow: 'none' }} />
          </HStack>
          <Select maxW={{ base: '100%', md: '180px' }} rounded="lg" fontSize="sm" ml={{ md: 'auto' }} value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">{text.newest}</option>
            <option value="oldest">{text.oldest}</option>
          </Select>
        </Flex>

        <VStack align="stretch" spacing={0}>
          {loading ? (
            <EmptyRow>{text.loading}</EmptyRow>
          ) : filtered.length ? (
            filtered.map((record) => <RecordRow key={record.id} record={record} />)
          ) : (
            <EmptyRow>{text.empty}</EmptyRow>
          )}
        </VStack>
      </Box>

      <Flex
        mt={4}
        align="center"
        justify="space-between"
        gap={4}
        flexWrap="wrap"
        bg="linear-gradient(90deg, #fff4dc 0%, #fffaf3 100%)"
        border="1px solid"
        borderColor="orange.100"
        rounded="2xl"
        p={{ base: 4, md: 5 }}
      >
        <HStack spacing={3}>
          <Flex boxSize="42px" align="center" justify="center" rounded="xl" bg="orange.50" color="warm.brown">
            <Icon as={FaHouseChimney} boxSize={5} />
          </Flex>
          <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="900" color="warm.brown">
            {text.loveText}
          </Text>
        </HStack>
        <Button as={Link} to="/animals" bg="warm.orange" color="white" size="sm" px={6}>
          {text.browsePets}
        </Button>
      </Flex>
    </MemberLayout>
  );
}

function Stat({ icon, value, label, color, compact = false }) {
  return (
    <HStack bg="rgba(255,255,255,0.94)" rounded="xl" p={{ base: 3, md: 4 }} border="1px solid" borderColor="orange.100" boxShadow="md" spacing={3}>
      <Flex boxSize={{ base: '34px', md: '40px' }} rounded="xl" align="center" justify="center" bg={`${color}.50`} color={`${color}.500`} flexShrink={0}>
        <Icon as={icon} boxSize={{ base: 4, md: 5 }} />
      </Flex>
      <Box minW={0}>
        <Text fontSize={compact ? { base: 'sm', md: 'md' } : { base: '2xl', md: '3xl' }} fontWeight="900" color="warm.brown" lineHeight="1" noOfLines={1}>
          {value}
        </Text>
        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="800" color="warm.ink" noOfLines={1}>
          {label}
        </Text>
      </Box>
    </HStack>
  );
}

function RecordRow({ record }) {
  return (
    <Flex
      p={{ base: 4, md: 5 }}
      gap={4}
      align={{ base: 'stretch', xl: 'center' }}
      direction={{ base: 'column', md: 'row' }}
      borderBottom="1px solid"
      borderColor="orange.100"
      _last={{ borderBottom: 0 }}
    >
      <HStack spacing={4} flex="1.2" align="start" minW={0}>
        <Box position="relative" flexShrink={0}>
          <Image src={record.image} alt={record.name} boxSize={{ base: '84px', md: '104px' }} objectFit="cover" rounded="xl" />
          <Badge position="absolute" top="2" left="2" colorScheme="green" rounded="md" px={2} py={0.5} fontSize="2xs">
            {text.completed}
          </Badge>
        </Box>

        <Box minW={0}>
          <HStack spacing={2}>
            <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="900" color="warm.brown" noOfLines={1}>
              {record.name}
            </Text>
            <Text color={record.gender.includes('\u5973') ? 'pink.400' : 'blue.400'} fontWeight="900" fontSize="sm" noOfLines={1}>
              {record.gender}
            </Text>
          </HStack>
          <HStack flexWrap="wrap" mt={1} spacing={1.5}>
            <Pill>{record.type === 'cat' ? text.cat : text.dog}</Pill>
            <Pill>{record.age}</Pill>
            <Pill>{record.breed}</Pill>
          </HStack>
          <Text mt={2} color="gray.700" fontSize="sm" noOfLines={2}>
            {record.personality}
          </Text>
        </Box>
      </HStack>

      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={2} flex="1" fontSize="sm">
        <Detail icon={FaCalendarDays} label={text.date} value={record.date} />
        <Detail icon={FaCalendarCheck} label={text.number} value={record.no} />
        <Detail icon={FaLocationDot} label={text.location} value={record.location} />
        <Detail icon={FaHeart} label={text.totalDays} value={`${record.days} ${text.days}`} />
      </SimpleGrid>

      <VStack align="stretch" minW={{ md: '130px' }} spacing={2}>
        <Button as={Link} to={`/animals/${record.id}`} size="sm" variant="outline" colorScheme="orange">
          {text.viewPet}
        </Button>
      </VStack>
    </Flex>
  );
}

function Detail({ icon, label, value }) {
  return (
    <HStack color="warm.ink" spacing={2} minW={0}>
      <Icon as={icon} color="warm.brown" boxSize={3.5} flexShrink={0} />
      <Text color="gray.600" whiteSpace="nowrap">
        {label}
      </Text>
      <Text fontWeight="800" noOfLines={1}>
        {value || '-'}
      </Text>
    </HStack>
  );
}

function Pill({ children }) {
  return (
    <Badge rounded="full" px={2.5} py={0.5} bg="orange.50" color="warm.brown" fontSize="xs" textTransform="none">
      {children || text.unknown}
    </Badge>
  );
}

function EmptyRow({ children }) {
  return (
    <Box p={6}>
      <Text fontWeight="900" color="warm.brown" fontSize="sm">
        {children}
      </Text>
    </Box>
  );
}

function normalizeRecord(order) {
  const animal = order.animal || {};
  const completed = order.completedDate || order.date || '';
  const completedTime = new Date(completed).getTime();
  return {
    id: animal.id || order.id,
    name: animal.name || '\u6bdb\u5b69',
    type: animal.type || 'dog',
    breed: animal.breed || text.unknown,
    age: animal.age || text.unknown,
    gender: animal.gender || text.unknown,
    location: animal.location || order.city || text.unknown,
    personality: animal.personality || text.loveText,
    date: completed || '-',
    no: order.number || order.name || '-',
    days: Number.isFinite(completedTime) ? Math.max(1, Math.floor((Date.now() - completedTime) / 86400000)) : 1,
    image: animal.images?.[0] || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=420&q=80',
  };
}
