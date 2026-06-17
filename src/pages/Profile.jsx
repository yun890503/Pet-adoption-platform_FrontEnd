import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaCalendarDays,
  FaClipboardList,
  FaHeart,
  FaPen,
  FaRegCalendarCheck,
  FaShieldHeart,
  FaStar,
  FaUser,
} from 'react-icons/fa6';
import MemberLayout from '../components/MemberLayout.jsx';
import { odooApi } from '../services/odooApi.js';
import { getUser, saveUser } from '../utils/storage.js';

export default function Profile() {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(() => getUser());
  const [animals, setAnimals] = useState([]);
  const [applications, setApplications] = useState([]);
  const [records, setRecords] = useState([]);
  const [visits, setVisits] = useState([]);
  const [editing, setEditing] = useState(false);
  const favoriteIds = user?.favorites || [];

  useEffect(() => {
    odooApi.getAnimals({ limit: 12, sort: 'newest' }).then(setAnimals).catch(() => setAnimals([]));
    odooApi.getMyAdoptionApplications().then((items) => setApplications(Array.isArray(items) ? items : [])).catch(() => setApplications([]));
    odooApi.getMyAdoptionRecords().then((items) => setRecords(Array.isArray(items) ? items : [])).catch(() => setRecords([]));
    odooApi.getMyVisitAppointments().then((items) => setVisits(Array.isArray(items) ? items : [])).catch(() => setVisits([]));
  }, []);

  useEffect(() => {
    if (!user?.token) return;
    odooApi
      .getMe()
      .then((freshUser) => {
        saveUser(freshUser);
        setUser(freshUser);
      })
      .catch(() => {});
  }, []);

  const favoriteAnimals = useMemo(() => {
    const matched = animals.filter((animal) => favoriteIds.includes(animal.id));
    return matched.length ? matched : animals.slice(0, 5);
  }, [animals, favoriteIds]);

  const latestVisit = visits[0];
  const latestRecord = records[0];

  const savePartner = async (event) => {
    event.preventDefault();
    if (!user?.token) {
      toast({ title: '請先登入', status: 'warning' });
      navigate('/login');
      return;
    }

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      mobile: form.get('mobile'),
      city: form.get('city'),
      street: form.get('street'),
      street2: form.get('street2'),
      zip: form.get('zip'),
    };

    try {
      const updated = await odooApi.updateMe(payload);
      saveUser(updated);
      setUser(updated);
      setEditing(false);
      toast({ title: '個人資料已更新到 Odoo Partner', status: 'success' });
    } catch (error) {
      toast({ title: '更新失敗', description: error.message, status: 'error' });
    }
  };

  return (
    <MemberLayout active="home">

      <SimpleGrid columns={{ base: 1, xl: '1.1fr 1fr 1fr' }} spacing={5}>
        <Panel
          title="個人資料"
          action={
            <Button size="sm" variant="outline" leftIcon={<FaPen />} onClick={() => setEditing((value) => !value)}>
              {editing ? '取消' : '編輯'}
            </Button>
          }
        >
          {editing ? (
            <PartnerForm user={user} onSubmit={savePartner} />
          ) : (
            <HStack spacing={6} align="center">
              {/* <Avatar icon={<FaUser />} boxSize="96px" bg="gray.800" color="white" /> */}
              <VStack align="stretch" spacing={3} flex="1">
                <Info label="姓名" value={user?.name || '尚未登入'} />
                <Info label="Email" value={user?.email || '-'} />
                <Info label="電話" value={user?.phone || '-'} />
                <Info label="手機" value={user?.mobile || '-'} />
                <Info label="地址" value={user?.address || user?.street || '-'} />
              </VStack>
            </HStack>
          )}

        </Panel>

        {/* <Panel title="我的認養申請" link="/profile/applications">
          <VStack align="stretch" spacing={4}>
            {applications.slice(0, 3).map((application) => (
              <MiniApplication key={application.id} application={application} />
            ))}
            {!applications.length && <Text color="gray.600">目前沒有認養申請。</Text>}
          </VStack>
        </Panel>

        <Panel title="預約訪視毛孩" link="/profile/appointments">
          <Box bg="warm.cream" border="1px solid" borderColor="orange.100" rounded="xl" p={5}>
            <HStack spacing={4} align="start">
              <Flex boxSize="64px" align="center" justify="center" rounded="xl" bg="white" color="warm.brown">
                <Icon as={FaCalendarDays} boxSize={8} />
              </Flex>
              <Box>
                <Badge bg="orange.100" color="warm.orangeDark" rounded="full" px={3} py={1}>
                  下次預約
                </Badge>
                <Text mt={3} fontSize="xl" fontWeight="900" color="warm.brown">
                  訪視{latestVisit?.animal?.name || '尚未預約'}
                </Text>
                <Text mt={2} fontSize="lg" fontWeight="800">
                  {latestVisit?.start || '尚未建立預約'}
                </Text>
                <Text mt={2} color="gray.600">暖心毛孩中途之家</Text>
                <Text color="gray.600">台北市內湖區陽光街123號</Text>
                <Button as={Link} to="/profile/appointments" mt={4} variant="outline" colorScheme="orange">
                  查看預約詳情
                </Button>
              </Box>
            </HStack>
          </Box>
        </Panel> */}
      </SimpleGrid>

      {/* <SimpleGrid columns={{ base: 1, xl: '1fr 1.4fr' }} spacing={5} mt={5}>
        <Panel title="認養紀錄" link="/profile/records">
          {latestRecord?.animal ? (
            <HStack spacing={5} align="center">
              <Image src={latestRecord.animal.images?.[0]} fallbackSrc="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=360&q=80" boxSize="118px" objectFit="cover" rounded="xl" />
              <Box>
                <Text fontSize="xl" fontWeight="900" color="warm.brown">
                  {latestRecord.animal.name}
                </Text>
                <Text mt={2}>認養日期：{latestRecord.completedDate || latestRecord.date || '-'}</Text>
                <Text mt={2}>從此牠就是我們家的一份子 ❤</Text>
              </Box>
            </HStack>
          ) : (
            <Text color="gray.600">目前沒有已完成認養的紀錄。</Text>
          )}
        </Panel>

        <Panel title="收藏毛孩" link="/favorites">
          <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={4}>
            {favoriteAnimals.slice(0, 5).map((animal) => (
              <Box key={animal.id} bg="white" border="1px solid" borderColor="orange.100" rounded="xl" overflow="hidden" position="relative">
                <Image src={animal.images?.[0]} fallbackSrc="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=360&q=80" h="96px" w="100%" objectFit="cover" />
                <Flex position="absolute" top="2" right="2" boxSize="28px" rounded="full" bg="warm.orange" color="white" align="center" justify="center">
                  <Icon as={FaHeart} boxSize={4} />
                </Flex>
                <Text textAlign="center" py={2} fontWeight="900" color="warm.brown">
                  {animal.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Panel>
      </SimpleGrid> */}
    </MemberLayout>
  );
}

