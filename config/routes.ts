// config/routes.ts

export default [
  {
    flatMenu: true,
    routes: [
      { exact: true, name: '首页', path: '/', component: 'index' },
      { path: '/usr', exact: true, name: '用户', component: '@/pages/index' },
      {
        path: '/lodash',
        exact: true,
        name: 'lodash',
        component: '@/pages/lodash',
      },
      {
        path: '/lodash01',
        exact: true,
        name: 'lodash01',
        component: '@/pages/lodash01',
      },
      {
        path: '/sty',
        exact: true,
        name: 'sty',
        component: '@/pages/study/Parent',
      },
    ],
  },
];
