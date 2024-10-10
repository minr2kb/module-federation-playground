import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote-react',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  cacheDir: './.vite',
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 4001,
  },
});
