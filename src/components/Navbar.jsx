import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaPaw } from 'react-icons/fa6';

const links = [
  { label: '首頁', to: '/' },
  { label: '毛孩列表', to: '/animals' },
  { label: '志工招募', to: '/volunteer' },
  { label: '認養流程', to: '/process' },
  { label: '關於我們', to: '/about' },
  { label: '聯絡我們', to: '/contact' },
  { label: '會員中心', to: '/profile' },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="20"
      bg="rgba(255, 248, 234, 0.94)"
      backdropFilter="blur(14px)"
      borderBottom="1px solid"
      borderColor="orange.100"
      boxShadow="0 8px 28px rgba(111, 69, 31, 0.10)"
    >
      <Container maxW="1448px" py={{ base: 3, lg: 4 }} px={{ base: 4, md: 8 }}>
        <Flex align="center" justify="space-between" gap={4}>
          <Brand />

          <HStack as="nav" spacing={2} justify="flex-end" flex="1" display={{ base: 'none', lg: 'flex' }}>
            {links.map((link) => (
              <NavButton key={link.to} link={link} />
            ))}
          </HStack>

          <IconButton
            display={{ base: 'inline-flex', lg: 'none' }}
            aria-label="開啟選單"
            icon={<FaBars />}
            rounded="full"
            bg="white"
            color="warm.brown"
            border="1px solid"
            borderColor="orange.100"
            onClick={onOpen}
          />
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="warm.cream">
          <DrawerCloseButton />
          <DrawerHeader>
            <Brand />
          </DrawerHeader>
          <DrawerBody>
            <VStack as="nav" align="stretch" spacing={3}>
              {links.map((link) => (
                <Button
                  key={link.to}
                  as={NavLink}
                  to={link.to}
                  justifyContent="flex-start"
                  bg="white"
                  color="warm.brown"
                  border="1px solid"
                  borderColor="orange.100"
                  onClick={onClose}
                  _activeLink={{ bg: 'warm.orange', color: 'white' }}
                >
                  {link.label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

function Brand() {
  return (
    <HStack as={NavLink} to="/" spacing={3} minW="fit-content" _hover={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        justify="center"
        boxSize={{ base: '42px', md: '52px' }}
        rounded="full"
        bg="warm.orange"
        color="white"
        boxShadow="0 8px 18px rgba(255, 138, 61, 0.35)"
      >
        <Icon as={FaPaw} boxSize={{ base: 5, md: 6 }} />
      </Flex>
      <VStack spacing={0} align="start">
        <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="900" color="warm.brown">
          暖心毛孩
        </Text>
        <Text fontSize="xs" fontWeight="800" letterSpacing="0.18em" color="warm.brown">
          認養中心
        </Text>
      </VStack>
    </HStack>
  );
}

function NavButton({ link }) {
  return (
    <Button
      as={NavLink}
      to={link.to}
      size="sm"
      px={{ lg: 3, xl: 4 }}
      bg="white"
      color="warm.brown"
      boxShadow="0 5px 16px rgba(111, 69, 31, 0.10)"
      border="1px solid"
      borderColor="orange.100"
      _hover={{ bg: 'warm.creamDeep', transform: 'translateY(-3px) scale(1.04)' }}
      _activeLink={{
        bg: 'warm.orange',
        color: 'white',
        borderColor: 'warm.orange',
        boxShadow: '0 8px 18px rgba(255, 138, 61, 0.38)',
      }}
    >
      {link.label}
    </Button>
  );
}
