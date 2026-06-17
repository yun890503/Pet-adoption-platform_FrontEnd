import { Box, Container, Divider, HStack, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLine, FaLocationDot, FaPaw, FaPhone } from 'react-icons/fa6';

export default function Footer() {
  return (
    <Box as="footer" bg="warm.green" color="white" pt={10} pb={8}>
      <Container maxW="1180px">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} alignItems="center">
          <HStack spacing={4}>
            <HStack justify="center" boxSize="58px" rounded="full" border="2px solid white">
              <Icon as={FaPaw} boxSize={7} />
            </HStack>
            <Box>
              <Text fontSize="2xl" fontWeight="900">
                暖心毛孩認養中心
              </Text>
              <Text opacity={0.88}>用愛成就每一次相遇</Text>
            </Box>
          </HStack>

          <VStack align="start" spacing={2}>
            <FooterLine icon={FaPhone} text="04-1234-5678" />
            <FooterLine icon={FaEnvelope} text="mark950507@gmail.com" />
            <FooterLine icon={FaLocationDot} text="台中市毛孩路 88 號" />
            <FooterLine icon={FaPaw} text="營業時間：週一至週日 10:00–18:00" />
          </VStack>

          <VStack align={{ base: 'start', md: 'end' }} spacing={3}>
            <Text fontSize="lg" fontWeight="900">
              追蹤我們
            </Text>
            <HStack spacing={3}>
              {[FaFacebookF, FaInstagram, FaLine].map((item, index) => (
                <HStack
                  key={index}
                  justify="center"
                  boxSize="42px"
                  rounded="full"
                  bg="white"
                  color={index === 0 ? 'blue.500' : index === 1 ? 'pink.500' : 'green.500'}
                  boxShadow="md"
                >
                  <Icon as={item} boxSize={5} />
                </HStack>
              ))}
            </HStack>
          </VStack>
        </SimpleGrid>
        <Divider my={7} opacity={0.25} />
        <Text fontSize="sm" opacity={0.85} textAlign="center">
          © 2026 暖心毛孩認養中心
        </Text>
      </Container>
    </Box>
  );
}

function FooterLine({ icon, text }) {
  return (
    <HStack>
      <Icon as={icon} />
      <Text>{text}</Text>
    </HStack>
  );
}
