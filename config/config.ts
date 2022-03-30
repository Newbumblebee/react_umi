// export default {
//     base: '/docs',
//     publicPath: '/static',
//     hash: true,
//     history: {
//         type: 'hash'
//     }
// }

import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes: routes,
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  fastRefresh: {},
});
