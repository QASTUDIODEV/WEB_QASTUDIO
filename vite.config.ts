import fs from 'fs';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({ include: '**/*.svg?react' })],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    https:
      process.env.NODE_ENV === 'development'
        ? {
            key: fs.readFileSync('.cert/localhost-key.pem'),
            cert: fs.readFileSync('.cert/localhost.pem'),
          }
        : undefined,
  },
});
