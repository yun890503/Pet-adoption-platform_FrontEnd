import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaClipboardCheck,
  FaGear,
  FaHeart,
  FaHouse,
  FaRegBell,
  FaRightFromBracket,
  FaUser,
} from 'react-icons/fa6';

const navItems = [
  { label: '個人資料', to: '/profile', icon: FaUser },
  { label: '我的認養申請', to: '/profile/applications', icon: FaClipboardCheck },
  { label: '認養紀錄', to: '/profile/records', icon: FaCalendarCheck },
  { label: '收藏毛孩', to: '/favorites', icon: FaHeart },
  { label: '預約訪視毛孩', to: '/profile/appointments', icon: FaCalendarCheck },
];

export default function MemberLayout({ title, subtitle, active = 'home', children, actions }) {
  const location = useLocation();

  return (
    <Box
      bg="linear-gradient(180deg, #fff8ea 0%, #fffdf8 48%, #fff8ea 100%)"
      minH="calc(100vh - 96px)"
      h={{ lg: 'calc(100vh - 96px)' }}
      overflow={{ lg: 'hidden' }}
    >
      <Container maxW="1500px" h={{ lg: '100%' }} px={{ base: 4, md: 8  }} py={{ base: 6, md: 8 }}>
        <Flex align="start" h={{ lg: '100%' }} gap={{ base: 5, xl: 7 }} direction={{ base: 'column', lg: 'row' }}>
          <MemberSidebar active={active} pathname={location.pathname} />

          <Box
            flex="1"
            w="100%"
            minW={0}
            mt={{ lg: '-56px' }}
            maxH={{ lg: 'calc(100vh - 160px)' }}
            overflowY={{ lg: 'auto' }}
            overflowX="hidden"
            pr={{ lg: 2 }}
            overscrollBehavior={{ lg: 'contain' }}
          >
            {(title || subtitle || actions) && (
              <Flex justify="space-between" align={{ base: 'start', md: 'center' }} mb={6} gap={4} flexWrap="wrap">
                <Box>
                  {title && (
                    <Text fontSize={{ base: '3xl', md: '4xl' }} fontWeight="900" color="warm.brown">
                      {title}
                    </Text>
                  )}
                  {subtitle && (
                    <Text mt={2} color="warm.ink" fontSize={{ base: 'md', md: 'lg' }}>
                      {subtitle}
                    </Text>
                  )}
                </Box>
                {actions}
              </Flex>
            )}
            {children}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

function MemberSidebar({ active, pathname }) {
  return (
    <Box display={{ base: 'none', lg: 'block' }} w="260px" flexShrink={0}>
      <Box
        w="260px"
        flexShrink={0}
        bg="rgba(255,255,255,0.9)"
        border="1px solid"
        borderColor="orange.100"
        rounded="2xl"
        p={{ base: 3, lg: 4 }}
        boxShadow="0 16px 38px rgba(111,69,31,0.09)"
        position="fixed"
        top="140px"
        maxH="calc(100vh - 160px)"
        overflow="hidden"
      >
      <SimpleGrid columns={1} spacing={2}>
        {navItems.map((item) => {
          const isActive =
            active === item.to ||
            pathname === item.to ||
            (item.to === '/profile' && pathname === '/profile' && active === 'home');
          return (
            <Button
              key={item.label}
              as={NavLink}
              to={item.to}
              justifyContent="flex-start"
              h="56px"
              px={4}
              bg={isActive ? 'orange.50' : 'transparent'}
              color={isActive ? 'warm.orangeDark' : 'warm.ink'}
              borderRadius="14px"
              leftIcon={<Icon as={item.icon} />}
              _hover={{ bg: 'orange.50', color: 'warm.orangeDark', transform: 'translateY(-2px)' }}
            >
              <Text noOfLines={1}>{item.label}</Text>
            </Button>
          );
        })}
      </SimpleGrid>

      <Box display={{ base: 'none', lg: 'block' }} borderTop="1px solid" borderColor="orange.100" my={4} />

      <VStack display={{ base: 'none', lg: 'flex' }} align="stretch" spacing={2}>
        <Button justifyContent="flex-start" variant="ghost" leftIcon={<FaRightFromBracket />}>
          登出
        </Button>
      </VStack>
      </Box>
    </Box>
  );
}
