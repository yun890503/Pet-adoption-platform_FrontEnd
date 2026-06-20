import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';
import { FaMagnifyingGlass, FaSliders, FaGrip, FaList } from 'react-icons/fa6';

export default function MemberSearchToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = '搜尋毛孩名稱',
  selects = [],
  showViewButtons = false,
  mb = { base: 3, md: 4 },
}) {
  return (
    <Flex
      bg="rgba(255,255,255,0.96)"
      rounded={{ base: '2xl', md: '2xl' }}
      p={{ base: 2, md: 3 }}
      border="1px solid"
      borderColor="orange.100"
      boxShadow="0 10px 26px rgba(111,69,31,0.08)"
      gap={{ base: 2, md: 3 }}
      align="center"
      mb={mb}
      minW={0}
    >
      <InputGroup size={{ base: 'sm', md: 'md' }} flex="1" minW={0}>
        <InputLeftElement pointerEvents="none" h={{ base: 9, md: 10 }}>
          <Icon as={FaMagnifyingGlass} color="gray.400" boxSize={{ base: 3.5, md: 4 }} />
        </InputLeftElement>
        <Input
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder={searchPlaceholder}
          rounded="xl"
          bg="white"
          borderColor="gray.200"
          fontSize={{ base: 'xs', md: 'sm' }}
          h={{ base: 9, md: 10 }}
          _focusVisible={{ borderColor: 'warm.orange', boxShadow: '0 0 0 1px var(--chakra-colors-warm-orange)' }}
        />
      </InputGroup>

      {selects.map((select) => (
        <Select
          key={select.key || select.placeholder}
          value={select.value}
          onChange={(event) => select.onChange?.(event.target.value)}
          placeholder={select.placeholder}
          maxW={{ base: select.mobileMaxW || '128px', md: select.maxW || '180px' }}
          minW={{ base: 0, md: select.minW || '150px' }}
          rounded="xl"
          bg="white"
          borderColor="gray.200"
          size={{ base: 'sm', md: 'md' }}
          fontSize={{ base: 'xs', md: 'sm' }}
          h={{ base: 9, md: 10 }}
        >
          {select.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ))}

      <IconButton
        aria-label="篩選"
        icon={<FaSliders />}
        display={{ base: 'inline-flex', md: showViewButtons ? 'none' : 'inline-flex' }}
        flexShrink={0}
        rounded="xl"
        bg="orange.50"
        color="warm.brown"
        size={{ base: 'sm', md: 'md' }}
      />

      {showViewButtons && (
        <HStack display={{ base: 'none', md: 'flex' }} ml="auto" spacing={2}>
          <IconButton aria-label="卡片檢視" icon={<FaGrip />} bg="orange.50" color="warm.brown" size="md" />
          <IconButton aria-label="清單檢視" icon={<FaList />} variant="outline" size="md" />
        </HStack>
      )}
    </Flex>
  );
}
