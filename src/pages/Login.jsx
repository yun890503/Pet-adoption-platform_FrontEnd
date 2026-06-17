import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link as ChakraLink,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaFacebookF, FaGoogle, FaLine, FaLock, FaPaw, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import authBg from '../../image/179a3ea4-9650-4a88-899a-e9577b965c72.png';
import { odooApi } from '../services/odooApi.js';
import { clearUser, saveUser } from '../utils/storage.js';

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get('email');
    const password = form.get('password');

    try {
      const user = await odooApi.login({ login: email, email, password });
      saveUser(user);
    } catch (error) {
      clearUser();
      toast({
        title: '登入失敗',
        description: error.message || '請確認 Email 與密碼是否正確',
        status: 'error',
      });
      return;
    }

    toast({ title: '登入成功', status: 'success' });
    navigate('/profile');
  };

  return (
    <AuthPage>
      <AuthCard maxW="480px">
        <VStack as="form" onSubmit={handleSubmit} spacing={3.5} w="100%">
          <AuthMascot />
          <Box textAlign="center">
            <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} color="warm.brown" letterSpacing="0" lineHeight="1.1">
              會員登入
            </Heading>
          </Box>

          <AuthInput name="email" type="email" icon={FaEnvelope} placeholder="Gmail / Email" />
          <PasswordInput name="password" placeholder="請輸入密碼" />

          <HStack w="100%" justify="space-between" fontSize="xs" color="warm.orangeDark">
            <HStack spacing={1.5}>
              <Box as="span" boxSize="12px" rounded="3px" border="1px solid" borderColor="warm.orange" />
              <Text fontWeight="700">記住我</Text>
            </HStack>
            <ChakraLink as={Link} to="/login" fontWeight="700" _hover={{ color: 'warm.brown' }}>
              忘記密碼？
            </ChakraLink>
          </HStack>

          <OrangeButton type="submit">登入</OrangeButton>

          <DividerText>其他帳號以下方登入</DividerText>
          <SocialButtons />

          <Text pt={2} color="warm.brown" fontSize="sm" fontWeight="700">
            還沒有帳號？
            <ChakraLink as={Link} to="/register" color="warm.orangeDark" ml={1} fontWeight="900">
              立即註冊
            </ChakraLink>
          </Text>
        </VStack>
      </AuthCard>
    </AuthPage>
  );
}

export function AuthPage({ children }) {
  return (
    <Box
      minH="calc(100vh - 96px)"
      bgImage={`linear-gradient(rgba(255, 246, 232, 0.08), rgba(255, 246, 232, 0.14)), url(${authBg})`}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      py={{ base: 8, md: 12 }}
    >
      <Container maxW="1180px" minH="calc(100vh - 190px)" display="flex" alignItems="center" justifyContent="center" px={{ base: 4, md: 8 }}>
        {children}
      </Container>
    </Box>
  );
}

export function AuthCard({ children, maxW = '440px' }) {
  return (
    <Box
      w="100%"
      maxW={maxW}
      bg="rgba(255, 255, 255, 0.94)"
      rounded={{ base: '24px', md: '16px' }}
      px={{ base: 6, md: 8 }}
      py={{ base: 7, md: 8 }}
      boxShadow="0 18px 42px rgba(111, 69, 31, 0.18)"
      border="1px solid rgba(255,255,255,0.72)"
      backdropFilter="blur(6px)"
    >
      {children}
    </Box>
  );
}

export function AuthMascot() {
  return (
    <VStack spacing={1}>
      <HStack spacing={-1} justify="center">
        <PawPet color="#ffb24b" label="狗狗" />
        <PawPet color="#f08a42" label="貓咪" />
      </HStack>
      <HStack spacing={2} color="warm.creamDeep" fontSize="xs">
        <Icon as={FaPaw} />
        <Icon as={FaPaw} transform="rotate(18deg)" />
      </HStack>
    </VStack>
  );
}

function PawPet({ color, label }) {
  return (
    <FlexPet color={color}>
      <Text as="span" fontSize="19px" lineHeight="1">
        {label === '狗狗' ? '🐶' : '🐱'}
      </Text>
    </FlexPet>
  );
}

