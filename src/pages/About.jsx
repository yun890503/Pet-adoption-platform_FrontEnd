import { Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { PageHeader } from './Animals.jsx';

const cards = [
  ['中途之家故事', '暖心毛孩從幾位志工的臨時安置開始，慢慢成為協助流浪毛孩重新回家的中途之家。'],
  ['成立理念', '我們相信認養不是施捨，而是一次彼此陪伴、彼此成全的長期承諾。'],
  ['團隊介紹', '團隊包含照護志工、獸醫合作夥伴、行為陪伴志工與認養訪談夥伴。'],
  ['認養成果', '目前已協助超過 320 隻毛孩找到家，也持續追蹤牠們的生活適應。'],
];

export default function About() {
  return (
    <Box>
      <PageHeader title="關於我們" subtitle="用穩定照護和細心媒合，讓每一次認養更安心。" />
      <Container maxW="1180px" py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {cards.map(([title, content]) => (
            <VStack
              key={title}
              align="start"
              bg="white"
              rounded="28px"
              p={8}
              boxShadow="0 14px 34px rgba(111, 69, 31, 0.12)"
              border="1px solid"
              borderColor="orange.100"
              minH="210px"
            >
              <Heading fontSize="2xl" color="warm.brown">
                {title}
              </Heading>
              <Text color="gray.700" fontSize="lg" lineHeight="1.9">
                {content}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
