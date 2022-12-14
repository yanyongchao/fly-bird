import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'fly-bird',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  navs: [
    {
      title: '组件',
      path: '/components',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/umijs/dumi',
    },
  ],
  menus: {
    '/components': [
      {
        title: '通用',
        children: ['Icon'],
      },
      {
        title: '数据展示',
        children: ['Affix', 'Alert', 'Avatar', 'BackTop', 'Carousel'],
      },
    ],
  },

  // more config: https://d.umijs.org/config
});
