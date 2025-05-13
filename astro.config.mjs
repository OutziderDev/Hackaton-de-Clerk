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

  },
  output:"server",

});