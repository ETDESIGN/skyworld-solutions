import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vite.dev/config/
export default defineConfig(async ({ isSsrBuild }) => ({
  // Absolute base: required for the /fr and legal routes to resolve assets.
  base: '/',
  plugins: [
    process.env.NODE_ENV === 'development' && (await import('kimi-plugin-inspect-react')).inspectAttr(),
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              motion: ['framer-motion'],
            },
          },
        },
      },
}));
