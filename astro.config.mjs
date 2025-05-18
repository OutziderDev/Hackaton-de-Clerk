// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss  from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import node from '@astrojs/node'
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk(), react()],
  adapter: node({mode: "standalone"}),
  vite: {
    plugins: [tailwindcss ()],
    server: {
      allowedHosts:['c051-190-140-20-182.ngrok-free.app'],
    }
  },
  output:"server",

});