import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Select, SimpleGrid, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { odooApi } from '../services/odooApi.js';
import { getUser } from '../utils/storage.js';

export default function AdoptionApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    odooApi.getAnimal(id).then(setAnimal).catch(() => setAnimal(null));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!getUser()?.token) {
      toast({ title: '請先登入會員', description: '登入後才能送出認養申請。', status: 'warning' });
      navigate('/login');
      return;
    }

    const form = new FormData(event.currentTarget);
    const payload = {
      animalId: Number(id),
      animalName: animal?.name,
      name: form.get('name'),
      phone: form.get('phone'),
      email: form.get('email'),
      city: form.get('city'),
      experience: form.get('experience'),
      family: form.get('family'),
      otherPets: form.get('otherPets'),
    };

    await odooApi.createAdoptionApplication(payload);
    toast({ title: '申請已送出', description: '已建立 Odoo 銷售報價單，狀態為審核中。', status: 'success' });
    navigate('/profile/applications');
  };

  return (
    <Box>
      <Container maxW="900px" py={12} px={{ base: 4, md: 8 }}>
        <VStack as="form" onSubmit={handleSubmit} align="stretch" bg="white" rounded="28px" p={{ base: 6, md: 8 }} boxShadow="lg" spacing={5}>
          <Heading color="warm.brown">認養申請：{animal?.name || 'Odoo 毛孩產品'}</Heading>
          {!animal && <Text color="gray.600">正在從 Odoo 讀取毛孩資料，若仍未顯示請確認產品已上架。</Text>}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Field name="name" label="姓名" />
            <Field name="phone" label="電話" />
            <Field name="email" label="Email" type="email" />
            <Field name="city" label="居住縣市" />
          </SimpleGrid>
          <FormControl isRequired>
            <FormLabel>飼養經驗</FormLabel>
            <Textarea name="experience" rounded="20px" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>家庭成員</FormLabel>
            <Textarea name="family" rounded="20px" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>是否有其他寵物</FormLabel>
            <Select name="otherPets" rounded="full">
              <option>沒有</option>
              <option>有狗狗</option>
              <option>有貓咪</option>
              <option>有其他寵物</option>
            </Select>
          </FormControl>
          <Button type="submit" bg="warm.orange" color="white" size="lg" alignSelf="start">
            送出申請
          </Button>
        </VStack>
      </Container>
    </Box>
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
