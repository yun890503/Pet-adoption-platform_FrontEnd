import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarDays, FaClipboardCheck, FaClock, FaMagnifyingGlass, FaRegCircleXmark, FaSquareCheck } from 'react-icons/fa6';
import MemberLayout from '../components/MemberLayout.jsx';
import { odooApi } from '../services/odooApi.js';
import { getUser } from '../utils/storage.js';

const statusMap = {
  reviewing: { label: '審核中', color: 'orange', text: '審核進度：資料審核中\n志工正在審核您的申請資料，請耐心等候。' },
  approved: { label: '已通過', color: 'green', text: '恭喜！您的申請已通過\n請於指定日期前完成訪視安排與認養流程。' },
  completed: { label: '已完成認養', color: 'green', text: '認養已完成\n這筆資料已成為您的認養紀錄。' },
  cancelled: { label: '已取消', color: 'gray', text: '申請已取消\n若您改變心意，歡迎重新提交申請。' },
};

export default function ProfileApplications() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animalsLoading, setAnimalsLoading] = useState(false);

  const loadApplications = () => {
    setLoading(true);
    odooApi
      .getMyAdoptionApplications()
      .then((items) => setRows(Array.isArray(items) ? items : []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    if (!isOpen || animals.length) return;
    setAnimalsLoading(true);
    odooApi
      .getAnimals({ limit: 30, sort: 'newest', imageMode: 'cover' })
      .then((items) => setAnimals(Array.isArray(items) ? items : []))
      .catch(() => setAnimals([]))
      .finally(() => setAnimalsLoading(false));
  }, [animals.length, isOpen]);

  const counts = {
    reviewing: rows.filter((row) => row.status === 'reviewing').length,
    approved: rows.filter((row) => row.status === 'approved').length,
    completed: rows.filter((row) => row.status === 'completed').length,
    rejected: 0,
    total: rows.length,
  };

  return (
    <MemberLayout active="/profile/applications">
     <SimpleGrid columns={{ base: 2, md: 4 }} spacing={{ base: 2.5, md: 3 }} mb={4}>
        {/* <Stat icon={FaClipboardCheck} value={counts.reviewing} label="件申請中" color="orange" /> */}
        <Stat icon={FaClock} value={counts.reviewing} label="件審核中" color="yellow" />
        <Stat icon={FaSquareCheck} value={counts.approved} label="件已通過" color="green" />
        <Stat icon={FaRegCircleXmark} value={counts.completed} label="件已完成" color="blue" />
        <Stat icon={FaCalendarDays} value={counts.total} label="全部申請" color="orange" />
      </SimpleGrid>

      <Flex
        mb={4}
        p={{ base: 3, md: 5 }}
        gap={{ base: 2, md: 4 }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        direction={{ base: 'column', md: 'row' }}
        bg="linear-gradient(120deg, rgba(255,255,255,0.96), rgba(255,244,223,0.96))"
        border="1px solid"
        borderColor="orange.100"
        rounded="2xl"
        boxShadow="md"
      >
        <HStack spacing={3} align="start">
          <Flex boxSize={{ base: '30px', md: '46px' }} rounded="xl" align="center" justify="center" bg="orange.50" color="warm.orange" flexShrink={0}>
            <Icon as={FaClipboardCheck} boxSize={{ base: 3.5, md: 6 }} />
          </Flex>
          <Box>
            <Text fontSize={{ base: 'sm', md: 'lg' }} fontWeight="900" color="warm.brown">
              想再申請認養嗎？
            </Text>
            <Text mt={1} fontSize={{ base: 'xs', md: 'sm' }} color="gray.700" fontWeight="700">
              前往毛孩列表，選擇喜歡的毛孩後即可填寫新的認養申請。
            </Text>
          </Box>
        </HStack>
        <Button onClick={onOpen} bg="warm.orange" color="white" px={{ base: 4, md: 7 }} size={{ base: 'sm', md: 'md' }} alignSelf={{ base: 'stretch', md: 'center' }}>
          前往申請認養
        </Button>
      </Flex>

      <Box bg="white" rounded="2xl" border="1px solid" borderColor="orange.100" boxShadow="lg" overflow="hidden">
        <Flex p={{ base: 2.5, md: 4 }} gap={{ base: 2, md: 3 }} align="center" flexWrap="wrap" borderBottom="1px solid" borderColor="orange.100">
          <HStack flex={{ base: '1 1 100%', md: '0 1 300px' }} bg="white" border="1px solid" borderColor="gray.200" rounded="lg" px={{ base: 2, md: 3 }}>
            <Icon as={FaMagnifyingGlass} color="gray.400" boxSize={{ base: 3.5, md: 4 }} />
            <Input placeholder="搜尋毛孩名稱" border="0" size={{ base: 'sm', md: 'md' }} fontSize={{ base: 'xs', md: 'sm' }} _focusVisible={{ boxShadow: 'none' }} />
          </HStack>
          <Select maxW={{ base: '100%', md: '260px' }} rounded="lg" placeholder="全部狀態" size={{ base: 'sm', md: 'md' }} fontSize={{ base: 'xs', md: 'sm' }} />
          <Select maxW={{ base: '100%', md: '180px' }} rounded="lg" ml={{ md: 'auto' }} defaultValue="newest" size={{ base: 'sm', md: 'md' }} fontSize={{ base: 'xs', md: 'sm' }}>
            <option value="newest">最新申請</option>
            <option value="oldest">較早申請</option>
          </Select>
        </Flex>

        <VStack align="stretch" spacing={0}>
          {loading ? (
            <Text p={6} fontWeight="900" color="warm.brown">
              正在讀取 Odoo 銷售認養申請...
            </Text>
          ) : rows.length ? rows.map((row) => (
            <ApplicationRow key={row.id} row={row} />
          )) : (
            <Text p={6} fontWeight="900" color="warm.brown">
              目前沒有認養申請。
            </Text>
          )}
        </VStack>
      </Box>

      <AdoptionApplyModal
        isOpen={isOpen}
        onClose={onClose}
        animals={animals}
        loading={animalsLoading}
        onSubmitted={loadApplications}
        toast={toast}
      />
    </MemberLayout>
  );
}

function Stat({ icon, value, label, color }) {
  return (
    <HStack bg="rgba(255,255,255,0.92)" rounded="xl" p={{ base: 2, md: 5 }} border="1px solid" borderColor="orange.100" boxShadow="md" spacing={{ base: 2, md: 4 }} minW={0}>
      <Flex boxSize={{ base: '28px', md: '48px' }} rounded="xl" align="center" justify="center" bg={`${color}.50`} color={`${color}.500`} flexShrink={0}>
        <Icon as={icon} boxSize={{ base: 3.5, md: 6 }} />
      </Flex>
      <Box minW={0}>
        <Text fontSize={{ base: 'xl', md: '4xl' }} fontWeight="900" color="warm.brown" lineHeight="1" noOfLines={1}>
          {value}
        </Text>
        <Text fontSize={{ base: '10px', md: 'md' }} fontWeight="800" color="warm.ink" noOfLines={2}>
          {label}
        </Text>
      </Box>
    </HStack>
  );
}

function AdoptionApplyModal({ isOpen, onClose, animals, loading, onSubmitted, toast }) {
  const [selectedId, setSelectedId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const selectedAnimal = animals.find((animal) => String(animal.id) === String(selectedId)) || animals[0];

  useEffect(() => {
    if (isOpen && !selectedId && animals[0]?.id) {
      setSelectedId(String(animals[0].id));
    }
  }, [animals, isOpen, selectedId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = getUser();
    if (!user?.token) {
      toast({ title: '請先登入會員', description: '登入後才能將認養申請送到 Odoo 審核。', status: 'warning' });
      return;
    }
    if (!selectedAnimal?.id) {
      toast({ title: '請先選擇想認養的毛孩', status: 'warning' });
      return;
    }

    const form = new FormData(event.currentTarget);
    const payload = {
      animalId: Number(selectedAnimal.id),
      animalName: selectedAnimal.name,
      name: form.get('name'),
      phone: form.get('phone'),
      email: form.get('email'),
      city: form.get('city'),
      experience: form.get('experience'),
      family: [
        `居住型態：${form.get('homeType') || '-'}`,
        `家庭成員：${form.get('familyMembers') || '-'}`,
        `居住地址：${form.get('city') || ''}${form.get('district') || ''}${form.get('address') || ''}`,
      ].join('\n'),
      otherPets: form.get('otherPets'),
      message: form.get('message'),
    };

    setSubmitting(true);
    try {
      await odooApi.createAdoptionApplication(payload);
      toast({ title: '認養申請已送出', description: '我們已收到您的申請，請等待審核通知。', status: 'success' });
      onSubmitted?.();
      onClose();
    } catch (error) {
      toast({ title: '送出申請失敗', description: error.message, status: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(4px)" />
      <ModalContent mx={4} rounded="2xl" bg="warm.cream" border="1px solid" borderColor="orange.100" overflow="hidden">
        <ModalHeader px={{ base: 4, md: 6 }} pt={5} pb={3}>
          <HStack spacing={2}>
            <Text color="warm.orange">❤</Text>
            <Box>
              <Text color="warm.brown" fontSize={{ base: 'lg', md: 'xl' }} fontWeight="900">
                申請認養
              </Text>
              <Text color="gray.600" fontSize="xs" fontWeight="700">
                填寫以下資料，讓我們更了解您，幫助毛孩找到最適合的家！
              </Text>
            </Box>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody px={{ base: 4, md: 6 }} pb={4}>
          <Grid as="form" id="profile-adoption-form" onSubmit={handleSubmit} templateColumns={{ base: '1fr', lg: '1.65fr 0.85fr' }} gap={4} alignItems="start">
            <VStack align="stretch" spacing={4} bg="white" rounded="xl" p={{ base: 4, md: 5 }} border="1px solid" borderColor="orange.100">
              <SectionTitle number="1." title="基本資料" />
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                <Field name="name" label="姓名" placeholder="請輸入您的姓名" />
                <Field name="phone" label="聯絡電話" placeholder="請輸入聯絡電話" />
                <Field name="email" label="電子郵件" type="email" placeholder="請輸入電子郵件" />
                <SelectField name="age" label="年齡" placeholder="請選擇年齡" options={['16-20 歲', '21-30 歲', '31-45 歲', '46 歲以上']} />
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel color="warm.brown" fontWeight="900" fontSize="sm">
                  居住地址
                </FormLabel>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                  <Select name="city" rounded="lg" fontSize="sm" placeholder="請選擇縣市">
                    <option>台中市</option>
                    <option>台北市</option>
                    <option>新北市</option>
                    <option>高雄市</option>
                  </Select>
                  <Select name="district" rounded="lg" fontSize="sm" placeholder="請選擇區域">
                    <option>北區</option>
                    <option>西屯區</option>
                    <option>南屯區</option>
                    <option>其他</option>
                  </Select>
                  <Input name="address" rounded="lg" fontSize="sm" placeholder="請輸入詳細地址" />
                </SimpleGrid>
              </FormControl>

              <SectionTitle number="2." title="居住環境" />
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                <SelectField name="homeType" label="居住型態" placeholder="請選擇居住型態" options={['公寓/大樓', '透天厝', '其他']} />
                <SelectField name="familyMembers" label="家庭成員" placeholder="請選擇家庭成員" options={['一人', '兩人', '三人', '四人或以上']} />
                <SelectField name="otherPets" label="是否有其他寵物" placeholder="請選擇" options={['無', '有狗狗', '有貓咪', '有其他寵物']} />
                <SelectField name="experience" label="飼養經驗" placeholder="請選擇" options={['第一次飼養', '曾經養狗', '曾經養貓', '有多年飼養經驗']} />
              </SimpleGrid>

              <FormControl>
                <FormLabel color="warm.brown" fontWeight="900" fontSize="sm">
                  若有其他想說，請簡述
                </FormLabel>
                <Textarea name="message" rounded="lg" fontSize="sm" placeholder="例如照顧時間、家庭狀況、想認養的原因..." rows={3} />
              </FormControl>
            </VStack>

            <VStack align="stretch" spacing={4}>
              <Box bg="white" rounded="xl" p={4} border="1px solid" borderColor="orange.100">
                <FormControl>
                  <FormLabel color="warm.brown" fontWeight="900" fontSize="sm">
                    選擇想認養的毛孩
                  </FormLabel>
                  <Select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} rounded="lg" fontSize="sm" isDisabled={loading}>
                    {animals.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        {animal.name}｜{animal.breed || '未填品種'}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <HStack mt={4} spacing={3} align="start">
                  <Image src={selectedAnimal?.images?.[0] || 'https://placehold.co/160x160/fff1d6/6f451f?text=Pet'} alt={selectedAnimal?.name || 'pet'} boxSize="76px" rounded="lg" objectFit="cover" />
                  <Box minW={0}>
                    <Text fontWeight="900" color="warm.brown" fontSize="lg" noOfLines={1}>
                      {loading ? '載入毛孩中...' : selectedAnimal?.name || '尚無毛孩資料'}
                    </Text>
                    <HStack flexWrap="wrap" mt={2}>
                      <Badge rounded="full" bg="orange.50" color="warm.brown">
                        {selectedAnimal?.type === 'cat' ? '貓咪' : '狗狗'}
                      </Badge>
                      <Badge rounded="full" bg="orange.50" color="warm.brown">
                        {selectedAnimal?.age || '年齡待補'}
                      </Badge>
                      <Badge rounded="full" bg="orange.50" color="warm.brown">
                        {selectedAnimal?.breed || '未填品種'}
                      </Badge>
                    </HStack>
                  </Box>
                </HStack>
              </Box>

              <Box bg="white" rounded="xl" p={4} border="1px solid" borderColor="orange.100">
                <Text mb={3} color="warm.brown" fontWeight="900">
                  申請流程
                </Text>
                <VStack align="stretch" spacing={3}>
                  {['填寫申請', '資料審核', '訪視評估', '認養完成'].map((step, index) => (
                    <HStack key={step} align="start">
                      <Flex boxSize="24px" rounded="full" bg={index === 0 ? 'warm.orange' : 'gray.200'} color={index === 0 ? 'white' : 'gray.600'} align="center" justify="center" fontSize="xs" fontWeight="900">
                        {index + 1}
                      </Flex>
                      <Box>
                        <Text fontSize="sm" fontWeight="900" color="warm.brown">
                          {step}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {['填寫您的基本資料與居住動機', '我們將審核您的申請資料', '安排訪談與居住環境確認', '確認適合後完成認養手續'][index]}
                        </Text>
                      </Box>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Grid>
        </ModalBody>

        <ModalFooter gap={3} px={{ base: 4, md: 6 }} py={4} bg="rgba(255,255,255,0.74)">
          <Button variant="outline" onClick={onClose} flex={{ base: 1, md: 'initial' }}>
            取消
          </Button>
          <Button type="submit" form="profile-adoption-form" bg="warm.orange" color="white" isLoading={submitting} flex={{ base: 1, md: 'initial' }}>
            送出申請
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function SectionTitle({ number, title }) {
  return (
    <HStack color="warm.orange" fontWeight="900" fontSize="sm">
      <Text>{number}</Text>
      <Text>{title}</Text>
    </HStack>
  );
}

function Field({ name, label, type = 'text', placeholder }) {
  return (
    <FormControl isRequired>
      <FormLabel color="warm.brown" fontWeight="900" fontSize="sm">
        {label}
      </FormLabel>
      <Input name={name} type={type} rounded="lg" fontSize="sm" placeholder={placeholder} />
    </FormControl>
  );
}

function SelectField({ name, label, placeholder, options }) {
  return (
    <FormControl isRequired>
      <FormLabel color="warm.brown" fontWeight="900" fontSize="sm">
        {label}
      </FormLabel>
      <Select name={name} rounded="lg" fontSize="sm" placeholder={placeholder}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Select>
    </FormControl>
  );
}

function ApplicationRow({ row }) {
  const config = statusMap[row.status] || statusMap.reviewing;
  const image = row.animal.images?.[0] || 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=360&q=80';

  return (
    <Flex
      p={{ base: 3, md: 5 }}
      gap={{ base: 3, md: 5 }}
      align={{ base: 'stretch', xl: 'center' }}
      direction={{ base: 'column', md: 'row' }}
      borderBottom="1px solid"
      borderColor="orange.100"
    >
      <HStack spacing={{ base: 2.5, md: 4 }} flex="1.2" align="start" minW={0}>
        <Image src={image} alt={row.animal.name} boxSize={{ base: '62px', md: '110px' }} objectFit="cover" rounded="xl" flexShrink={0} />
        <Box minW={0}>
          <HStack spacing={2}>
            <Text fontSize={{ base: 'md', md: '2xl' }} fontWeight="900" color="warm.brown" noOfLines={1}>
              {row.animal.name}
            </Text>
            <Text color={row.animal.gender === '女生' ? 'pink.400' : 'blue.400'} fontWeight="900" fontSize={{ base: 'xs', md: 'md' }}>
              {row.animal.gender === '女生' ? '♀' : '♂'}
            </Text>
          </HStack>
          <HStack flexWrap="wrap" mt={1} spacing={{ base: 1, md: 2 }}>
            <Badge rounded="full" px={{ base: 2, md: 3 }} py={{ base: 0.5, md: 1 }} bg="orange.50" color="warm.brown" fontSize={{ base: '10px', md: 'xs' }}>
              {row.animal.type === 'cat' ? '貓咪' : '狗狗'}
            </Badge>
            <Badge rounded="full" px={{ base: 2, md: 3 }} py={{ base: 0.5, md: 1 }} bg="orange.50" color="warm.brown" fontSize={{ base: '10px', md: 'xs' }}>
              {row.animal.age}
            </Badge>
            <Badge rounded="full" px={{ base: 2, md: 3 }} py={{ base: 0.5, md: 1 }} bg="orange.50" color="warm.brown" fontSize={{ base: '10px', md: 'xs' }}>
              {row.animal.breed}
            </Badge>
          </HStack>
          <Text mt={{ base: 1.5, md: 3 }} fontSize={{ base: 'xs', md: 'md' }} noOfLines={1}>申請日期：{row.date || '-'}</Text>
          <Text fontSize={{ base: 'xs', md: 'md' }} noOfLines={1}>申請編號：{row.number || row.name}</Text>
        </Box>
      </HStack>
      <Box flex="1" borderLeft={{ xl: '1px solid' }} borderColor="orange.100" pl={{ xl: 6 }} minW={0}>
        <Badge colorScheme={config.color} rounded="lg" px={{ base: 2, md: 4 }} py={{ base: 1, md: 2 }} fontSize={{ base: 'xs', md: 'md' }}>
          {config.label}
        </Badge>
        {config.text.split('\n').map((line) => (
          <Text key={line} mt={2} color="gray.700" fontSize={{ base: 'xs', md: 'md' }} noOfLines={2}>
            {line}
          </Text>
        ))}
      </Box>
      <VStack align="stretch" minW={{ md: '150px' }}>
        <Button variant="outline" colorScheme="orange" size={{ base: 'xs', md: 'md' }}>
          查看詳情
        </Button>
        {row.status === 'approved' ? (
          <Button as={Link} to="/profile/appointments" variant="outline" size={{ base: 'xs', md: 'md' }}>
            預約訪視交接
          </Button>
        ) : row.status !== 'cancelled' ? (
          <Button variant="outline" size={{ base: 'xs', md: 'md' }}>聯絡我們</Button>
        ) : null}
      </VStack>
    </Flex>
  );
}
