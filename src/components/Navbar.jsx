import {
  Box,
  Button,
  Container,
  Divider,
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
  Collapse,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaCalendarCheck,
  FaCalendarDays,
  FaCircleUser,
  FaClipboardList,
  FaHeart,
  FaHouse,
  FaPaw,
  FaRightFromBracket,
  FaRegUser,
} from 'react-icons/fa6';
import { clearUser, getUser } from '../utils/storage.js';

const links = [
  { label: '毛孩列表', to: '/animals' },
  { label: '志工招募', to: '/volunteer' },
  { label: '認養流程', to: '/process' },
  { label: '關於我們', to: '/about' },
  { label: '聯絡我們', to: '/contact' },
];

const memberLinks = [
  { label: '個人資料', to: '/profile', icon: FaRegUser },
  { label: '我的認養申請', to: '/profile/applications', icon: FaClipboardList, dividerBefore: true },
  { label: '認養紀錄', to: '/profile/records', icon: FaCalendarCheck },
  { label: '收藏毛孩', to: '/favorites', icon: FaHeart },
  { label: '預約訪視毛孩', to: '/profile/appointments', icon: FaCalendarDays },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="20"
      bg="rgba(255, 248, 234, 0.96)"
      backdropFilter="blur(14px)"
      borderBottom="1px solid"
      borderColor="orange.100"
      boxShadow="0 8px 28px rgba(111, 69, 31, 0.08)"
    >
      <Container maxW="1500px" py={{ base: 3, lg: 4 }} px={{ base: 4, md: 8 }}>
        <Flex align="center" justify="space-between" gap={5}>
          <Brand />

          <HStack spacing={{ lg: 3, xl: 4 }} ml="auto" display={{ base: 'none', lg: 'flex' }}>
            <HStack as="nav" spacing={{ lg: 2, xl: 3 }}>
              {links.map((link) => (
                <NavButton key={link.to} link={link} />
              ))}
            </HStack>
            <MemberMenu />
          </HStack>

          <HStack display={{ base: 'flex', lg: 'none' }}>
            <IconButton
              aria-label="開啟選單"
              icon={<FaBars />}
              rounded="full"
              bg="white"
              color="warm.brown"
              border="1px solid"
              borderColor="orange.100"
              onClick={onOpen}
            />
          </HStack>
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
              <MobileMemberSection onClose={onClose} />
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
                  w="100%"
                  h="48px"
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

function MobileMemberSection({ onClose }) {
  const navigate = useNavigate();
  const getLoggedInUser = () => {
    const savedUser = getUser();
    return savedUser?.token ? savedUser : null;
  };
  const [user, setUser] = useState(() => getLoggedInUser());
  const memberPanel = useDisclosure();

  useEffect(() => {
    const syncUser = () => setUser(getLoggedInUser());
    window.addEventListener('warm-paws:user-changed', syncUser);
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('warm-paws:user-changed', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const logout = () => {
    clearUser();
    onClose();
    navigate('/login');
  };

  if (!user) {
    return (
      <>
        <Divider borderColor="orange.100" />
        <Button
          as={NavLink}
          to="/login"
          justifyContent="flex-start"
          leftIcon={<FaCircleUser />}
          bg="linear-gradient(90deg, #fff4df 0%, #fffaf2 100%)"
          color="warm.brown"
          border="1px solid"
          borderColor="orange.100"
          w="100%"
          h="48px"
          fontWeight="900"
          onClick={onClose}
        >
          會員登入 / 註冊
        </Button>
      </>
    );
  }

  return (
    <>
      <Divider borderColor="orange.100" />
      <Button
        justifyContent="flex-start"
        leftIcon={<FaCircleUser />}
        bg="linear-gradient(90deg, #fff4df 0%, #fffaf2 100%)"
        color="warm.brown"
        border="1px solid"
        borderColor="orange.100"
        w="100%"
        h="48px"
        fontWeight="900"
        onClick={memberPanel.onToggle}
      >
        會員中心
      </Button>
      <Collapse in={memberPanel.isOpen} animateOpacity>
        <VStack align="stretch" spacing={2} pt={2} pl={3}>
          {memberLinks.map((item) => (
            <Button
              key={item.to}
              as={NavLink}
              to={item.to}
              justifyContent="flex-start"
              leftIcon={<Icon as={item.icon} />}
              bg="white"
              color="warm.brown"
              border="1px solid"
              borderColor="orange.100"
              w="100%"
              h="40px"
              fontSize="sm"
              fontWeight="900"
              rounded="full"
              _activeLink={{ bg: 'warm.orange', color: 'white' }}
              onClick={onClose}
            >
              {item.label}
            </Button>
          ))}
          <Button
            justifyContent="flex-start"
            leftIcon={<FaRightFromBracket />}
            bg="white"
            color="warm.brown"
            border="1px solid"
            borderColor="orange.100"
            w="100%"
            h="40px"
            fontSize="sm"
            fontWeight="900"
            rounded="full"
            onClick={logout}
          >
            登出
          </Button>
        </VStack>
      </Collapse>
    </>
  );
}

function Brand() {
  return (
    <HStack as={NavLink} to="/" spacing={3} minW="fit-content" _hover={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        justify="center"
        boxSize={{ base: '44px', md: '56px' }}
        rounded="full"
        bg="warm.orange"
        color="white"
        boxShadow="0 8px 18px rgba(255, 138, 61, 0.35)"
      >
        <Icon as={FaPaw} boxSize={{ base: 5, md: 7 }} />
      </Flex>
      <VStack spacing={0} align="start">
        <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="900" color="warm.brown" lineHeight="1.05">
          暖心毛孩
        </Text>
        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="800" letterSpacing="0.18em" color="warm.brown">
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
      size={{ lg: 'sm', xl: 'md' }}
      px={{ lg: 4, xl: 6 }}
      minW={{ lg: '86px', xl: '108px' }}
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

function MemberMenu({ compact = false }) {
  const navigate = useNavigate();
  const menu = useDisclosure();
  const getLoggedInUser = () => {
    const savedUser = getUser();
    return savedUser?.token ? savedUser : null;
  };
  const [user, setUser] = useState(() => getLoggedInUser());

  useEffect(() => {
    const syncUser = () => setUser(getLoggedInUser());
    window.addEventListener('warm-paws:user-changed', syncUser);
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('warm-paws:user-changed', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const logout = () => {
    clearUser();
    menu.onClose();
    navigate('/login');
  };

  return (
    <Box onMouseEnter={menu.onOpen} onMouseLeave={menu.onClose} position="relative">
      <Menu isOpen={menu.isOpen} onOpen={menu.onOpen} onClose={menu.onClose} placement="bottom-end" gutter={14}>
        <MenuButton
          as={IconButton}
          aria-label="會員選單"
          icon={<FaCircleUser />}
          boxSize={compact ? '44px' : '58px'}
          minW={compact ? '44px' : '58px'}
          rounded="full"
          bg="white"
          color="warm.brown"
          border="3px solid"
          borderColor="orange.100"
          fontSize={compact ? 'xl' : '2xl'}
          boxShadow="0 8px 22px rgba(111, 69, 31, 0.14)"
          _hover={{ bg: 'white', color: 'warm.orangeDark', transform: 'translateY(-2px)' }}
          _active={{ bg: 'white' }}
          onClick={compact ? menu.onToggle : undefined}
        />

        <MenuList
          position="relative"
          mt={1}
          minW={user ? { base: '132px', md: '150px' } : { base: '150px', md: '170px' }}
          bg="white"
          color="warm.brown"
          border="0"
          rounded="12px"
          p={user ? 1.5 : 2}
          boxShadow="0 20px 45px rgba(111, 69, 31, 0.18)"
          overflow="visible"
          _before={
            {
              content: '""',
              position: 'absolute',
              top: '-9px',
              right: compact ? '20px' : '28px',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderBottom: '9px solid white',
            }
          }
        >
          {user ? (
            <VStack align="stretch" spacing={0.5}>
              {memberLinks.map((item) => (
                <Box key={item.label}>
                  {item.dividerBefore && <Divider my={1} borderColor="orange.100" />}
                  <MenuItem
                    as={NavLink}
                    to={item.to}
                    bg={item.active ? 'linear-gradient(90deg, #fff3df 0%, #fffaf3 100%)' : 'transparent'}
                    color="warm.brown"
                    rounded="9px"
                    py={1.5}
                    px={1.5}
                    fontSize={{ base: 'xs', md: 'sm' }}
                    fontWeight="900"
                    icon={<MenuIcon icon={item.icon} active={item.active} />}
                    iconSpacing={2}
                    _hover={{ bg: 'orange.50' }}
                    _focus={{ bg: 'orange.50' }}
                    onClick={menu.onClose}
                  >
                    {item.label}
                  </MenuItem>
                </Box>
              ))}
              <Divider my={1} borderColor="orange.100" />
              <MenuItem
                bg="transparent"
                color="warm.brown"
                rounded="9px"
                py={1.5}
                px={1.5}
                fontSize={{ base: 'xs', md: 'sm' }}
                fontWeight="900"
                icon={<MenuIcon icon={FaRightFromBracket} />}
                iconSpacing={2}
                _hover={{ bg: 'orange.50' }}
                _focus={{ bg: 'orange.50' }}
                onClick={logout}
              >
                登出
              </MenuItem>
            </VStack>
          ) : (
            <MenuItem
              as={NavLink}
              to="/login"
              display="flex"
              alignItems="center"
              gap={2.5}
              minH={{ base: '48px', md: '54px' }}
              px={{ base: 2.5, md: 3 }}
              py={2}
              rounded="10px"
              bg="linear-gradient(90deg, #fff4df 0%, #fffaf2 100%)"
              color="warm.brown"
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="900"
              boxShadow="inset 0 0 0 1px rgba(255, 184, 111, 0.25)"
              _hover={{ bg: 'linear-gradient(90deg, #ffe9c2 0%, #fff4df 100%)', transform: 'translateY(-2px)' }}
              _focus={{ bg: 'linear-gradient(90deg, #ffe9c2 0%, #fff4df 100%)' }}
              onClick={menu.onClose}
            >
              <Flex
                align="center"
                justify="center"
                boxSize={{ base: '30px', md: '34px' }}
                rounded="full"
                bg="rgba(255,255,255,0.55)"
                color="warm.orange"
                border="2px solid"
                borderColor="orange.100"
                flexShrink={0}
              >
                <Icon as={FaCircleUser} boxSize={{ base: 4, md: 4.5 }} />
              </Flex>
              <Text as="span" letterSpacing="0" whiteSpace="nowrap">
                會員登入 / 註冊
              </Text>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
}

function MenuIcon({ icon, active = false }) {
  return (
    <Flex
      align="center"
      justify="center"
      boxSize={{ base: '22px', md: '26px' }}
      rounded="full"
      bg={active ? 'whiteAlpha.800' : 'orange.50'}
      color={active ? 'warm.orange' : 'warm.brown'}
      border={active ? '2px solid' : '0'}
      borderColor="orange.100"
      flexShrink={0}
    >
      <Icon as={icon} boxSize={{ base: 3, md: 3.5 }} />
    </Flex>
  );
}
