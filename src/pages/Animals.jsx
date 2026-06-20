import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { FaCat, FaChevronDown, FaDog, FaMagnifyingGlass, FaPaw, FaSliders } from 'react-icons/fa6';
import AnimalCard from '../components/AnimalCard.jsx';
import { odooApi } from '../services/odooApi.js';

const animalsHeroImage = new URL('../../image/3a4e0cd3-5d24-477d-bca1-783aaf3ba9c9.png', import.meta.url).href;
const animalsHeroDesktop = new URL('../../image/animals-hero-desktop.webp', import.meta.url).href;
const animalsHeroMobile = new URL('../../image/animals-hero-mobile.webp', import.meta.url).href;

const text = {
  all: '\u5168\u90e8',
  dog: '\u72d7\u72d7',
  cat: '\u8c93\u54aa',
  noLimit: '\u4e0d\u9650',
  male: '\u7537\u751f',
  female: '\u5973\u751f',
  small: '\u5c0f\u578b',
  medium: '\u4e2d\u578b',
  large: '\u5927\u578b',
  filterTitle: '\u641c\u5c0b\u689d\u4ef6',
  keywordTitle: '\u95dc\u9375\u5b57\u641c\u5c0b',
  keywordPlaceholder: '\u641c\u5c0b\u6bdb\u5b69',
  search: '\u641c\u5c0b',
  clear: '\u6e05\u9664\u689d\u4ef6',
  type: '\u6bdb\u5b69\u985e\u5225',
  gender: '\u6bdb\u5b69\u6027\u5225',
  age: '\u6bdb\u5b69\u5e74\u9f61',
  size: '\u6bdb\u5b69\u9ad4\u578b',
  title: '\u6240\u6709\u6bdb\u5b69',
  countPrefix: '\u5171',
  countSuffix: '\u4f4d\u6bdb\u5b69',
  newest: '\u6700\u65b0\u52a0\u5165',
  ageSort: '\u5e74\u9f61',
  breedSort: '\u54c1\u7a2e',
  young: '1 \u6b72\u4ee5\u4e0b',
  adult: '1-5 \u6b72',
  senior: '5 \u6b72\u4ee5\u4e0a',
  loading: '\u6b63\u5728\u8f09\u5165\u6bdb\u5b69\u8cc7\u6599...',
  empty: '\u6c92\u6709\u627e\u5230\u60f3\u8981\u7684\u6bdb\u5b69\u55ce\uff1f\u6211\u5011\u9084\u6709\u66f4\u591a\u6bdb\u5b69\u7b49\u8457\u4e00\u500b\u6eab\u6696\u7684\u5bb6\uff01',
  openFilters: '\u5c55\u958b\u641c\u5c0b',
  closeFilters: '\u6536\u5408\u641c\u5c0b',
};

const typeOptions = [
  { value: 'all', label: text.all, icon: FaPaw },
  { value: 'dog', label: text.dog, icon: FaDog },
  { value: 'cat', label: text.cat, icon: FaCat },
];

const genderOptions = [
  { value: 'all', label: text.noLimit },
  { value: 'male', label: text.male },
  { value: 'female', label: text.female },
];

const sizeOptions = [text.noLimit, text.small, text.medium, text.large];

