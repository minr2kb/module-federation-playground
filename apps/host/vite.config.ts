import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        'remote-weather': 'http://localhost:4001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', '@chakra-ui/react'],
    }),
  ],
  cacheDir: './.vite',
  build: {
    target: 'esnext',
  },
});
