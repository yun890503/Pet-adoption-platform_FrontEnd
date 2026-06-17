import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaEnvelope, FaHeart, FaLocationDot, FaPhone, FaPaw } from 'react-icons/fa6';

export default function AdoptionModal({ animal, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" motionPreset="scale">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        mx={4}
        maxW={{ base: 'calc(100vw - 24px)', md: '560px' }}
        maxH="calc(100vh - 32px)"
        overflowY="auto"
        rounded="24px"
        bg="linear-gradient(135deg, #fffdf7 0%, #fff8ea 100%)"
        boxShadow="0 28px 70px rgba(63, 43, 27, 0.35)"
        border="1px solid"
        borderColor="orange.100"
      >
        <ModalHeader textAlign="center" pt={{ base: 6, md: 7 }} px={{ base: 5, md: 8 }} pb={2}>
          <HStack justify="center" spacing={3}>
            <Icon as={FaPaw} color="warm.orange" boxSize={{ base: 5, md: 6 }} />
            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="900" color="warm.brown" lineHeight="1.35">
              你目前正在詢問：
              <Box as="span" color="warm.orange">
                {animal?.name}
              </Box>
            </Text>
          </HStack>
        </ModalHeader>

        <ModalCloseButton
          rounded="full"
          bg="white"
          color="warm.brown"
          boxShadow="md"
          top={4}
          right={4}
        />

        <ModalBody px={{ base: 5, md: 8 }} py={4}>
          <VStack align="stretch" spacing={5}>
            <HStack
              bg="white"
              rounded="20px"
              p={4}
              spacing={4}
              boxShadow="0 10px 24px rgba(111, 69, 31, 0.10)"
              align="center"
            >
              <Image
                src={animal?.images?.[0]}
                alt={animal?.name}
                boxSize={{ base: '92px', md: '112px' }}
                objectFit="cover"
                rounded="full"
                flexShrink={0}
              />
              <Box minW={0}>
                <HStack color="warm.orange" fontWeight="900" spacing={2}>
                  <Icon as={FaHeart} />
                  <Text fontSize={{ base: 'xl', md: '2xl' }} noOfLines={1}>
                    {animal?.name}
                  </Text>
                </HStack>
                <Text mt={1} color="gray.700" fontWeight="700" noOfLines={2}>
                  {animal?.breed}｜{animal?.age}｜{animal?.gender}
                </Text>
              </Box>
            </HStack>

            <Box bg="warm.creamDeep" rounded="20px" p={{ base: 4, md: 5 }} boxShadow="sm">
              <Text fontSize="xl" fontWeight="900" color="warm.brown" mb={4}>
                聯絡我們
              </Text>
              <VStack align="stretch" spacing={3}>
                <Contact icon={FaPhone} label="聯絡電話" value="04-1234-5678" />
                <Contact icon={FaEnvelope} label="信箱" value="adopt@warm-paws.com" />
                <Contact icon={FaLocationDot} label="地址" value="台中市毛孩路 88 號" />
              </VStack>
            </Box>

            <Box bg="green.50" rounded="20px" p={{ base: 4, md: 5 }} boxShadow="sm">
              <HStack color="warm.rose" fontWeight="900" mb={2}>
                <Icon as={FaHeart} />
                <Text>貼心提醒</Text>
              </HStack>
              <Text lineHeight="1.8" color="gray.700">
                歡迎先與我們聯繫，我們會協助你了解牠的個性與照顧需求。
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center" px={{ base: 5, md: 8 }} pb={{ base: 6, md: 7 }}>
          <Button
            leftIcon={<FaHeart />}
            bg="warm.orange"
            color="white"
            w={{ base: '100%', sm: 'auto' }}
            minW={{ sm: '220px' }}
            size="lg"
            boxShadow="0 10px 20px rgba(255, 138, 61, 0.36)"
            onClick={onClose}
          >
            我知道了
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function Contact({ icon, label, value }) {
  return (
    <HStack spacing={3} bg="rgba(255,255,255,0.82)" rounded="16px" p={3} align="center">
      <HStack justify="center" boxSize="40px" rounded="full" bg="orange.50" flexShrink={0}>
        <Icon as={icon} boxSize={5} color="warm.orange" />
      </HStack>
      <Box minW={0}>
        <Text fontSize="sm" fontWeight="900" color="warm.brown">
          {label}
        </Text>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.800" wordBreak="break-word" lineHeight="1.45">
          {value}
        </Text>
      </Box>
    </HStack>
  );
}