function FlexPet({ color, children }) {
  return (
    <Box display="grid" placeItems="center" boxSize="40px" rounded="full" bg={`${color}22`} border="2px solid white" boxShadow="0 6px 14px rgba(111,69,31,.12)">
      {children}
    </Box>
  );
}

export function AuthInput({ icon, ...props }) {
  return (
    <InputGroup>
      <InputLeftElement h="42px" pointerEvents="none">
        <Icon as={icon} color="warm.orangeDark" boxSize={3.5} />
      </InputLeftElement>
      <Input
        h="42px"
        pl="42px"
        rounded="8px"
        border="1px solid"
        borderColor="orange.100"
        bg="#fffaf4"
        fontSize="sm"
        color="warm.ink"
        _placeholder={{ color: 'gray.400' }}
        _focus={{ borderColor: 'warm.orange', boxShadow: '0 0 0 1px #ff8a3d' }}
        {...props}
      />
    </InputGroup>
  );
}

export function PasswordInput({ name, placeholder }) {
  const [show, setShow] = useState(false);

  return (
    <InputGroup>
      <InputLeftElement h="42px" pointerEvents="none">
        <Icon as={FaLock} color="warm.orangeDark" boxSize={3.5} />
      </InputLeftElement>
      <Input
        name={name}
        type={show ? 'text' : 'password'}
        h="42px"
        pl="42px"
        pr="42px"
        rounded="8px"
        border="1px solid"
        borderColor="orange.100"
        bg="#fffaf4"
        fontSize="sm"
        color="warm.ink"
        placeholder={placeholder}
        _placeholder={{ color: 'gray.400' }}
        _focus={{ borderColor: 'warm.orange', boxShadow: '0 0 0 1px #ff8a3d' }}
      />
      <InputRightElement h="42px">
        <IconButton
          aria-label={show ? '隱藏密碼' : '顯示密碼'}
          icon={show ? <FaRegEyeSlash /> : <FaRegEye />}
          variant="ghost"
          minW="32px"
          h="32px"
          color="warm.brown"
          fontSize="sm"
          onClick={() => setShow((value) => !value)}
          _hover={{ bg: 'orange.50', transform: 'none' }}
        />
      </InputRightElement>
    </InputGroup>
  );
}

export function OrangeButton({ children, ...props }) {
  return (
    <Button
      w="100%"
      h="42px"
      rounded="full"
      bg="linear-gradient(90deg, #ff6f1f 0%, #ff8a3d 100%)"
      color="white"
      fontSize="md"
      boxShadow="0 10px 18px rgba(255, 113, 31, 0.25)"
      _hover={{ transform: 'translateY(-2px) scale(1.02)', boxShadow: '0 14px 22px rgba(255, 113, 31, 0.3)' }}
      {...props}
    >
      {children}
    </Button>
  );
}

export function DividerText({ children }) {
  return (
    <HStack w="100%" color="warm.brown" opacity={0.72} fontSize="xs" pt={1}>
      <Box h="1px" flex="1" bg="orange.100" />
      <Text whiteSpace="nowrap">{children}</Text>
      <Box h="1px" flex="1" bg="orange.100" />
    </HStack>
  );
}

export function SocialButtons() {
  return (
    <HStack spacing={5} pt={0}>
      <IconButton aria-label="Facebook 登入" icon={<FaFacebookF />} boxSize="42px" rounded="full" bg="#2f6fb8" color="white" fontSize="lg" _hover={{ bg: '#245d9d' }} />
      <IconButton aria-label="Line 登入" icon={<FaLine />} boxSize="42px" rounded="full" bg="#35a66c" color="white" fontSize="lg" _hover={{ bg: '#2f925f' }} />
      <IconButton aria-label="Google 登入" icon={<FaGoogle />} boxSize="42px" rounded="full" bg="#ef4444" color="white" fontSize="lg" _hover={{ bg: '#dc2626' }} />
    </HStack>
  );
}
