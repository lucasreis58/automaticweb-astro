import { defineConfig } from 'astro/config';
import decap from "astro-decap-cms";

export default defineConfig({
    integrations: [
        decap({
            // Esta opção desabilita a injeção automática do script de login,
            // o que evita o erro de compatibilidade com o Astro v5.
            disableIdentityWidgetInjection: true,
        }),
    ],
});