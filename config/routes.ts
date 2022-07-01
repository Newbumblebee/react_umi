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
        path: '/table',
        // exact: true,//父路由不能设置改属性
        name: '表格',
        routes: [
          {
            path: '/table/simple',
            exact: true,
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
            exact: true,
            name: 'KeyBy',
            component: '@/pages/lodash/KeyBy',
          },
          {
            path: '/lodash/Debounce',
            exact: true,
            name: 'Debounce',
            component: '@/pages/lodash/Debounce',
          },
        ],
      },
    ],
  },
];
