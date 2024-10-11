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
        './Button': './src/components/Button.tsx',
      },
      shared: {
        react: {
          requiredVersion: '^18.0.0',
          version: '18.0.0',
        },
        'react-dom': {
          requiredVersion: '^18.0.0',
          version: '18.0.0',
        },
      },
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
