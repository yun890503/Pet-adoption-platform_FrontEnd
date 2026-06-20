import { Center, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { odooApi } from '../services/odooApi.js';
import { clearPendingLineLogin, getLineLoginPayload, getLineLoginReturnTo } from '../services/lineAuth.js';
import { clearUser, saveUser } from '../utils/storage.js';

export default function LineCallback() {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    async function finishLogin() {
      try {
        const payload = await getLineLoginPayload();
        if (!payload) return;
        const user = await odooApi.lineLogin(payload);
        saveUser(user);
        const returnTo = getLineLoginReturnTo();
        if (mounted) {
          toast({ title: 'LINE 登入成功', status: 'success', duration: 1600 });
          navigate(returnTo || '/', { replace: true });
        }
      } catch (error) {
        clearUser();
        clearPendingLineLogin();
        if (mounted) {
          toast({
            title: 'LINE 登入失敗',
            description: error.message || '請重新登入一次。',
            status: 'error',
          });
          navigate('/login', { replace: true });
        }
      }
    }

    finishLogin();
    return () => {
      mounted = false;
    };
  }, [navigate, toast]);

  return (
    <Center minH="calc(100vh - 180px)" bg="warm.cream">
      <VStack spacing={4}>
        <Spinner color="warm.orange" size="xl" thickness="4px" />
        <Text color="warm.brown" fontWeight="900">
          正在完成 LINE 登入...
        </Text>
      </VStack>
    </Center>
  );
}
