import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Link as ChakraLink,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaRegUser } from 'react-icons/fa6';
import { AuthCard, AuthInput, AuthMascot, AuthPage, DividerText, OrangeButton, PasswordInput, SocialButtons } from './Login.jsx';
import { odooApi } from '../services/odooApi.js';
import { saveUser } from '../utils/storage.js';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
    };

    if (form.get('password') !== form.get('confirmPassword')) {
      toast({ title: '兩次密碼不一致', status: 'error' });
      return;
    }

    try {
      const user = await odooApi.register(payload);
      saveUser(user);
      toast({ title: '註冊成功', status: 'success' });
      navigate('/profile');
    } catch (error) {
      toast({
        title: '註冊失敗',
        description: error.message || '請確認資料後再試一次。',
        status: 'error',
      });
    }
  };

  return (
    <AuthPage>
      <AuthCard maxW="520px">
        <VStack as="form" onSubmit={handleSubmit} align="stretch" spacing={4}>
          <VStack spacing={2} textAlign="center">
            <AuthMascot />
            <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} color="warm.brown" letterSpacing="0">
              會員註冊
            </Heading>
            <Text color="warm.brown" fontSize="sm">
              加入我們，一起給毛孩一個溫暖的家
            </Text>
          </VStack>

          <Field name="name" label="姓名" icon={FaRegUser} placeholder="請輸入姓名" />
          <Field name="email" label="電子郵件" icon={FaEnvelope} type="email" placeholder="請輸入電子郵件" />
          <Field name="password" label="密碼" helper="至少 8 個字元，建議包含英文與數字">
            <PasswordInput name="password" placeholder="請輸入密碼" />
          </Field>
          <Field name="confirmPassword" label="確認密碼">
            <PasswordInput name="confirmPassword" placeholder="請再次輸入密碼" />
          </Field>

          <OrangeButton type="submit" h="50px" fontSize="lg">
            註冊
          </OrangeButton>

          <DividerText>或使用以下方式註冊</DividerText>
          <Box display="flex" justifyContent="center">
            <SocialButtons />
          </Box>

          <Text textAlign="center" color="warm.brown" fontSize="sm" fontWeight="700">
            已經有帳號？
            <ChakraLink as={Link} to="/login" color="warm.orangeDark" ml={1} fontWeight="900">
              前往登入
            </ChakraLink>
          </Text>
        </VStack>
      </AuthCard>
    </AuthPage>
  );
}

function Field({ name, label, icon, type = 'text', helper, children, ...props }) {
  return (
    <FormControl isRequired>
      <FormLabel mb={1.5} fontSize="sm" fontWeight="900" color="warm.brown">
        {label}
      </FormLabel>
      {children || <AuthInput name={name} type={type} icon={icon} {...props} />}
      {helper && (
        <FormHelperText mt={1.5} color="warm.brown" opacity={0.7} fontSize="xs">
          {helper}
        </FormHelperText>
      )}
    </FormControl>
  );
}
