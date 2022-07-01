// config/routes.ts

export default [
  {
    flatMenu: true,
    routes: [
      { exact: true, name: '首页', path: '/', component: 'index' },
      {
        path: '/contex',
        name: 'React.createContext例子',
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
    ],
  },
];
