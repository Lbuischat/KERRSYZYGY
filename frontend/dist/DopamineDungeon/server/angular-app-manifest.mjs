
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
    'index.csr.html': {size: 5898, hash: 'd33938f102098235034d3380de8cc095a0684a9c50ceeede42ca3b55b753d8ed', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 953, hash: '7b8607a36c1edc852f26b861cd5187c2ee8be04662bebba8e71c88fa63ef8571', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6363, hash: 'b535bdfc1a3d2cc53ed3a4ee1652d22a55ca79b02ef37dd6be00b0a373a85119', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 8936, hash: 'aa2867f667799ece24939445cd4efbba81d62828411a808d93147820873ed1fb', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'game/index.html': {size: 141502, hash: '4d1b912bb57dcd0b7f03ee3a5f58b99349caf552fd820a090742e6a79604aa69', text: () => import('./assets-chunks/game_index_html.mjs').then(m => m.default)},
    'styles-IF2VDQQH.css': {size: 14484, hash: 'fZdZgoFpI/4', text: () => import('./assets-chunks/styles-IF2VDQQH_css.mjs').then(m => m.default)}
  },
};
