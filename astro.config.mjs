import { defineConfig } from 'astro/config';
import decap from "astro-decap-cms";

// https://astro.build/config
export default defineConfig({
    integrations: [decap()],
});