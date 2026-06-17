import { Button, HStack, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaCat, FaDog, FaMagnifyingGlass, FaPaw } from 'react-icons/fa6';

const filters = [
  { value: 'all', label: '全部', icon: FaPaw },
  { value: 'dog', label: '狗', icon: FaDog },
  { value: 'cat', label: '貓', icon: FaCat },
];

export default function FilterBar({ activeType, onTypeChange, search, onSearchChange }) {
  return (
    <HStack
      spacing={3}
      bg="rgba(255, 255, 255, 0.92)"
      p={{ base: 3, md: 6 }}
      rounded="20px"
      boxShadow="0 12px 30px rgba(111, 69, 31, 0.14)"
      border="1px solid"
      borderColor="orange.100"
      flexWrap="wrap"
      justify="center"
    >
      {filters.map((filter) => {
        const isActive = activeType === filter.value;
        return (
          <Button
            key={filter.value}
            leftIcon={<Icon as={filter.icon} />}
            size="lg"
            minW={{ base: '92px', md: '120px' }}
            bg={isActive ? 'warm.orange' : 'white'}
            color={isActive ? 'white' : 'warm.brown'}
            border="1px solid"
            borderColor={isActive ? 'warm.orange' : 'orange.100'}
            boxShadow={isActive ? '0 8px 18px rgba(255, 138, 61, 0.34)' : 'sm'}
            onClick={() => onTypeChange(filter.value)}
            _hover={{
              bg: isActive ? 'warm.orangeDark' : 'warm.creamDeep',
              transform: 'translateY(-2px) scale(1.05)',
            }}
          >
            {filter.label}
          </Button>
        );
      })}

      <InputGroup maxW={{ base: '100%', md: '540px' }} flex="1 1 300px" size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaMagnifyingGlass} color="warm.brown" />
        </InputLeftElement>
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="搜尋名稱或品種..."
          bg="white"
          rounded="full"
          borderColor="orange.200"
          fontWeight="700"
          _focus={{ borderColor: 'warm.orange', boxShadow: '0 0 0 3px rgba(255, 138, 61, 0.22)' }}
        />
      </InputGroup>
    </HStack>
  );
}
