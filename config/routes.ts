// config/routes.ts

/***
 *  在使用React菜单组件，点击跳转不显示子路由，直接跳到空白页面
    在子路由的上一级路由里，不能使用exact
    会导致父级路由路径不匹配从而父子组件都显示不了

    exact的值为bool型，为true是表示严格匹配，为false时为正常匹配。
    如在exact为true时，’/link’与’/’是不匹配的，但是在false的情况下它们又是匹配的。
 */

export default [
  {
    flatMenu: true,
    routes: [
      {
        path: '/firstPage',
        // exact: true,
        name: '首页',
        component: 'index',
      },
      {
        path: '/contex',
        exact: true,
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
        path: '/lodash',
        // exact: true, //父路由不能设置改属性
        name: 'lodash 示例',
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
        path: '/tree',
        // exact: true, //父路由不能设置改属性
        name: 'tree树',
        routes: [
          {
            path: '/tree/treeone',
            exact: true,
            name: '树一',
            component: '@/pages/tree/treeone',
          },
          {
            path: '/tree/treetwo',
            exact: true,
            name: '树二',
            component: '@/pages/tree/treetwo',
          },
          {
            path: '/tree/treethree',
            exact: true,
            name: '树三',
            component: '@/pages/tree/treethree',
          },
          {
            path: '/tree/treefour',
            exact: true,
            name: '树四',
            component: '@/pages/tree/treefour',
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
