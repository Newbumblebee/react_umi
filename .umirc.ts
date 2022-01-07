import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [{ path: '/', component: '@/pages/drawerDemo' }],
  fastRefresh: {},
});
