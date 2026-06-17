import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FaCameraRetro,
  FaCat,
  FaDog,
  FaEnvelope,
  FaGift,
  FaHeart,
  FaHouse,
  FaPaw,
  FaPeopleCarryBox,
  FaPhone,
  FaRegClock,
  FaStar,
} from 'react-icons/fa6';
import { GiPartyPopper } from 'react-icons/gi';
import volunteerHero from '../../image/feb89baf-9e79-4e32-85b8-dc10210384f0.png?url';

const volunteerTypes = [
  {
    title: '陪伴散步志工',
    icon: FaDog,
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=520&q=80',
    text: '陪狗狗散步、練習牽繩，讓牠們保持穩定生活。',
  },
  {
    title: '貓房陪伴志工',
    icon: FaCat,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=520&q=80',
    text: '陪貓咪玩耍、梳毛，協助牠們慢慢親近人。',
  },
  {
    title: '攝影與社群志工',
    icon: FaCameraRetro,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=520&q=80',
    text: '拍攝日常照片，讓更多人看見毛孩的可愛。',
  },
  {
    title: '活動支援志工',
    icon: GiPartyPopper,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=520&q=80',
    text: '協助認養活動、物資整理與現場接待。',
  },
];

const conditions = ['年滿 16 歲以上', '喜歡動物、有耐心', '願意遵守中心安全規範', '可配合培訓與排班'];

const dayItems = [
  {
    title: '陪伴散步、牽繩互動',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=640&q=80',
  },
  {
    title: '清潔環境、整理用品',
    image: 'https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&w=640&q=80',
  },
  {
    title: '整理物資、補充飼料',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=640&q=80',
  },
  {
    title: '學習照護、陪伴互動',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=640&q=80',
  },
];

const rewards = [
  '與毛孩相處會療癒你，也讓牠更安心。',
  '參與專業照護與基本行為陪伴訓練。',
  '認識一群同樣喜歡動物的溫柔夥伴。',
  '累積公益服務經驗，留下真實改變。',
];

const feedback = [
  {
    name: '小安｜散步志工',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
    text: '原本只是想幫忙，後來發現每一次散步都讓我更期待週末。',
  },
  {
    name: '宇庭｜活動志工',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    text: '看見毛孩被認養的那一刻，真的覺得所有準備都值得。',
  },
];

