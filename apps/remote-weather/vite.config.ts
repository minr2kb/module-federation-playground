import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote-weather',
      filename: 'remoteEntry.js',
      exposes: {
        './WeatherWidget': './src/components/WeatherWidget.tsx',
      },
      shared: ['react', 'react-dom', '@chakra-ui/react'],
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
