import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaCameraRetro,
  FaCat,
  FaDog,
  FaEnvelope,
  FaHeart,
  FaPeopleCarryBox,
  FaPhone,
  FaRegClock,
} from 'react-icons/fa6';
import { GiPartyPopper } from 'react-icons/gi';
import volunteerHero from '../../image/feb89baf-9e79-4e32-85b8-dc10210384f0.png?url';
import AdoptionModal from '../components/AdoptionModal.jsx';

const MotionBox = motion(Box);

const volunteerTypes = [
  { title: '陪伴散步志工', icon: FaDog },
  { title: '貓房陪伴志工', icon: FaCat },
  { title: '活動支援志工', icon: GiPartyPopper },
  { title: '攝影與社群志工', icon: FaCameraRetro },
];

const conditions = ['年滿 16 歲', '喜歡動物、有耐心', '願意遵守中心安全規範', '可固定或彈性排班'];

const volunteerContact = {
  name: '志工招募',
  breed: '暖心毛孩夥伴',
  age: '彈性排班',
  gender: '不限',
  images: [volunteerHero],
};

export default function Volunteer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <PageHero onOpen={onOpen} />
      <Container maxW="1180px" py={{ base: 10, md: 14 }} px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: '1fr', lg: '1.1fr 0.9fr' }} gap={{ base: 5, md: 8 }}>
          <SectionCard title="我們需要的志工">
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {volunteerTypes.map((item) => (
                <HStack key={item.title} p={5} bg="warm.cream" rounded="2xl" spacing={4}>
                  <Icon as={item.icon} boxSize={8} color="warm.orange" />
                  <Text fontWeight="900">{item.title}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </SectionCard>

          <SectionCard title="志工條件">
            <VStack align="stretch" spacing={4}>
              {conditions.map((item) => (
                <HStack key={item} p={4} bg="green.50" rounded="xl">
                  <Icon as={FaHeart} color="warm.rose" />
                  <Text fontWeight="800">{item}</Text>
                </HStack>
              ))}
            </VStack>
          </SectionCard>
        </Grid>

        <Box mt={8} bg="white" rounded="3xl" p={{ base: 6, md: 8 }} boxShadow="0 14px 34px rgba(111, 69, 31, 0.12)">
          <HStack spacing={4} mb={4}>
            <Icon as={FaPeopleCarryBox} boxSize={9} color="warm.green" />
            <Heading fontSize={{ base: '2xl', md: '3xl' }} color="warm.brown">
              加入方式
            </Heading>
          </HStack>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" mb={6} lineHeight="1.9">
            歡迎留下你的時間與想參與的類型，我們會協助安排最適合你的志工時段。
          </Text>
          <HStack spacing={5} flexWrap="wrap" mb={7}>
            <Info icon={FaPhone} text="04-1234-5678" />
            <Info icon={FaEnvelope} text="mark950507@gmail.com" />
            <Info icon={FaRegClock} text="週一至週日 10:00–18:00" />
          </HStack>
          <Button leftIcon={<FaHeart />} bg="warm.orange" color="white" size="lg" px={10} onClick={onOpen}>
            我要加入志工
          </Button>
        </Box>
      </Container>
      <AdoptionModal animal={volunteerContact} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

function PageHero({ onOpen }) {
  return (
    <Box bg="linear-gradient(120deg, #e1f5ff 0%, #fff8ea 48%, #dff0cf 100%)" py={{ base: 8, md: 12 }}>
      <Container maxW="1220px" px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: '1fr', lg: '0.82fr 1.18fr' }} gap={{ base: 7, lg: 10 }} alignItems="center">
          <MotionBox initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} color="warm.brown" lineHeight="1.2">
              一起成為毛孩的溫柔後盾
            </Heading>
            <Text mt={5} fontSize={{ base: 'md', md: 'xl' }} fontWeight="800" color="warm.ink" lineHeight="1.9">
              你的幾個小時，可能就是牠重新相信世界的開始。
            </Text>
            <Button mt={7} leftIcon={<FaHeart />} bg="warm.orange" color="white" size="lg" onClick={onOpen}>
              我要加入志工
            </Button>
          </MotionBox>

          <MotionBox initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Image
              src={`${volunteerHero}?v=20260617-volunteer`}
              alt="志工陪伴毛孩"
              w="100%"
              rounded={{ base: '24px', md: '32px' }}
              boxShadow="0 22px 48px rgba(111, 69, 31, 0.18)"
              border="8px solid rgba(255,255,255,0.72)"
            />
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
}

function SectionCard({ title, children }) {
  return (
    <Box
      bg="white"
      rounded="3xl"
      p={{ base: 6, md: 8 }}
      boxShadow="0 14px 34px rgba(111, 69, 31, 0.12)"
      border="1px solid"
      borderColor="orange.100"
      transition="all 0.22s ease"
      _hover={{ transform: 'translateY(-6px)', boxShadow: '0 20px 42px rgba(111, 69, 31, 0.18)' }}
    >
      <Heading fontSize={{ base: '2xl', md: '3xl' }} color="warm.brown" mb={6}>
        {title}
      </Heading>
      {children}
    </Box>
  );
}

function Info({ icon, text }) {
  return (
    <HStack bg="warm.cream" px={4} py={3} rounded="full">
      <Icon as={icon} color="warm.orange" />
      <Text fontWeight="800">{text}</Text>
    </HStack>
  );
}
