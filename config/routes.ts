// config/routes.ts

export default [
  { exact: true, path: '/', component: 'index' },
  { path: '/usr', exact: true, component: '@/pages/index' },
  { path: '/lodash', exact: true, component: '@/pages/lodash' },
];