function PartnerForm({ user, onSubmit }) {
  return (
    <VStack as="form" onSubmit={onSubmit} align="stretch" spacing={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Field name="name" label="姓名" defaultValue={user?.name || ''} />
        <Field name="email" label="Email" defaultValue={user?.email || ''} type="email" />
        <Field name="phone" label="電話" defaultValue={user?.phone || ''} />
        <Field name="mobile" label="手機" defaultValue={user?.mobile || ''} />
        <Field name="city" label="城市" defaultValue={user?.city || ''} />
        <Field name="zip" label="郵遞區號" defaultValue={user?.zip || ''} />
      </SimpleGrid>
      <Field name="street" label="地址" defaultValue={user?.street || ''} />
      <Field name="street2" label="地址補充" defaultValue={user?.street2 || ''} />
      <Button type="submit" bg="warm.orange" color="white" alignSelf="start">
        儲存資料
      </Button>
    </VStack>
  );
}

function Field({ name, label, ...props }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input name={name} rounded="lg" bg="white" {...props} />
    </FormControl>
  );
}

function SummaryCard({ icon, title, value, label }) {
  return (
    <Box
      bg="rgba(255,255,255,0.96)"
      rounded="xl"
      p={{ base: 2.5, md: 3 }}
      border="1px solid"
      borderColor="orange.100"
      boxShadow="0 8px 20px rgba(111,69,31,0.08)"
      aspectRatio="1 / 1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      minW={0}
      gap={{ base: 1.5, md: 2 }}
      maxW="150px"
      w="100%"
    >
      <Icon as={icon} color="warm.orange" boxSize={{ base: 5, md: 6 }} />
      <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="900" color="warm.ink" lineHeight="1.25" noOfLines={2}>
        {title}
      </Text>
      <Box>
        <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="900" color="warm.brown" lineHeight="0.95">
          {value}
        </Text>
        <Text mt={0.5} fontSize="xs" fontWeight="800" color="warm.brown" lineHeight="1.3">
          {label}
        </Text>
      </Box>
    </Box>
  );
}

function Panel({ title, children, action, link }) {
  return (
    <Box bg="rgba(255,255,255,0.94)" rounded="2xl" p={{ base: 5, md: 6 }} border="1px solid" borderColor="orange.100" boxShadow="lg" minH="260px">
      <Flex justify="space-between" align="center" mb={5}>
        <Text fontSize="xl" fontWeight="900" color="warm.ink">
          {title}
        </Text>
        {action}
        {link && (
          <Button as={Link} to={link} size="sm" variant="ghost" color="warm.brown">
            查看全部 〉
          </Button>
        )}
      </Flex>
      {children}
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <HStack>
      <Text minW="58px" color="gray.600">
        {label}
      </Text>
      <Text fontWeight="800" color="warm.ink">
        {value}
      </Text>
    </HStack>
  );
}

function MiniApplication({ application }) {
  const animal = application.animal || {};
  const status = application.statusLabel || '審核中';
  return (
    <HStack spacing={4}>
      <Image src={animal.images?.[0]} fallbackSrc="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=300&q=80" boxSize="72px" objectFit="cover" rounded="lg" />
      <Box flex="1">
        <Text fontWeight="900" color="warm.brown">
          {animal.name}
        </Text>
        <Text fontSize="sm">申請日期：{application.date || '-'}</Text>
        <Text fontSize="sm">審核狀態：{status}</Text>
      </Box>
      <Badge colorScheme={status === '已通過' ? 'green' : status === '訪視安排中' ? 'blue' : 'orange'} rounded="lg" px={3} py={1}>
        {status}
      </Badge>
    </HStack>
  );
}
