// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss  from '@tailwindcss/vite';
import clerk from '@clerk/astro';
import node from '@astrojs/node'
import react from '@astrojs/react';
import { esES } from '@clerk/localizations';
import { dark } from '@clerk/themes';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk({
    localization: esES,
    appearance:{
      baseTheme: dark,
      captcha: {
        theme: 'dark',
        size: 'flexible',
        language: 'es-ES',
      }
    },
    
    
  }), react()],
  adapter: node({mode: "standalone"}),
  vite: {
    plugins: [tailwindcss ()],
    server: {
      allowedHosts:['b93a-190-140-20-182.ngrok-free.app'],
    }
  },
  output:"server",

});