import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaClipboardList,
  FaComments,
  FaHandshakeAngle,
  FaHeart,
  FaHeartCircleCheck,
  FaHouseCircleCheck,
  FaMagnifyingGlass,
  FaPaw,
  FaPeopleArrows,
} from 'react-icons/fa6';

const MotionBox = motion(Box);

const steps = [
  {
    title: '瀏覽毛孩資料',
    desc: '先認識個性、年齡與健康狀況。',
    icon: FaMagnifyingGlass,
    image: '../../image/29ff8712-75d0-48b6-9a29-bae1446cc79e.png',
  },
  {
    title: '聯繫我們',
    desc: '詢問想認養的毛孩與見面時段。',
    icon: FaComments,
    image: '../../image/a8ad0547-c5d6-4247-b971-df5d0fef9c5f.png',
  },
  {
    title: '初步訪談',
    desc: '了解生活作息、居住環境與照顧經驗。',
    icon: FaClipboardList,
    image: '../../image/babbc074-4295-47c2-8ae2-c24df69d6bae.png',
  },
  {
    title: '互動見面',
    desc: '安排實際相處，確認彼此適合。',
    icon: FaPeopleArrows,
    image: '../../image/fd167ae9-fdf1-49db-8430-71b4609d3f82.png',
  },
  {
    title: '環境評估',
    desc: '協助確認家中安全與照護準備。',
    icon: FaHouseCircleCheck,
    image: '../../image/95519911-d7b2-4f40-bb48-b99ba2e834ae.png',
  },
  {
    title: '完成認養',
    desc: '簽署文件，把牠安心帶回家。',
    icon: FaHeartCircleCheck,
    image: '../../image/046e8568-9dc3-45d0-abfd-6d45f9220a58.png',
  },
  {
    title: '後續陪伴',
    desc: '持續追蹤適應情況並提供支援。',
    icon: FaHandshakeAngle,
    image: '../../image/671ca276-9278-488a-91f3-9edba08f27e6.png',
  },
];

export default function Process() {
  return (
    <Box bg="linear-gradient(180deg, #fff8ec 0%, #fffdf8 55%, #fff4df 100%)">
      <Container maxW="1280px" py={{ base: 10, md: 14 }} px={{ base: 4, md: 8 }}>
        <MotionBox
          textAlign="center"
          mb={{ base: 8, md: 10 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <HStack justify="center" color="warm.orange" spacing={3} mb={3}>
            <Icon as={FaHeart} boxSize={6} />
            <Heading fontSize={{ base: '4xl', md: '6xl' }} color="warm.brown" letterSpacing="0.04em">
              認養流程
            </Heading>
            <Icon as={FaPaw} boxSize={6} />
          </HStack>

          <Text fontSize={{ base: 'md', md: 'xl' }} color="warm.brown" fontWeight="800">
            簡單七步驟，讓愛有個家
          </Text>
        </MotionBox>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
          gap={{ base: 5, md: 6 }}
        >
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </Grid>

        <Box
          mt={{ base: 8, md: 10 }}
          rounded="32px"
          overflow="hidden"
          bg="linear-gradient(90deg, #fff2d9 0%, #fffaf1 55%, #ffe5c4 100%)"
          border="1px solid"
          borderColor="orange.100"
          boxShadow="0 18px 42px rgba(111, 69, 31, 0.12)"
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            gap={6}
            px={{ base: 6, md: 10 }}
            py={{ base: 7, md: 8 }}
          >
            <Box>
              <HStack color="warm.orange" mb={2}>
                <Icon as={FaPaw} />
                <Text fontWeight="900">每一份愛，都能改變牠們的未來</Text>
              </HStack>

              <Heading color="warm.brown" fontSize={{ base: '2xl', md: '3xl' }}>
                準備好遇見你的命定毛孩了嗎？
              </Heading>

              <Text mt={3} color="gray.700" fontWeight="700">
                從認識、見面到正式回家，我們陪你一步一步完成。
              </Text>
            </Box>

            <Button
              size="lg"
              rounded="full"
              bg="warm.orange"
              color="white"
              px={10}
              h="54px"
              fontWeight="900"
              leftIcon={<Icon as={FaHeart} />}
              _hover={{
                bg: 'orange.500',
                transform: 'translateY(-2px)',
                boxShadow: '0 14px 28px rgba(255, 122, 48, 0.28)',
              }}
            >
              立即看看毛孩
            </Button>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

function StepCard({ step, index }) {
  return (
    <MotionBox
      bg="rgba(255,255,255,0.92)"
      rounded="30px"
      overflow="hidden"
      border="1px solid"
      borderColor="orange.100"
      boxShadow="0 16px 36px rgba(111, 69, 31, 0.10)"
      position="relative"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
    >
      <Box h="180px" bg="orange.50" position="relative" overflow="hidden">
        <Image
          src={step.image}
          alt={step.title}
          w="100%"
          h="100%"
          objectFit="cover"
          fallback={
            <Flex w="100%" h="100%" align="center" justify="center" bg="orange.50">
              <Icon as={step.icon} boxSize={14} color="warm.orange" />
            </Flex>
          }
        />

        <Box position="absolute" inset="0" bg="linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.18))" />

        <HStack
          position="absolute"
          top={4}
          left={4}
          bg="warm.orange"
          color="white"
          rounded="full"
          px={4}
          py={1.5}
          fontSize="sm"
          fontWeight="900"
        >
          <Text>STEP {index + 1}</Text>
        </HStack>
      </Box>

      <VStack align="start" spacing={3} p={6}>
        <HStack spacing={4}>
          <Flex
            boxSize="58px"
            rounded="full"
            bg="orange.50"
            color="warm.orange"
            align="center"
            justify="center"
            boxShadow="0 10px 22px rgba(255, 130, 55, 0.16)"
          >
            <Icon as={step.icon} boxSize={7} />
          </Flex>

          <Heading fontSize="2xl" color="warm.brown">
            {step.title}
          </Heading>
        </HStack>

        <Text color="gray.700" lineHeight="1.8" fontWeight="700">
          {step.desc}
        </Text>
      </VStack>
    </MotionBox>
  );
}