export default function Animals() {
  const filterDisclosure = useDisclosure({ defaultIsOpen: false });
  const [type, setType] = useState('all');
  const [gender, setGender] = useState('all');
  const [age, setAge] = useState('all');
  const [size, setSize] = useState(text.noLimit);
  const [draftKeyword, setDraftKeyword] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('newest');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(true);
      odooApi
        .getAnimals({
          type: type === 'all' ? undefined : type,
          search: keyword,
          sort,
          imageMode: 'cover',
        })
        .then((data) => setList(Array.isArray(data) ? data : []))
        .catch(() => setList([]))
        .finally(() => setLoading(false));
    }, 180);

    return () => window.clearTimeout(timer);
  }, [keyword, sort, type]);

  const filteredList = useMemo(() => {
    return list.filter((animal) => {
      const animalGender = animal.gender || '';
      const genderMatched =
        gender === 'all' ||
        (gender === 'male' && animalGender.includes(text.male.slice(0, 1))) ||
        (gender === 'female' && animalGender.includes(text.female.slice(0, 1)));
      const sizeMatched = size === text.noLimit || (animal.size || animal.bodySize || '').includes(size);
      const ageMatched = age === 'all' || matchAge(animal.age, age);
      return genderMatched && sizeMatched && ageMatched;
    });
  }, [age, gender, list, size]);

  const applyKeyword = () => {
    setKeyword(draftKeyword.trim());
  };

  const resetFilters = () => {
    setType('all');
    setGender('all');
    setAge('all');
    setSize(text.noLimit);
    setDraftKeyword('');
    setKeyword('');
    setSort('newest');
  };

  return (
    <Box bg="linear-gradient(180deg, #fff8ea 0%, #fffaf3 58%, #fff4df 100%)" minH="calc(100vh - 90px)">
      <Box borderBottom="1px solid" borderColor="orange.100" bg="#fff7e8">
        <Box as="picture">
          <source media="(max-width: 767px)" srcSet={animalsHeroMobile} type="image/webp" />
          <source srcSet={animalsHeroDesktop} type="image/webp" />
          <Image
            src={animalsHeroImage}
            alt=""
            w="100%"
            h={{ base: '138px', md: '220px', lg: '300px' }}
            objectFit="cover"
            objectPosition="center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </Box>
      </Box>

      <Container maxW="1480px" px={{ base: 4, md: 6, xl: 8 }} py={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: '1fr', lg: '200px minmax(0, 1fr)' }} gap={{ base: 4, lg: 6 }} alignItems="start">
          <FilterSidebar
            type={type}
            setType={setType}
            gender={gender}
            setGender={setGender}
            age={age}
            setAge={setAge}
            size={size}
            setSize={setSize}
            draftKeyword={draftKeyword}
            setDraftKeyword={setDraftKeyword}
            applyKeyword={applyKeyword}
            resetFilters={resetFilters}
            isOpen={filterDisclosure.isOpen}
            onToggle={filterDisclosure.onToggle}
          />

          <Box alignSelf="start">
            <HStack justify="space-between" align="center" mb={{ base: 4, md: 5 }} gap={3} flexWrap="wrap">
              <HStack spacing={3}>
                <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="900" color="warm.brown">
                  {text.title}
                </Text>
                <Box px={3} py={1} rounded="full" bg="orange.50" border="1px solid" borderColor="orange.100">
                  <Text color="warm.orangeDark" fontSize={{ base: 'xs', md: 'sm' }} fontWeight="900">
                    {text.countPrefix} {filteredList.length} {text.countSuffix}
                  </Text>
                </Box>
              </HStack>

              <Select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                w={{ base: '100%', sm: '150px' }}
                h="40px"
                rounded="12px"
                bg="rgba(255,255,255,0.72)"
                borderColor="orange.100"
                color="warm.brown"
                fontSize={{ base: 'xs', md: 'sm' }}
                fontWeight="800"
              >
                <option value="newest">{text.newest}</option>
                <option value="age">{text.ageSort}</option>
                <option value="breed">{text.breedSort}</option>
              </Select>
            </HStack>

            {loading ? (
              <EmptyState text={text.loading} />
            ) : filteredList.length ? (
              <SimpleGrid columns={{ base: 2, md: 3, xl: 4 }} spacing={{ base: 2.5, md: 3.5, xl: 4 }} alignItems="start">
                {filteredList.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </SimpleGrid>
            ) : (
              <EmptyState text={text.empty} />
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

function FilterSidebar({
  type,
  setType,
  gender,
  setGender,
  age,
  setAge,
  size,
  setSize,
  draftKeyword,
  setDraftKeyword,
  applyKeyword,
  resetFilters,
  isOpen,
  onToggle,
}) {
  return (
    <Box
      position={{ base: 'static', lg: 'sticky' }}
      top={{ lg: '104px' }}
      alignSelf="start"
      bg="rgba(255,255,255,0.66)"
      backdropFilter="blur(16px)"
      border="1px solid"
      borderColor="orange.100"
      rounded="18px"
      p={{ base: 3, lg: 3 }}
      boxShadow="0 14px 34px rgba(111, 69, 31, 0.09)"
    >
      <Button
        display={{ base: 'flex', lg: 'none' }}
        w="100%"
        h="38px"
        justifyContent="space-between"
        leftIcon={<Icon as={FaSliders} />}
        rightIcon={<Icon as={FaChevronDown} transform={isOpen ? 'rotate(180deg)' : 'none'} transition="0.2s ease" />}
        bg="orange.50"
        color="warm.brown"
        fontSize="sm"
        onClick={onToggle}
        mb={isOpen ? 3 : 0}
      >
        {isOpen ? text.closeFilters : text.openFilters}
      </Button>

      <Box display={{ base: isOpen ? 'block' : 'none', lg: 'block' }}>
      <HStack spacing={2} mb={3}>
        <Icon as={FaPaw} color="warm.brown" boxSize={4} />
        <Text fontSize={{ base: 'md', lg: 'lg' }} fontWeight="900" color="warm.brown">
          {text.filterTitle}
        </Text>
      </HStack>

      <VStack align="stretch" spacing={3}>
        <FilterGroup title={text.keywordTitle}>
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none">
              <FaMagnifyingGlass color="#9aa7b7" />
            </InputLeftElement>
            <Input
              value={draftKeyword}
              onChange={(event) => setDraftKeyword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applyKeyword();
              }}
              placeholder={text.keywordPlaceholder}
              bg="rgba(255,255,255,0.48)"
              borderColor="orange.100"
              rounded="9px"
              fontSize="xs"
            />
          </InputGroup>
        </FilterGroup>

        <Button h="34px" bg="warm.orange" color="white" fontSize="xs" onClick={applyKeyword}>
          {text.search}
        </Button>
        <Button h="34px" variant="outline" borderColor="warm.orange" color="warm.orangeDark" fontSize="xs" onClick={resetFilters}>
          {text.clear}
        </Button>

        <FilterGroup title={text.type}>
          <VStack align="stretch" spacing={0}>
            {typeOptions.map((option) => (
              <Button
                key={option.value}
                justifyContent="flex-start"
                leftIcon={<Icon as={option.icon} boxSize={3.5} />}
                h="34px"
                rounded="0"
                bg={type === option.value ? 'orange.50' : 'transparent'}
                color={type === option.value ? 'warm.orangeDark' : 'warm.brown'}
                border="1px solid"
                borderColor="orange.100"
                borderTopWidth={option.value === 'all' ? '1px' : '0'}
                fontSize="xs"
                _first={{ roundedTop: '9px' }}
                _last={{ roundedBottom: '9px' }}
                _hover={{ bg: 'orange.50', transform: 'none' }}
                onClick={() => setType(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </VStack>
        </FilterGroup>

        <FilterGroup title={text.gender}>
          <VStack align="stretch" spacing={1.5}>
            {genderOptions.map((option) => (
              <CheckButton key={option.value} active={gender === option.value} onClick={() => setGender(option.value)}>
                {option.label}
              </CheckButton>
            ))}
          </VStack>
        </FilterGroup>

        <FilterGroup title={text.age}>
          <Select value={age} onChange={(event) => setAge(event.target.value)} h="34px" bg="rgba(255,255,255,0.55)" rounded="9px" fontSize="xs">
            <option value="all">{text.noLimit}</option>
            <option value="young">{text.young}</option>
            <option value="adult">{text.adult}</option>
            <option value="senior">{text.senior}</option>
          </Select>
        </FilterGroup>

        <FilterGroup title={text.size}>
          <VStack align="stretch" spacing={1.5}>
            {sizeOptions.map((option) => (
              <CheckButton key={option} active={size === option} onClick={() => setSize(option)}>
                {option}
              </CheckButton>
            ))}
          </VStack>
        </FilterGroup>
      </VStack>
      </Box>
    </Box>
  );
}

function FilterGroup({ title, children }) {
  return (
    <Box borderBottom="1px solid" borderColor="orange.100" pb={3} _last={{ borderBottom: 0, pb: 0 }}>
      <Text mb={2} color="warm.brown" fontSize={{ base: 'xs', lg: 'sm' }} fontWeight="900">
        {title}
      </Text>
      {children}
    </Box>
  );
}

function CheckButton({ active, onClick, children }) {
  return (
    <Button
      justifyContent="flex-start"
      h="24px"
      px={0}
      minW="0"
      bg="transparent"
      color="warm.brown"
      fontSize="xs"
      fontWeight="700"
      leftIcon={
        <Box
          boxSize="14px"
          rounded="4px"
          bg={active ? 'warm.orange' : 'white'}
          border="1px solid"
          borderColor={active ? 'warm.orange' : 'orange.200'}
          color="white"
          fontSize="9px"
          display="grid"
          placeItems="center"
        >
          {active ? '\u2713' : ''}
        </Box>
      }
      _hover={{ bg: 'transparent', color: 'warm.orangeDark', transform: 'none' }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function EmptyState({ text }) {
  return (
    <Box bg="rgba(255,255,255,0.74)" rounded="18px" p={{ base: 6, md: 8 }} textAlign="center" border="1px solid" borderColor="orange.100">
      <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="900" color="warm.brown">
        {text}
      </Text>
    </Box>
  );
}

export function PageHeader({ title, subtitle }) {
  return (
    <Box bg="linear-gradient(120deg, #fff8ea 0%, #ffe7bd 55%, #e1f5ff 100%)" py={{ base: 10, md: 14, lg: 16 }}>
      <Container maxW="1280px" px={{ base: 4, md: 8 }}>
        <Text fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} fontWeight="900" color="warm.brown" lineHeight="1.2">
          {title}
        </Text>
        <Text mt={3} fontSize={{ base: 'md', md: 'xl' }} fontWeight="800" color="warm.ink">
          {subtitle}
        </Text>
      </Container>
    </Box>
  );
}

function matchAge(ageText = '', bucket) {
  const number = Number.parseFloat(String(ageText).replace(/[^\d.]/g, ''));
  const years = String(ageText).includes('\u500b\u6708') ? number / 12 : number;
  if (!Number.isFinite(years)) return true;
  if (bucket === 'young') return years < 1;
  if (bucket === 'adult') return years >= 1 && years <= 5;
  if (bucket === 'senior') return years > 5;
  return true;
}
