import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Exercice 18",
  description: "Revue de code documentée",
   base: '/appweb-exer18/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Charles', link: '/charles-hamel' },
      { text: 'Arnaud', link: '/arnaud-gaulin' }
    ],

    sidebar: [
      {
        text: 'Nom de coéquipiers',
        items: [
          { text: 'Charles Hamel', link: '/charles-hamel' },
          { text: 'Arnaud Gaulin', link: '/arnaud-gaulin' }
        ]
      }
    ]
  }
})
