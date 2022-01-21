//配置文件，包含 umi 内置功能和插件的配置。

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [
    //{ path: '/', component: '@/pages/index' },
    { path: '/', component: '@/pages/ant/index' },
  ],
  fastRefresh: {},
});
