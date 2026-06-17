import { Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthShell } from './Login.jsx';
import { saveUser } from '../utils/storage.js';

export default function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    saveUser({ name: form.get('name'), email: form.get('email'), phone: form.get('phone') });
    toast({ title: '註冊成功', status: 'success' });
    navigate('/profile');
  };

  return (
    <AuthShell title="註冊">
      <VStack as="form" onSubmit={handleSubmit} align="stretch" spacing={4}>
        <Field name="name" label="姓名" />
        <Field name="phone" label="電話" />
        <Field name="email" label="Email" type="email" />
        <Field name="password" label="密碼" type="password" />
        <Button type="submit" bg="warm.orange" color="white">
          建立帳號
        </Button>
      </VStack>
    </AuthShell>
  );
}

function Field({ name, label, type = 'text' }) {
  return (
    <FormControl isRequired>
      <FormLabel>{label}</FormLabel>
      <Input name={name} type={type} rounded="full" />
    </FormControl>
  );
}
