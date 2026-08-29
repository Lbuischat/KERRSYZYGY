
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
    'index.csr.html': {size: 6082, hash: '44fbd4649569ea5076e36ce90b293f4c9f4a3249d662db7209d5655643a62dbf', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1036, hash: '47da7836f2b26985f6b38ef3d9ee0971cdd597ec14a0d0bd2d7a4d4ca69a4bbd', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 9120, hash: 'f15f487e518f1b5be79d70f4c2d6467a2463c34816792776c1ed634e44890a51', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 6557, hash: '1ccb65c0c64c5f35b254f07d11ac7577fdc7cf1b808f534d07b22c701180ba27', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'game/index.html': {size: 175388, hash: '253c2f46f41e09cf9711edc5d68864be167d1231b212ae00cf18ceda6b1152fa', text: () => import('./assets-chunks/game_index_html.mjs').then(m => m.default)},
    'styles-HS6XP2UP.css': {size: 14707, hash: '483utniq5+U', text: () => import('./assets-chunks/styles-HS6XP2UP_css.mjs').then(m => m.default)}
  },
};
