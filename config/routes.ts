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
        path: '/table',
        routes: [
          {
            path: '/table/simple',
            name: '简单表格',
            component: '@/pages/table/simpletable/SimpleTable',
          },
        ],
      },
      {
        name: 'lodash 示例',
        path: '/lodash',
        routes: [
          {
            path: '/lodash/keyBy',
            name: 'KeyBy',
            component: '@/pages/lodash/KeyBy',
          },
          {
            path: '/lodash/Debounce',
            name: 'Debounce',
            component: '@/pages/lodash/Debounce',
          },
        ],
      },
      {
        name: 'useRef 示例',
        path: '/useref',
        routes: [
          {
            path: '/useref/TextInputWithFocusButton',
            name: 'TextInputWithFocusButton',
            component: '@/pages/useref/TextInputWithFocusButton',
          },
          {
            path: '/useref/FancyInput',
            name: 'DebouFancyInputnce',
            component: '@/pages/useref/FancyInput',
          },
        ],
      },
    ],
  },
];
