import { Box, Container, Flex, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  FaClipboardList,
  FaComments,
  FaHandshakeAngle,
  FaHeartCircleCheck,
  FaHouseCircleCheck,
  FaMagnifyingGlass,
  FaPeopleArrows,
} from 'react-icons/fa6';

const MotionBox = motion(Box);

const steps = [
  { title: '瀏覽毛孩資料', desc: '先認識個性、年齡與健康狀況。', icon: FaMagnifyingGlass },
  { title: '聯繫我們', desc: '詢問想認養的毛孩與見面時段。', icon: FaComments },
  { title: '初步訪談', desc: '了解生活作息、居住環境與照顧經驗。', icon: FaClipboardList },
  { title: '互動見面', desc: '安排實際相處，確認彼此適合。', icon: FaPeopleArrows },
  { title: '環境評估', desc: '協助確認家中安全與照護準備。', icon: FaHouseCircleCheck },
  { title: '完成認養', desc: '簽署文件，把牠安心帶回家。', icon: FaHeartCircleCheck },
  { title: '後續陪伴', desc: '持續追蹤適應情況並提供支援。', icon: FaHandshakeAngle },
];

export default function Process() {
  return (
    <Box>
      <Box bg="linear-gradient(120deg, #fff8ea 0%, #ffe7bd 50%, #e1f5ff 100%)" py={{ base: 12, md: 16 }}>
        <Container maxW="1180px" px={{ base: 4, md: 8 }}>
          <MotionBox initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} color="warm.brown" lineHeight="1.2">
              認養不是一時衝動，是一輩子的約定
            </Heading>
            <Text mt={4} fontSize={{ base: 'md', md: 'xl' }} fontWeight="800" color="warm.ink">
              從認識、見面到正式回家，我們用清楚流程陪你一步一步確認。
            </Text>
          </MotionBox>
        </Container>
      </Box>

      <Container maxW="1220px" py={{ base: 10, md: 14 }} px={{ base: 4, md: 8 }}>
        <Box
          bg="white"
          rounded={{ base: '24px', md: '32px' }}
          p={{ base: 5, md: 8 }}
          boxShadow="0 18px 44px rgba(111, 69, 31, 0.12)"
          border="1px solid"
          borderColor="orange.100"
        >
          <DesktopFlow />
          <MobileFlow />
        </Box>
      </Container>
    </Box>
  );
}

function DesktopFlow() {
  return (
    <Box display={{ base: 'none', lg: 'block' }}>
      <Flex align="center" justify="space-between" gap={0}>
        {steps.slice(0, 4).map((step, index) => (
          <FlowNode key={step.title} step={step} index={index} showLine={index < 3} />
        ))}
      </Flex>

      <Flex justify="flex-end" pr="12%" py={6}>
        <Box w="3px" h="70px" bg="orange.200" position="relative">
          <Box position="absolute" bottom="-7px" left="-5px" boxSize="13px" rounded="full" bg="warm.orange" />
        </Box>
      </Flex>

      <Flex align="center" justify="space-between" direction="row-reverse" gap={0}>
        {steps.slice(4).map((step, offset) => {
          const index = offset + 4;
          return <FlowNode key={step.title} step={step} index={index} showLine={offset < 2} reverse />;
        })}
      </Flex>
    </Box>
  );
}

function FlowNode({ step, index, showLine, reverse = false }) {
  return (
    <HStack flex="1" spacing={0} direction={reverse ? 'row-reverse' : 'row'}>
      <VStack
        minW="170px"
        maxW="190px"
        minH="190px"
        rounded="28px"
        p={5}
        bg={index % 2 === 0 ? 'warm.cream' : 'orange.50'}
        border="1px solid"
        borderColor="orange.100"
        boxShadow="0 10px 24px rgba(111, 69, 31, 0.08)"
        transition="all 0.22s ease"
        _hover={{ transform: 'translateY(-6px)', boxShadow: '0 18px 34px rgba(111, 69, 31, 0.16)' }}
      >
        <HStack align="center" justify="center" boxSize="58px" rounded="full" bg="white" color="warm.orange" boxShadow="md">
          <Icon as={step.icon} boxSize={7} />
        </HStack>
        <Text fontSize="sm" fontWeight="900" color="warm.orange">
          STEP {index + 1}
        </Text>
        <Heading fontSize="xl" color="warm.brown" textAlign="center">
          {step.title}
        </Heading>
        <Text fontSize="sm" color="gray.700" textAlign="center" lineHeight="1.7">
          {step.desc}
        </Text>
      </VStack>

      {showLine && (
        <Box flex="1" minW="42px" h="3px" bg="orange.200" position="relative">
          <Box
            position="absolute"
            right={reverse ? 'auto' : '-2px'}
            left={reverse ? '-2px' : 'auto'}
            top="-5px"
            boxSize="13px"
            rounded="full"
            bg="warm.orange"
          />
        </Box>
      )}
    </HStack>
  );
}

function MobileFlow() {
  return (
    <VStack display={{ base: 'flex', lg: 'none' }} align="stretch" spacing={0}>
      {steps.map((step, index) => (
        <HStack key={step.title} align="stretch" spacing={4}>
          <VStack spacing={0}>
            <HStack align="center" justify="center" boxSize="54px" rounded="full" bg="warm.orange" color="white" boxShadow="md">
              <Icon as={step.icon} boxSize={6} />
            </HStack>
            {index < steps.length - 1 && <Box flex="1" w="3px" bg="orange.200" minH="76px" />}
          </VStack>

          <Box pb={index < steps.length - 1 ? 7 : 0} flex="1">
            <Text fontSize="sm" fontWeight="900" color="warm.orange">
              STEP {index + 1}
            </Text>
            <Heading fontSize={{ base: 'xl', md: '2xl' }} color="warm.brown">
              {step.title}
            </Heading>
            <Text mt={2} color="gray.700" lineHeight="1.8">
              {step.desc}
            </Text>
          </Box>
        </HStack>
      ))}
    </VStack>
  );
}
