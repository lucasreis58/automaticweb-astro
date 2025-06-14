import { config, collection, fields } from '@keystatic/core';

export default config({
    storage: {
        kind: 'cloud',
    },
    cloud: {
        project: 'autentic-web/automaticweb-astro', // Substitua pelo seu usuário e repositório do GitHub
    },
    collections: {
        posts: collection({
            label: 'Posts do Blog',
            slugField: 'title',
            path: 'src/content/blog/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                description: fields.text({ label: 'Descrição Curta' }),
                pubDate: fields.date({ label: 'Data de Publicação' }),
                author: fields.text({ label: 'Autor', defaultValue: 'Lucas' }),
                image: fields.image({
                    label: 'Imagem de Capa',
                    directory: 'public/images/blog',
                    publicPath: '/images/blog/',
                }),
                tags: fields.array(fields.text({ label: 'Tag' }), {
                    label: 'Tags',
                    itemLabel: props => props.value,
                }),
                content: fields.document({
                    label: 'Conteúdo do Post',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: {
                        directory: 'public/images/blog',
                        publicPath: '/images/blog/',
                    },
                }),
            },
        }),
    },
});