export default function Volunteer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="linear-gradient(180deg, #fff8ea 0%, #fffaf3 56%, #fff1d8 100%)" minH="100vh">
      <Container maxW="1280px" px={{ base: 0, sm: 4, md: 8 }} py={{ base: 0, md: 8 }}>
        <Box bg="rgba(255,255,255,.82)" rounded={{ base: '0', md: '28px' }} boxShadow="0 22px 54px rgba(111,69,31,.12)" overflow="hidden" border={{ base: '0', md: '1px solid' }} borderColor="orange.100">
          <Hero onOpen={onOpen} />

          <Box px={{ base: 4, md: 8, xl: 10 }} py={{ base: 6, md: 8 }}>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 292px' }} gap={{ base: 6, lg: 8 }} alignItems="start">
              <Section title="我們需要的志工" icon={FaPaw}>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  {volunteerTypes.map((item) => (
                    <VolunteerCard key={item.title} item={item} />
                  ))}
                </SimpleGrid>
              </Section>

              <ConditionCard />
            </Grid>

            <Section title="志工的一天" icon={FaPaw} mt={8}>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
                {dayItems.map((item) => (
                  <DayCard key={item.title} item={item} />
                ))}
              </SimpleGrid>
            </Section>

            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={6} mt={8}>
              <InfoPanel title="加入我們，你將獲得" icon={FaHeart}>
                <VStack align="stretch" spacing={3}>
                  {rewards.map((item) => (
                    <HStack key={item} align="start" spacing={3}>
                      <Icon as={FaGift} color="warm.orange" mt={1} />
                      <Text color="warm.ink" fontWeight="700" lineHeight="1.7">
                        {item}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </InfoPanel>

              <InfoPanel title="志工心得" icon={FaStar}>
                <VStack align="stretch" spacing={4}>
                  {feedback.map((item) => (
                    <FeedbackCard key={item.name} item={item} />
                  ))}
                </VStack>
              </InfoPanel>
            </Grid>

            <BottomCta onOpen={onOpen} />
          </Box>
        </Box>
      </Container>

      <VolunteerModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

function Hero({ onOpen }) {
  return (
    <Box position="relative" minH={{ base: '300px', md: '360px', xl: '390px' }} overflow="hidden">
      <Image src={`${volunteerHero}?v=volunteer-poster`} alt="志工陪伴毛孩" position="absolute" inset="0" w="100%" h="100%" objectFit="cover" objectPosition="center" />
      <Box position="absolute" inset="0" bg="linear-gradient(90deg, rgba(255,248,234,.96) 0%, rgba(255,248,234,.78) 42%, rgba(255,248,234,.08) 100%)" />
      <Box position="relative" zIndex={1} px={{ base: 6, md: 10, xl: 12 }} py={{ base: 8, md: 12, xl: 14 }} maxW={{ base: '100%', md: '590px' }}>
        <HStack color="warm.orange" spacing={2} mb={3}>
          <Icon as={FaPaw} />
          <Icon as={FaHeart} transform="rotate(14deg)" />
        </HStack>
        <Heading as="h1" color="warm.brown" fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1.16" letterSpacing="0">
          成為毛孩生命中的光
        </Heading>
        <Text mt={4} color="warm.ink" fontSize={{ base: 'md', md: 'lg' }} fontWeight="800" lineHeight="1.8">
          一起陪伴浪浪，等待幸福的家
        </Text>
        <Button mt={5} leftIcon={<FaHeart />} bg="warm.orange" color="white" px={8} onClick={onOpen}>
          立即報名志工
        </Button>
      </Box>
    </Box>
  );
}

function Section({ title, icon, children, mt = 0 }) {
  return (
    <Box mt={mt}>
      <HStack mb={4} color="warm.brown">
        <Icon as={icon} color="warm.orange" />
        <Heading fontSize={{ base: 'xl', md: '2xl' }} letterSpacing="0">
          {title}
        </Heading>
      </HStack>
      {children}
    </Box>
  );
}

function VolunteerCard({ item }) {
  return (
    <Box bg="white" rounded="18px" p={3} border="1px solid" borderColor="orange.100" boxShadow="0 10px 24px rgba(111,69,31,.1)" transition="all .22s ease" _hover={{ transform: 'translateY(-6px)', boxShadow: '0 16px 32px rgba(111,69,31,.15)' }}>
      <Image src={item.image} alt={item.title} w="100%" h={{ base: '150px', sm: '118px' }} objectFit="cover" rounded="14px" />
      <Flex justify="center" mt="-19px" position="relative" zIndex={1}>
        <Flex align="center" justify="center" boxSize="42px" rounded="full" bg="warm.orange" color="white" boxShadow="0 8px 16px rgba(255,138,61,.32)">
          <Icon as={item.icon} />
        </Flex>
      </Flex>
      <VStack spacing={2} mt={2} textAlign="center">
        <Heading fontSize="md" color="warm.brown">
          {item.title}
        </Heading>
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {item.text}
        </Text>
        <Badge rounded="full" px={3} py={1} colorScheme="orange">
          了解更多
        </Badge>
      </VStack>
    </Box>
  );
}

function ConditionCard() {
  return (
    <Box bg="white" rounded="20px" p={5} border="1px solid" borderColor="orange.100" boxShadow="0 12px 28px rgba(111,69,31,.1)">
      <HStack mb={4}>
        <Icon as={FaHeart} color="warm.orange" />
        <Heading fontSize="lg" color="warm.brown">
          志工條件
        </Heading>
      </HStack>
      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
        {conditions.map((item) => (
          <HStack key={item} bg="green.50" rounded="12px" px={4} py={3}>
            <Icon as={FaPaw} color="warm.green" />
            <Text fontSize="sm" fontWeight="800" color="warm.ink">
              {item}
            </Text>
          </HStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}

function DayCard({ item }) {
  return (
    <Box bg="white" rounded="16px" overflow="hidden" border="1px solid" borderColor="orange.100" boxShadow="0 8px 20px rgba(111,69,31,.08)">
      <Image src={item.image} alt={item.title} w="100%" h="120px" objectFit="cover" />
      <Text px={3} py={3} textAlign="center" color="warm.brown" fontWeight="900" fontSize="sm">
        {item.title}
      </Text>
    </Box>
  );
}

function InfoPanel({ title, icon, children }) {
  return (
    <Box bg="white" rounded="20px" p={{ base: 5, md: 6 }} border="1px solid" borderColor="orange.100" boxShadow="0 12px 28px rgba(111,69,31,.1)">
      <HStack mb={4} color="warm.brown">
        <Icon as={icon} color="warm.orange" />
        <Heading fontSize="xl" letterSpacing="0">
          {title}
        </Heading>
      </HStack>
      {children}
    </Box>
  );
}

function FeedbackCard({ item }) {
  return (
    <HStack align="start" bg="warm.cream" rounded="16px" p={3} spacing={3}>
      <Image src={item.image} alt={item.name} boxSize="54px" rounded="full" objectFit="cover" />
      <Box>
        <HStack color="orange.400" spacing={1}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon key={index} as={FaStar} boxSize={3} />
          ))}
        </HStack>
        <Text mt={1} color="warm.brown" fontWeight="900" fontSize="sm">
          {item.name}
        </Text>
        <Text color="gray.700" fontSize="sm" lineHeight="1.6">
          {item.text}
        </Text>
      </Box>
    </HStack>
  );
}

function BottomCta({ onOpen }) {
  return (
    <Flex mt={8} align="center" justify="space-between" gap={5} bg="linear-gradient(90deg, #fff0cf 0%, #fff8ea 100%)" rounded="22px" p={{ base: 5, md: 6 }} border="1px solid" borderColor="orange.100" direction={{ base: 'column', md: 'row' }}>
      <HStack spacing={4}>
        <Flex align="center" justify="center" boxSize="54px" rounded="full" bg="white" color="warm.orange">
          <Icon as={FaPaw} boxSize={7} />
        </Flex>
        <Box>
          <Heading fontSize={{ base: 'xl', md: '2xl' }} color="warm.brown">
            每一份愛心，都能改變牠們的未來
          </Heading>
          <Text mt={1} color="warm.ink" fontWeight="700">
            加入志工團隊，一起讓浪浪得到安穩陪伴。
          </Text>
        </Box>
      </HStack>
      <Button leftIcon={<FaHeart />} bg="warm.orange" color="white" px={8} onClick={onOpen}>
        立即報名志工
      </Button>
    </Flex>
  );
}

function VolunteerModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(4px)" />
      <ModalContent rounded="26px" bg="warm.cream" border="1px solid" borderColor="orange.100">
        <ModalHeader color="warm.brown" fontSize="2xl">
          我要加入志工
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={7}>
          <VStack align="stretch" spacing={4}>
            <Text color="warm.ink" fontWeight="700" lineHeight="1.8">
              歡迎先與我們聯繫，我們會協助你了解志工內容、培訓方式與適合的排班時段。
            </Text>
            <ContactLine icon={FaPhone} text="04-1234-5678" />
            <ContactLine icon={FaEnvelope} text="adopt@warm-paws.com" />
            <ContactLine icon={FaHouse} text="台中市毛孩路 88 號" />
            <ContactLine icon={FaRegClock} text="週一至週日 10:00–18:00" />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ContactLine({ icon, text }) {
  return (
    <HStack bg="white" rounded="16px" px={4} py={3}>
      <Icon as={icon} color="warm.orange" />
      <Text fontWeight="800" color="warm.brown">
        {text}
      </Text>
    </HStack>
  );
}
