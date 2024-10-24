import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';
// import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // tsconfigPaths(),
    federation({
      name: 'host',
      remotes: {
        'remote-weather': 'http://localhost:3001/assets/remoteEntry.js',
      },
      shared: [
        'react',
        'react-dom',
        '@tanstack/react-query',
        '@chakra-ui/react',
        '@emotion/react',
        '@emotion/styled',
      ],
    }),
  ],
  cacheDir: './.vite',
  resolve: {
    alias: [{ find: '@', replacement: __dirname + '/src' }],
  },
  build: {
    target: 'esnext',
  },
});
