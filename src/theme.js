import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
    body: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
  },
  colors: {
    warm: {
      orange: '#ff8a3d',
      orangeDark: '#e86f1f',
      cream: '#fff8ea',
      creamDeep: '#ffe7bd',
      green: '#93b766',
      greenDark: '#6f9447',
      sky: '#83ccef',
      brown: '#6f451f',
      ink: '#3f2b1b',
      rose: '#ff7b6e',
    },
  },
  styles: {
    global: {
      'html, body, #root': {
        minHeight: '100%',
      },
      body: {
        bg: 'warm.cream',
        color: 'warm.ink',
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '999px',
        fontWeight: '800',
        transition: 'all 0.2s ease',
        _hover: {
          transform: 'translateY(-2px) scale(1.05)',
        },
        _active: {
          transform: 'translateY(0) scale(0.98)',
        },
      },
    },
  },
});

export default theme;
