import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import TopNav from '@/components/TopNav';

import { Box } from '@chakra-ui/react';
import { Provider as ThemeProvider } from '@/components/ui/provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Box position="relative" height="100vh" overflow="auto">
        <TopNav />
        <Component {...pageProps} />
      </Box>
    </ThemeProvider>
  );
}
