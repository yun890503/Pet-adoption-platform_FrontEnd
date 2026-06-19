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
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  FaCameraRetro,
  FaCat,
  FaDog,
  FaEnvelope,
  FaGift,
  FaHeart,
  FaHouse,
  FaPaw,
  FaPaperPlane,
  FaPenToSquare,
  FaPhone,
  FaRegClock,
  FaStar,
  FaTrash,
} from 'react-icons/fa6';
import { GiPartyPopper } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import volunteerHero from '../../image/feb89baf-9e79-4e32-85b8-dc10210384f0.png?url';
import { odooApi } from '../services/odooApi.js';
import { getUser } from '../utils/storage.js';

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
    text: '拍攝毛孩日常照片，讓更多人看見牠們的可愛。',
  },
  {
    title: '活動支援志工',
    icon: GiPartyPopper,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=520&q=80',
    text: '協助認養活動、物資整理與現場接待流程。',
  },
];

const conditions = ['年滿 16 歲以上', '喜歡動物、有耐心', '願意遵守中心安全規範', '可配合排班與時段'];

const dayItems = [
  {
    title: '陪伴散步，增加互動',
    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=640&q=80',
  },
  {
    title: '清潔環境，細心照顧',
    image: 'https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&w=640&q=80',
  },
  {
    title: '整理場地，維護環境',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=640&q=80',
  },
  {
    title: '參與認養會，推廣送養',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=640&q=80',
  },
];

const rewards = [
  '與毛孩相處的療癒時光，每次服務都能感受牠們的進步。',
  '免費專業課程與培訓，提供動物照護與行為觀察知識。',
  '認識一群愛動物的朋友，和志同道合的夥伴一起做有意義的事。',
  '志工服務時數證明，累積你的愛心足跡。',
  '志工專屬活動與聚會，定期分享經驗與交流。',
];

const fallbackFeedback = [
  {
    id: 'fallback-1',
    name: '小安',
    role: '散步志工',
    rating: 5,
    message: '原本只是想幫忙，後來發現每一次散步都讓我更期待週末。',
  },
  {
    id: 'fallback-2',
    name: '宇庭',
    role: '活動志工',
    rating: 5,
    message: '看見毛孩被認養的那一刻，真的覺得所有準備都值得。',
  },
];

