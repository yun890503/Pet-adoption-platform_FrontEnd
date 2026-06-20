import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGrip, FaList, FaMagnifyingGlass } from 'react-icons/fa6';
import AnimalCard from '../components/AnimalCard.jsx';
import MemberLayout from '../components/MemberLayout.jsx';
import MemberSearchToolbar from '../components/MemberSearchToolbar.jsx';
import { odooApi } from '../services/odooApi.js';
import { getUser, saveUser } from '../utils/storage.js';

const text = {
  searchPlaceholder: '\u641c\u5c0b\u6bdb\u5b69\u540d\u7a31\u6216\u54c1\u7a2e',
  allTypes: '\u5168\u90e8\u7a2e\u985e',
  dog: '\u72d7\u72d7',
  cat: '\u8c93\u54aa',
  newest: '\u6700\u65b0\u52a0\u5165',
  age: '\u5e74\u9f61\u6392\u5e8f',
  breed: '\u54c1\u7a2e\u6392\u5e8f',
  gridView: '\u5361\u7247\u6aa2\u8996',
  listView: '\u6e05\u55ae\u6aa2\u8996',
  loginFirst: '\u8acb\u5148\u767b\u5165\u6703\u54e1\uff0c\u6536\u85cf\u8cc7\u6599\u6703\u5132\u5b58\u5728 Odoo \u5f8c\u7aef\u3002',
  loginAction: '\u524d\u5f80\u767b\u5165',
  loading: '\u6b63\u5728\u5f9e Odoo \u8b80\u53d6\u6536\u85cf\u8cc7\u6599...',
  empty: '\u76ee\u524d\u9084\u6c92\u6709\u6536\u85cf\u6bdb\u5b69\u3002',
  browse: '\u53bb\u770b\u770b\u6bdb\u5b69',
  failed: '\u8b80\u53d6\u6536\u85cf\u5931\u6557',
};

function getLoggedInUser() {
  const user = getUser();
  return user?.token ? user : null;
}

function toFavoriteList(value) {
  return Array.isArray(value) ? value : [];
}

export default function Favorites() {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState(() => getLoggedInUser());
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUser = (event) => {
      const nextUser = getLoggedInUser();
      setUser(nextUser);
      const favoriteIds = event.detail?.favorites;
      if (Array.isArray(favoriteIds)) {
        setFavorites((items) => items.filter((animal) => favoriteIds.includes(animal.id)));
      }
    };
    window.addEventListener('warm-paws:user-changed', syncUser);
    window.addEventListener('storage', syncUser);
    return () => {
      window.removeEventListener('warm-paws:user-changed', syncUser);
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  useEffect(() => {
    if (!user?.token) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    odooApi
      .getMyFavorites()
      .then((items) => {
        const nextItems = toFavoriteList(items);
        setFavorites(nextItems);
        saveUser({ ...user, favorites: nextItems.map((item) => item.id) });
      })
      .catch((error) => {
        toast({
          title: text.failed,
          description: error.message,
          status: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [toast, user?.token]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const nextItems = toFavoriteList(favorites).filter((animal) => {
      const matchesType = type === 'all' || animal.type === type;
      const haystack = `${animal.name || ''} ${animal.breed || ''}`.toLowerCase();
      return matchesType && haystack.includes(normalizedQuery);
    });

    return [...nextItems].sort((a, b) => {
      if (sort === 'age') return (a.ageValue || 999) - (b.ageValue || 999);
      if (sort === 'breed') return `${a.breed || ''}`.localeCompare(`${b.breed || ''}`, 'zh-Hant');
      return (b.id || 0) - (a.id || 0);
    });
  }, [favorites, query, sort, type]);

  return (
    <MemberLayout active="/favorites">
      <MemberSearchToolbar
        searchValue={query}
        onSearchChange={setQuery}
        searchPlaceholder={text.searchPlaceholder}
        showViewButtons
        selects={[
          {
            key: 'type',
            value: type,
            onChange: setType,
            mobileMaxW: '104px',
            options: [
              { value: 'all', label: text.allTypes },
              { value: 'dog', label: text.dog },
              { value: 'cat', label: text.cat },
            ],
          },
          {
            key: 'sort',
            value: sort,
            onChange: setSort,
            mobileMaxW: '112px',
            options: [
              { value: 'newest', label: text.newest },
              { value: 'age', label: text.age },
              { value: 'breed', label: text.breed },
            ],
          },
        ]}
      />

      {!user?.token ? (
        <EmptyState text={text.loginFirst} action={text.loginAction} onClick={() => navigate('/login')} />
      ) : loading ? (
        <EmptyState text={text.loading} />
      ) : filtered.length ? (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 2.5, md: 3.5, xl: 4 }} alignItems="start">
          {filtered.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState text={text.empty} action={text.browse} onClick={() => navigate('/animals')} />
      )}
    </MemberLayout>
  );
}

function EmptyState({ text: message, action, onClick }) {
  return (
    <Box bg="white" rounded="2xl" p={8} textAlign="center" border="1px solid" borderColor="orange.100" boxShadow="md">
      <Text fontWeight="900" color="warm.brown" fontSize="lg">
        {message}
      </Text>
      {action && (
        <Button mt={4} bg="warm.orange" color="white" onClick={onClick}>
          {action}
        </Button>
      )}
    </Box>
  );
}
