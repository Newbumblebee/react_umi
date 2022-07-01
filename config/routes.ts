// config/routes.ts

export default [
  {
    flatMenu: true,
    routes: [
      { exact: true, name: '首页', path: '/', component: 'index' },
      {
        path: '/contex',
        name: 'React.createContext 示例',
        component: '@/pages/context',
      },
      {
        name: '表格',
        routes: [
          {
            path: '/simple',
            name: '简单表格',
            component: '@/pages/table/simpletable/SimpleTable',
          },
        ],
      },
      {
        name: 'lodash 示例',
        routes: [
          {
            path: '/keyBy',
            name: 'KeyBy',
            component: '@/pages/lodash/KeyBy',
          },
          {
            path: '/Debounce',
            name: 'Debounce',
            component: '@/pages/lodash/Debounce',
          },
        ],
      },
    ],
  },
];
