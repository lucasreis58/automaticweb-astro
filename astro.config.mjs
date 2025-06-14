import { defineConfig } from 'astro/config';
import inject from '@rollup/plugin-inject';

export default defineConfig({
    vite: {
        plugins: [
            inject({
                // Mapeia o 'exports' global para o 'decap-cms' para compatibilidade
                exports: 'decap-cms',
            }),
        ],
    },
});