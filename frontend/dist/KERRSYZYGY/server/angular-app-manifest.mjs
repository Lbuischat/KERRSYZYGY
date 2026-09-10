
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/create-account"
  },
  {
    "renderMode": 2,
    "route": "/start"
  },
  {
    "renderMode": 2,
    "route": "/game"
  },
  {
    "renderMode": 2,
    "route": "/settings"
  },
  {
    "renderMode": 2,
    "route": "/playerinfo"
  },
  {
    "renderMode": 2,
    "route": "/shop"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 473, hash: 'b0e8051911d4153c967aa037fe7df102caff84efcfc0d1bcea5073c9f4a960c1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1013, hash: '270bde2ec15be77dfea0c276907e1f891cf3d2c851eec2ae599b1847e38aa6d1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 112504, hash: '84e630799d3079d1454625ba740ea2e016f2de0d092ce6c93fed2840c0db5eb0', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'shop/index.html': {size: 38132, hash: '35e336a6fbcffd4077ea1e9b9a289645d8e53a603e0e7f954f3b4aa9b7d3ed9d', text: () => import('./assets-chunks/shop_index_html.mjs').then(m => m.default)},
    'settings/index.html': {size: 25380, hash: '1e817aff95e6a2774f29ec3c6a8433b3633c3d0f8988721b7cf3119eb2813163', text: () => import('./assets-chunks/settings_index_html.mjs').then(m => m.default)},
    'create-account/index.html': {size: 52587, hash: '3ae16434c7371dae9f0507753d9f8fa72a6a40ed4e120ae6b65b3f4d67074d0b', text: () => import('./assets-chunks/create-account_index_html.mjs').then(m => m.default)},
    'start/index.html': {size: 52463, hash: 'c9289ccdb52fc999e1172b8a984283275313f4202d016a7a58154ce4d203ddb6', text: () => import('./assets-chunks/start_index_html.mjs').then(m => m.default)},
    'playerinfo/index.html': {size: 25429, hash: '166290700590e71370c07e722bdfa4b39cff9111e96045895a21b69c5e54793f', text: () => import('./assets-chunks/playerinfo_index_html.mjs').then(m => m.default)},
    'game/index.html': {size: 112444, hash: 'e38ffe3900b776715803ea08f5e30118d2b0fc27b0cf80de9ede34a48883c9d7', text: () => import('./assets-chunks/game_index_html.mjs').then(m => m.default)}
  },
};
