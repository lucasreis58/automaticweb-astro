import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import react from "@astrojs/react";
import netlify from '@astrojs/netlify';
//import netlify from "@astrojs/adapter-netlify";

export default defineConfig({
  // Adiciona esta linha
  output: 'server',

  //adapter: netlify(), // E esta linha
  integrations: [keystatic(), react()],

  adapter: netlify()
});