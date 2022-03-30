// config/routes.ts

// export default [
//   { exact: false, path: '/', component: '@/pages/demo/index' }
// ];
export default [
  { exact: true, path: '/', component: 'index' },
  { path: '/usr', exact: true, component: '@/pages/index' },
];
