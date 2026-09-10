
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/game"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6159, hash: '55f6eb6ac3d9e9b5db89a826bf788f39e8ac14ad55b9bdc5df4db161f4e72003', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1036, hash: '34de6f78ca075f78604d8794317ec296e8ad77402d7be46cb739ac2d3e5d5176', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6636, hash: 'fa6615c3bbb2e72181e20c5c62100525bf892f2e2b5c350bf0227f804e2e7e41', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 61151, hash: 'c9e64c2fbb39c3cde679ad6c470f451c98d8500b018e8fcb885e13e9ec5e57c3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'game/index.html': {size: 175485, hash: '4684ef7448d35a623c8a6286a10aa17a84aeb57ddc1008aa069d19641bac5d73', text: () => import('./assets-chunks/game_index_html.mjs').then(m => m.default)},
    'styles-C7GWHSTT.css': {size: 15176, hash: '3S1zjewKHjI', text: () => import('./assets-chunks/styles-C7GWHSTT_css.mjs').then(m => m.default)}
  },
};
