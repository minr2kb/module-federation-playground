import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';
import tsconfigPaths from 'vite-tsconfig-paths';
import mfConfigs from './mf.config.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), federation(mfConfigs)],
  cacheDir: './.vite',
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
