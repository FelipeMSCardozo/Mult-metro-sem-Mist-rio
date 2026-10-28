import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Multímetro sem Mistério',
        short_name: 'Multímetro',
        description: 'Descubra onde seu circuito parou: guia prático de bancada e diagnóstico guiado com multímetro.',
        theme_color: '#0D1117',
        background_color: '#0D1117',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,woff}'],
      },
    }),
  ],
  server: {
    port: 5173,
  },
});