export default function Volunteer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const feedbackModal = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const [feedback, setFeedback] = useState(fallbackFeedback);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    let mounted = true;
    odooApi
      .getVolunteerTestimonials({ limit: 20 })
      .then((items) => {
        if (mounted && Array.isArray(items) && items.length) setFeedback(items);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const submitFeedback = async () => {
    const text = message.trim();
    const currentUser = getUser();
    if (!currentUser?.token) {
      toast({ title: '請先登入會員', description: '登入後就能分享你的志工心得。', status: 'warning' });
      feedbackModal.onClose();
      navigate('/login');
      return;
    }
    if (!text) {
      toast({ title: '請輸入心得內容', status: 'warning' });
      return;
    }
    if (!rating) {
      toast({ title: '請選擇星星評分', status: 'warning' });
      return;
    }

    setSubmitting(true);
    try {
      const created = await odooApi.createVolunteerTestimonial({
        message: text.slice(0, 300),
        rating,
        role: '暖心志工',
      });
      setFeedback((items) => [created, ...items]);
      setMessage('');
      setRating(0);
      feedbackModal.onClose();
      toast({ title: '心得已送出', status: 'success' });
    } catch (error) {
      toast({ title: '送出心得失敗', description: error.message, status: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteFeedback = async (item) => {
    const currentUser = getUser();
    if (!currentUser?.token) {
      toast({ title: '請先登入會員', status: 'warning' });
      navigate('/login');
      return;
    }
    if (item.partnerId && currentUser.id && item.partnerId !== currentUser.id) {
      toast({ title: '只能刪除自己的心得', status: 'warning' });
      return;
    }

    setDeletingId(item.id);
    try {
      await odooApi.deleteVolunteerTestimonial(item.id);
      setFeedback((items) => items.filter((entry) => entry.id !== item.id));
      toast({ title: '心得已刪除', status: 'success' });
    } catch (error) {
      toast({ title: '刪除心得失敗', description: error.message, status: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

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
                      <Text color="warm.ink" fontWeight="700" lineHeight="1.7" fontSize={{ base: 'sm', md: 'md' }}>
                        {item}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </InfoPanel>

              <InfoPanel title="志工心得" icon={FaStar}>
                <VStack align="stretch" spacing={4}>
                  {feedback.map((item) => (
                    <FeedbackCard key={item.id} item={item} deleting={deletingId === item.id} onDelete={deleteFeedback} />
                  ))}
                  <Button leftIcon={<FaPenToSquare />} variant="outline" colorScheme="orange" rounded="full" onClick={() => {
                    if (!getUser()?.token) {
                      toast({ title: '請先登入會員', description: '登入後就能分享你的志工心得。', status: 'warning' });
                      navigate('/login');
                      return;
                    }
                    feedbackModal.onOpen();
                  }}>
                    分享你的心得
                  </Button>
                </VStack>
              </InfoPanel>
            </Grid>

            <BottomCta onOpen={onOpen} />
          </Box>
        </Box>
      </Container>

      <VolunteerModal isOpen={isOpen} onClose={onClose} />
      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={feedbackModal.onClose}
        message={message}
        rating={rating}
        submitting={submitting}
        onMessageChange={setMessage}
        onRatingChange={setRating}
        onSubmit={submitFeedback}
      />
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
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 1 }} spacing={3}>
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

function FeedbackCard({ item, deleting, onDelete }) {
  const rating = Math.max(1, Math.min(5, Number(item.rating) || 5));
  const user = getUser();
  const canDelete = Boolean(user?.token && item.partnerId && user.id === item.partnerId);
  return (
    <HStack align="start" bg="warm.cream" rounded="16px" p={3} spacing={3} position="relative">
      <DefaultAvatar />
      <Box>
        <HStack color="orange.400" spacing={1}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon key={index} as={FaStar} boxSize={3.5} opacity={index < rating ? 1 : 0.25} />
          ))}
        </HStack>
        <Text mt={1} color="warm.brown" fontWeight="900" fontSize="sm">
          {item.name} ｜ {item.role || '暖心志工'}
        </Text>
        <Text color="gray.700" fontSize="sm" lineHeight="1.7">
          {item.message}
        </Text>
      </Box>
      {canDelete && (
        <IconButton
          aria-label="刪除心得"
          icon={<FaTrash />}
          size="sm"
          variant="ghost"
          color="gray.500"
          position="absolute"
          top="8px"
          right="8px"
          isLoading={deleting}
          onClick={() => onDelete(item)}
          _hover={{ bg: 'orange.50', color: 'warm.orange' }}
        />
      )}
    </HStack>
  );
}

function FeedbackModal({ isOpen, onClose, message, rating, submitting, onMessageChange, onRatingChange, onSubmit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'sm', md: 'lg' }}>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(4px)" />
      <ModalContent rounded="24px" bg="white" border="1px solid" borderColor="orange.100">
        <ModalHeader color="warm.brown">
          <HStack>
            <Icon as={FaPenToSquare} color="warm.orange" />
            <Text>分享你的心得</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text mb={3} color="gray.600" fontSize="sm" fontWeight="700">
            你的分享能鼓勵更多志工一起參與。
          </Text>
          <Box position="relative">
            <Textarea
              value={message}
              onChange={(event) => onMessageChange(event.target.value.slice(0, 300))}
              placeholder="請分享你的志工體驗、感受或收穫..."
              minH="170px"
              resize="vertical"
              rounded="14px"
              borderColor="orange.200"
              _focus={{ borderColor: 'warm.orange', boxShadow: '0 0 0 1px #ff8a3d' }}
            />
            <Text position="absolute" right="12px" bottom="8px" color="gray.500" fontWeight="800" fontSize="sm">
              {message.length}/300
            </Text>
          </Box>
          <Text mt={4} mb={2} color="warm.brown" fontWeight="900">
            這次服務的整體滿意度
          </Text>
          <HStack spacing={2} mb={5} flexWrap="wrap">
            {Array.from({ length: 5 }).map((_, index) => {
              const value = index + 1;
              return (
                <Button key={value} variant="ghost" minW="36px" h="36px" p={0} color={value <= rating ? 'warm.orange' : 'gray.300'} onClick={() => onRatingChange(value)} _hover={{ bg: 'orange.50' }}>
                  <Icon as={FaStar} boxSize={7} />
                </Button>
              );
            })}
            <Text color="gray.500" fontSize="sm">
              點擊星星評分
            </Text>
          </HStack>
          <Button leftIcon={<FaPaperPlane />} w="100%" bg="warm.orange" color="white" isLoading={submitting} onClick={onSubmit}>
            送出心得
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function DefaultAvatar() {
  return (
    <Flex align="center" justify="center" boxSize="58px" rounded="full" bg="gray.200" color="gray.500" flexShrink={0}>
      <Icon as={FaPaw} boxSize={6} />
    </Flex>
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
            加入志工團隊，一起讓浪浪的明天更美好。
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
              歡迎先與我們聯繫，志工夥伴會協助你了解服務內容、排班方式與安全規範。
            </Text>
            <ContactLine icon={FaPhone} text="04-1234-5678" />
            <ContactLine icon={FaEnvelope} text="adopt@warm-paws.com" />
            <ContactLine icon={FaHouse} text="台中市毛孩路 88 號" />
            <ContactLine icon={FaRegClock} text="週一至週日 10:00-18:00" />
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
