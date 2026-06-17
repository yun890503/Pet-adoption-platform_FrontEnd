import { Box, Button, Container, FormControl, FormLabel, Grid, Heading, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import { PageHeader } from './Animals.jsx';

export default function Contact() {
  return (
    <Box>
      {/* <PageHeader title="聯絡我們" subtitle="有任何認養、志工或照護問題，都歡迎和我們聊聊。" /> */}
      <Container maxW="1280px" py={{ base: 8, md: 12 }} px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: '1fr', lg: '0.9fr 1.1fr' }} gap={8}>
          <VStack align="stretch" bg="white" rounded="28px" p={8} boxShadow="lg" spacing={4}>
            <Heading fontSize="2xl" color="warm.brown">
              暖心毛孩認養中心
            </Heading>
            <Info label="地址" value="台中市毛孩路 88 號" />
            <Info label="電話" value="04-1234-5678" />
            <Info label="Email" value="mark950507@gmail.com" />
            <Box rounded="24px" overflow="hidden" border="1px solid" borderColor="orange.100" h="260px">
              <iframe
                title="map"
                src="https://www.google.com/maps?q=Taichung%20City&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Box>
          </VStack>

          <VStack as="form" align="stretch" bg="white" rounded="28px" p={8} boxShadow="lg" spacing={4}>
            <Heading fontSize="2xl" color="warm.brown">
              聯絡表單
            </Heading>
            <FormControl>
              <FormLabel>姓名</FormLabel>
              <Input rounded="full" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" rounded="full" />
            </FormControl>
            <FormControl>
              <FormLabel>訊息</FormLabel>
              <Textarea rounded="20px" minH="150px" />
            </FormControl>
            <Button bg="warm.orange" color="white" alignSelf="start">
              送出訊息
            </Button>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <HStack bg="warm.cream" rounded="18px" p={4} justify="space-between">
      <Text fontWeight="900" color="warm.brown">
        {label}
      </Text>
      <Text color="gray.700">{value}</Text>
    </HStack>
  );
}
