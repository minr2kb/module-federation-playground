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
    target: 'esnext',
  },
});
