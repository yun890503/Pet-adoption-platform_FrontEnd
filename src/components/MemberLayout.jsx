import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaClipboardCheck,
  FaHeart,
  FaRightFromBracket,
  FaUser,
} from 'react-icons/fa6';
import { clearUser } from '../utils/storage.js';

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
    >
      <Container maxW="1500px" px={{ base: 3, md: 6, xl: 8 }} py={{ base: 4, md: 7 }}>
        <Flex align="start" gap={{ base: 0, md: 5, xl: 7 }}>
          <MemberSidebar active={active} pathname={location.pathname} />

          <Box
            flex="1"
            w="100%"
            minW={0}
            overflowX="hidden"
          >
            {(title || subtitle || actions) && (
              <Flex justify="space-between" align={{ base: 'start', md: 'center' }} mb={{ base: 3, md: 5 }} gap={4} flexWrap="wrap">
                <Box>
                  {title && (
                    <Text fontSize={{ base: 'xl', md: '3xl' }} fontWeight="900" color="warm.brown">
                      {title}
                    </Text>
                  )}
                  {subtitle && (
                    <Text mt={1} color="warm.ink" fontSize={{ base: 'xs', md: 'md' }}>
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
  const navigate = useNavigate();
  const logout = () => {
    clearUser();
    navigate('/');
  };

  return (
    <Box display={{ base: 'none', md: 'block' }} w={{ md: '160px', lg: '230px' }} flexShrink={0}>
      <Box
        w="100%"
        flexShrink={0}
        bg="rgba(255,255,255,0.9)"
        border="1px solid"
        borderColor="orange.100"
        rounded={{ base: 'xl', lg: '2xl' }}
        p={{ base: 1.5, md: 2.5, lg: 4 }}
        boxShadow="0 16px 38px rgba(111,69,31,0.09)"
        position="sticky"
        top={{ base: '82px', md: '112px', lg: '128px' }}
        maxH={{ base: 'calc(100vh - 98px)', md: 'calc(100vh - 130px)', lg: 'calc(100vh - 148px)' }}
        overflowY="auto"
        sx={{
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-thumb': { background: '#f6ad55', borderRadius: '999px' },
        }}
      >
        <SimpleGrid columns={1} spacing={{ base: 1, lg: 2 }}>
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
                h={{ base: '30px', md: '40px', lg: '50px' }}
                px={{ base: 1.5, md: 2.5, lg: 4 }}
                bg={isActive ? 'orange.50' : 'transparent'}
                color={isActive ? 'warm.orangeDark' : 'warm.ink'}
                borderRadius={{ base: '9px', lg: '14px' }}
                leftIcon={<Icon as={item.icon} boxSize={{ base: 2.5, md: 3.5, lg: 4 }} />}
                iconSpacing={{ base: 1, md: 2 }}
                fontSize={{ base: '8.5px', sm: '9.5px', md: 'xs', lg: 'md' }}
                _hover={{ bg: 'orange.50', color: 'warm.orangeDark', transform: 'translateY(-2px)' }}
              >
                <Text noOfLines={1}>{item.label}</Text>
              </Button>
            );
          })}
        </SimpleGrid>

        <Box borderTop="1px solid" borderColor="orange.100" my={{ base: 2, lg: 4 }} />

        <VStack align="stretch" spacing={2}>
          <Button
            justifyContent="flex-start"
            variant="ghost"
            leftIcon={<Icon as={FaRightFromBracket} boxSize={{ base: 2.5, md: 3.5, lg: 4 }} />}
            h={{ base: '30px', md: '40px', lg: '50px' }}
            px={{ base: 1.5, md: 2.5, lg: 4 }}
            iconSpacing={{ base: 1, md: 2 }}
            fontSize={{ base: '8.5px', sm: '9.5px', md: 'xs', lg: 'md' }}
            onClick={logout}
          >
            登出
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
