import { Box, Container, Flex, Heading, HStack, Icon, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaChartLine, FaHeart, FaHouseChimney, FaPaw, FaPeopleGroup } from 'react-icons/fa6';
import aboutHero from '../../image/179a3ea4-9650-4a88-899a-e9577b965c72.png';

const sections = [
  {
    title: '中途之家故事',
    icon: FaHouseChimney,
    content: '暖心毛孩從幾位志工的臨時安置開始，慢慢成為協助流浪毛孩重新回家的中途之家。',
    image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '成立理念',
    icon: FaHeart,
    content: '我們相信認養不是施捨，而是一次彼此陪伴、彼此成全的長期承諾。',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '團隊介紹',
    icon: FaPeopleGroup,
    content: '團隊包含照護志工、獸醫合作夥伴、行為陪伴志工與認養訪談夥伴。',
    image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: '認養成果',
    icon: FaChartLine,
    content: '目前已協助超過 320 隻毛孩找到家，也持續追蹤牠們的生活適應。',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    stat: '已有 320+ 隻毛孩找到幸福的家',
  },
];

export default function About() {
  return (
    <Box bg="linear-gradient(180deg, #fff8ea 0%, #fffaf3 48%, #fff4df 100%)" minH="100vh">
      <Hero />

      <Container maxW="1280px" px={{ base: 4, md: 8 }} mt={{ base: -8, md: -10 }} pb={{ base: 12, md: 16 }} position="relative" zIndex={2}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 5, md: 6 }}>
          {sections.map((item) => (
            <StoryCard key={item.title} item={item} />
          ))}
        </SimpleGrid>

        <ThanksBand />
      </Container>
    </Box>
  );
}

function Hero() {
  return (
    <Box position="relative" overflow="hidden" minH={{ base: '360px', md: '430px' }}>
      <Box
        position="absolute"
        inset="0"
        bgImage={`linear-gradient(90deg, rgba(255,248,234,.94) 0%, rgba(255,248,234,.78) 34%, rgba(255,248,234,.18) 100%), url(${aboutHero})`}
        bgSize="cover"
        bgPos={{ base: 'center', lg: 'center 45%' }}
      />
      <Container maxW="1280px" px={{ base: 5, md: 8 }} position="relative" zIndex={1} pt={{ base: 14, md: 20 }}>
        <Box maxW={{ base: '100%', md: '520px' }} color="warm.brown">
          <HStack spacing={3} mb={2} color="warm.orange">
            <Icon as={FaPaw} boxSize={{ base: 5, md: 6 }} />
            <Icon as={FaHeart} boxSize={{ base: 4, md: 5 }} transform="rotate(12deg)" />
          </HStack>
          <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} lineHeight="1.1" letterSpacing="0" mb={5}>
            關於我們
          </Heading>
          <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="800" lineHeight="1.8">
            因為相信愛能改變一切，
            <br />
            我們陪伴毛孩走向更好的未來。
          </Text>
        </Box>
      </Container>
      <Box
        position="absolute"
        left="-5%"
        right="-5%"
        bottom="-54px"
        h={{ base: '100px', md: '120px' }}
        bg="#fff8ea"
        borderTopRadius="50% 70%"
        transform="rotate(-1deg)"
      />
    </Box>
  );
}

function StoryCard({ item }) {
  return (
    <Box
      bg="rgba(255,255,255,.92)"
      rounded="24px"
      minH={{ base: '300px', md: '330px' }}
      overflow="hidden"
      border="1px solid"
      borderColor="orange.100"
      boxShadow="0 16px 36px rgba(111, 69, 31, 0.12)"
      position="relative"
      transition="all .22s ease"
      _hover={{ transform: 'translateY(-6px)', boxShadow: '0 22px 46px rgba(111, 69, 31, 0.16)' }}
    >
      <Flex align="flex-start" gap={{ base: 4, md: 6 }} p={{ base: 6, md: 8 }} position="relative" zIndex={2}>
        <Flex
          align="center"
          justify="center"
          boxSize={{ base: '64px', md: '82px' }}
          rounded="full"
          bg="orange.50"
          color="warm.orange"
          flexShrink={0}
        >
          <Icon as={item.icon} boxSize={{ base: 8, md: 10 }} />
        </Flex>

        <VStack align="start" spacing={3} color="warm.brown">
          <Heading fontSize={{ base: '2xl', md: '3xl' }} letterSpacing="0">
            {item.title}
          </Heading>
          <Text color="warm.ink" fontSize={{ base: 'md', md: 'lg' }} lineHeight="1.9" fontWeight="600">
            {item.content}
          </Text>
          {item.stat && (
            <HStack mt={2} px={5} py={3} rounded="16px" border="2px solid" borderColor="orange.100" bg="rgba(255,248,234,.88)" color="warm.brown">
              <Icon as={FaHeart} color="warm.orange" />
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="900">
                {item.stat}
              </Text>
            </HStack>
          )}
        </VStack>
      </Flex>

      <Image
        src={item.image}
        alt={item.title}
        position={{ base: 'relative', md: 'absolute' }}
        right="0"
        bottom="0"
        w={{ base: '100%', md: '48%' }}
        h={{ base: '150px', md: '58%' }}
        objectFit="cover"
        opacity={{ base: 0.95, md: 0.9 }}
      />
      <Box position="absolute" inset="0" bg="linear-gradient(180deg, rgba(255,255,255,0) 48%, rgba(255,248,234,.7) 100%)" pointerEvents="none" />
    </Box>
  );
}

function ThanksBand() {
  return (
    <Flex
      mt={6}
      align="center"
      justify="space-between"
      gap={5}
      bg="rgba(255,255,255,.94)"
      rounded="22px"
      border="1px solid"
      borderColor="orange.100"
      boxShadow="0 14px 30px rgba(111, 69, 31, 0.1)"
      overflow="hidden"
      px={{ base: 5, md: 8 }}
      py={{ base: 5, md: 4 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <HStack spacing={5} align="center">
        <Flex align="center" justify="center" boxSize={{ base: '56px', md: '74px' }} rounded="full" bg="orange.50" color="warm.orange" flexShrink={0}>
          <Icon as={FaHeart} boxSize={{ base: 7, md: 9 }} />
        </Flex>
        <Box>
          <Heading fontSize={{ base: '2xl', md: '3xl' }} color="warm.brown" letterSpacing="0">
            感謝有您
          </Heading>
          <Text mt={2} color="warm.ink" fontSize={{ base: 'md', md: 'lg' }} fontWeight="700">
            每一次捐款、每一次認養、每一次分享，都是改變的力量！
          </Text>
        </Box>
      </HStack>
      <Image
        src="https://images.unsplash.com/photo-1601758174039-617983b8cdd1?auto=format&fit=crop&w=720&q=80"
        alt="貓狗互動"
        w={{ base: '100%', md: '34%' }}
        h={{ base: '130px', md: '120px' }}
        objectFit="cover"
        rounded={{ base: '16px', md: '0' }}
      />
    </Flex>
  );
}
