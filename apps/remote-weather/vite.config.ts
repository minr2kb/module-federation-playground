import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';
import tsconfigPaths from 'vite-tsconfig-paths';
import exposes from './exposes.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: 'remote-weather',
      filename: 'remoteEntry.js',
      exposes,
      shared: [
        'react',
        'react-dom',
        '@chakra-ui/react',
        '@tanstack/react-query',
        '@emotion/react',
      ],
    }),
  ],
  cacheDir: './.vite',
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
