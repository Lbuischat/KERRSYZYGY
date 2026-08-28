
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
    'index.csr.html': {size: 6118, hash: 'be0fad8f0cf8854feceef311424bb8277cd1bb345b3465dc70118858becd07ad', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1036, hash: 'd77901f0a0bfc010f9d8db33eb0a93dbbe8d477a1f833ba2307534113b58851d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6594, hash: '69283830cdbe41e0ea9ccdc45c968eb7e41e4ebfccda656323dafd9d6d31a16d', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 9157, hash: 'b42262d0098d5061a0817f49a66879a69263b7e09fd5e337af7fd77df1ceecf8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'game/index.html': {size: 174047, hash: '700169a2ac6798a791506ce2bab39c0d4662868674be6cc783f3c7e8b594e6b3', text: () => import('./assets-chunks/game_index_html.mjs').then(m => m.default)},
    'styles-JKOLBG4O.css': {size: 15045, hash: 'ntM3fZOAZiE', text: () => import('./assets-chunks/styles-JKOLBG4O_css.mjs').then(m => m.default)}
  },
};
