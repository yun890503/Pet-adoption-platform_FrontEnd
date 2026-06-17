import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { saveUser } from '../utils/storage.js';

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    saveUser({ name: form.get('email')?.split('@')[0] || '暖心會員', email: form.get('email') });
    toast({ title: '登入成功', status: 'success' });
    navigate('/profile');
  };

  return (
    <AuthShell title="登入">
      <VStack as="form" onSubmit={handleSubmit} align="stretch" spacing={4}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" rounded="full" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>密碼</FormLabel>
          <Input name="password" type="password" rounded="full" />
        </FormControl>
        <Button type="submit" bg="warm.orange" color="white">
          登入
        </Button>
        <Text>
          還沒有帳號？ <Link to="/register">前往註冊</Link>
        </Text>
      </VStack>
    </AuthShell>
  );
}

export function AuthShell({ title, children }) {
  return (
    <Box>
      <Container maxW="520px" py={16}>
        <VStack align="stretch" bg="white" rounded="28px" p={8} boxShadow="lg">
          <Heading color="warm.brown">{title}</Heading>
          {children}
        </VStack>
      </Container>
    </Box>
  );
}
