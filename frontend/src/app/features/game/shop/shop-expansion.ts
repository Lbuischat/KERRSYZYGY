// KERRSYZYGY — expansao do catalogo Shop: +33 itens (sem duplicar os existentes).
// Os 19 produtos originais + 8 consumiveis anteriores + 33 novos = 60.
// Os dois antigos produtos da categoria 'wishes' vao para Recommended;
// a aba Wishes continua sendo apenas favoritos, nao uma vitrine extra.
import type { InventoryItem } from '../hud/inventory/inventory-item.model';

type ShopExpansionCategory =
  | 'recommended' | 'characters' | 'weapons' | 'abilities' | 'materials';
type ShopExpansionRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export interface ShopExpansionProduct {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  imagem: string;
  raridade: ShopExpansionRarity;
  preco: number;
  quantidade: number;
  categoria: ShopExpansionCategory;
  moeda: 'credits';
  subcategoria: string;
}

export const SHOP_EXPANSION: ShopExpansionProduct[] = [
  {
    id: 'crimson-salve', nome: 'Crimson Salve',
    descricao: 'Pomada de primeiros socorros. Recupera 20 HP imediatamente.',
    icone: '✦', imagem: '/assets/items/shop/crimson-salve.svg',
    raridade: 'common', preco: 140, quantidade: 0,
    categoria: 'recommended', moeda: 'credits', subcategoria: 'healing'
  },
  {
    id: 'trail-ration', nome: 'Trail Ration',
    descricao: 'Ração de exploração. Recupera 30 pontos de stamina.',
    icone: '✦', imagem: '/assets/items/shop/trail-ration.svg',
    raridade: 'common', preco: 220, quantidade: 0,
    categoria: 'recommended', moeda: 'credits', subcategoria: 'stamina'
  },
  {
    id: 'comet-injector', nome: 'Comet Injector',
    descricao: 'Injeção ofensiva. Aumenta o dano em 18% durante 18 segundos.',
    icone: '✦', imagem: '/assets/items/shop/comet-injector.svg',
    raridade: 'epic', preco: 1800, quantidade: 0,
    categoria: 'recommended', moeda: 'credits', subcategoria: 'damage'
  },
  {
    id: 'celestial-heart', nome: 'Celestial Heart',
    descricao: 'Essência celestial. Recupera 70 HP e 30 de stamina de uma só vez.',
    icone: '✦', imagem: '/assets/items/shop/celestial-heart.svg',
    raridade: 'legendary', preco: 3900, quantidade: 0,
    categoria: 'recommended', moeda: 'credits', subcategoria: 'recovery'
  },
  {
    id: 'memory-fragment', nome: 'Memory Fragment',
    descricao: 'Fragmento de memória que concede 25 XP ao personagem.',
    icone: '◇', imagem: '/assets/items/shop/memory-fragment.svg',
    raridade: 'common', preco: 160, quantidade: 0,
    categoria: 'characters', moeda: 'credits', subcategoria: 'character-exp'
  },
  {
    id: 'stellar-page', nome: 'Stellar Page',
    descricao: 'Página de conhecimento estelar. Concede 35 XP ao personagem.',
    icone: '◇', imagem: '/assets/items/shop/stellar-page.svg',
    raridade: 'common', preco: 230, quantidade: 0,
    categoria: 'characters', moeda: 'credits', subcategoria: 'character-exp'
  },
  {
    id: 'astral-codex', nome: 'Astral Codex',
    descricao: 'Compêndio astral que concede 90 XP ao personagem.',
    icone: '◇', imagem: '/assets/items/shop/astral-codex.svg',
    raridade: 'uncommon', preco: 680, quantidade: 0,
    categoria: 'characters', moeda: 'credits', subcategoria: 'character-exp'
  },
  {
    id: 'synchrony-capsule', nome: 'Synchrony Capsule',
    descricao: 'Cápsula de sintonia. Concede 150 XP ao personagem.',
    icone: '◇', imagem: '/assets/items/shop/synchrony-capsule.svg',
    raridade: 'rare', preco: 1250, quantidade: 0,
    categoria: 'characters', moeda: 'credits', subcategoria: 'character-exp'
  },
  {
    id: 'luminary-core', nome: 'Luminary Core',
    descricao: 'Núcleo para evolução de atributos. Guarde-o para o futuro sistema de ascensão.',
    icone: '◇', imagem: '/assets/items/shop/luminary-core.svg',
    raridade: 'rare', preco: 1700, quantidade: 0,
    categoria: 'characters', moeda: 'credits', subcategoria: 'ascension'
  },
  {
    id: 'celestial-sigil', nome: 'Celestial Sigil',
    descricao: 'Selo para melhorias avançadas. Material de progressão; não é consumível.',
    icone: '◇', imagem: '/assets/items/shop/celestial-sigil.svg',
    raridade: 'epic', preco: 2600, quantidade: 0,
    categoria: 'characters', moeda: 'credits', subcategoria: 'ascension'
  },
  {
    id: 'origin-star', nome: 'Origin Star',
    descricao: 'Estrela de origem para desbloqueio avançado de personagens. Recurso de progressão.',
    icone: '◇', imagem: '/assets/items/shop/origin-star.svg',
    raridade: 'legendary', preco: 5200, quantidade: 0,
    categoria: 'characters', moeda: 'credits', subcategoria: 'ascension'
  },
  {
    id: 'iron-shard', nome: 'Iron Shard',
    descricao: 'Fragmento metálico para reforços iniciais de arma. Material de forja.',
    icone: '⌁', imagem: '/assets/items/shop/iron-shard.svg',
    raridade: 'common', preco: 140, quantidade: 0,
    categoria: 'weapons', moeda: 'credits', subcategoria: 'weapon-material'
  },
  {
    id: 'quartz-coil', nome: 'Quartz Coil',
    descricao: 'Bobina de quartzo para circuitos ofensivos. Componente de forja.',
    icone: '⌁', imagem: '/assets/items/shop/quartz-coil.svg',
    raridade: 'common', preco: 250, quantidade: 0,
    categoria: 'weapons', moeda: 'credits', subcategoria: 'weapon-material'
  },
  {
    id: 'plasma-magazine', nome: 'Plasma Magazine',
    descricao: 'Carga de plasma temporária. Aumenta o dano em 8% por 15 segundos.',
    icone: '⌁', imagem: '/assets/items/shop/plasma-magazine.svg',
    raridade: 'uncommon', preco: 590, quantidade: 0,
    categoria: 'weapons', moeda: 'credits', subcategoria: 'weapon-buff'
  },
  {
    id: 'rift-blade-oil', nome: 'Rift Blade Oil',
    descricao: 'Óleo energizado para combate. Aumenta o dano em 10% por 15 segundos.',
    icone: '⌁', imagem: '/assets/items/shop/rift-blade-oil.svg',
    raridade: 'uncommon', preco: 680, quantidade: 0,
    categoria: 'weapons', moeda: 'credits', subcategoria: 'weapon-buff'
  },
  {
    id: 'comet-alloy', nome: 'Comet Alloy',
    descricao: 'Liga resistente destinada à forja de equipamentos raros.',
    icone: '⌁', imagem: '/assets/items/shop/comet-alloy.svg',
    raridade: 'rare', preco: 1450, quantidade: 0,
    categoria: 'weapons', moeda: 'credits', subcategoria: 'weapon-material'
  },
  {
    id: 'void-edge', nome: 'Void Edge',
    descricao: 'Carga instável do vazio. Aumenta o dano em 20% por 12 segundos.',
    icone: '⌁', imagem: '/assets/items/shop/void-edge.svg',
    raridade: 'epic', preco: 2450, quantidade: 0,
    categoria: 'weapons', moeda: 'credits', subcategoria: 'weapon-buff'
  },
  {
    id: 'supernova-core', nome: 'Supernova Core',
    descricao: 'Fonte de energia para aprimoramento de arma lendária. Material de forja.',
    icone: '⌁', imagem: '/assets/items/shop/supernova-core.svg',
    raridade: 'legendary', preco: 5400, quantidade: 0,
    categoria: 'weapons', moeda: 'credits', subcategoria: 'weapon-material'
  },
  {
    id: 'wind-spark', nome: 'Wind Spark',
    descricao: 'Faísca do vento. Aumenta a velocidade em 7% por 12 segundos.',
    icone: '✧', imagem: '/assets/items/shop/wind-spark.svg',
    raridade: 'common', preco: 270, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'speed'
  },
  {
    id: 'aegis-pulse', nome: 'Aegis Pulse',
    descricao: 'Pulso defensivo de escudo. Recurso para a futura árvore de defesa.',
    icone: '✧', imagem: '/assets/items/shop/aegis-pulse.svg',
    raridade: 'common', preco: 380, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'ability-material'
  },
  {
    id: 'flow-circuit', nome: 'Flow Circuit',
    descricao: 'Circuito de fluxo para aperfeiçoar a esquiva. Componente de habilidade.',
    icone: '✧', imagem: '/assets/items/shop/flow-circuit.svg',
    raridade: 'uncommon', preco: 750, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'ability-material'
  },
  {
    id: 'focus-prism', nome: 'Focus Prism',
    descricao: 'Prisma de foco. Recupera instantaneamente 15 de stamina.',
    icone: '✧', imagem: '/assets/items/shop/focus-prism.svg',
    raridade: 'uncommon', preco: 540, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'stamina'
  },
  {
    id: 'arc-bloom', nome: 'Arc Bloom',
    descricao: 'Florescimento de energia. Aumenta o dano em 12% por 16 segundos.',
    icone: '✧', imagem: '/assets/items/shop/arc-bloom.svg',
    raridade: 'rare', preco: 1100, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'damage'
  },
  {
    id: 'phase-seed', nome: 'Phase Seed',
    descricao: 'Semente de fase. Aumenta a velocidade em 13% por 10 segundos.',
    icone: '✧', imagem: '/assets/items/shop/phase-seed.svg',
    raridade: 'rare', preco: 1350, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'speed'
  },
  {
    id: 'chrono-wave', nome: 'Chrono Wave',
    descricao: 'Onda temporal de aprendizado. Aumenta o XP ganho em 25% por 25 segundos.',
    icone: '✧', imagem: '/assets/items/shop/chrono-wave.svg',
    raridade: 'epic', preco: 2100, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'xpGain'
  },
  {
    id: 'cosmic-overdrive', nome: 'Cosmic Overdrive',
    descricao: 'Sobrecarga cósmica. Aumenta o dano em 30% durante 12 segundos.',
    icone: '✧', imagem: '/assets/items/shop/cosmic-overdrive.svg',
    raridade: 'legendary', preco: 4600, quantidade: 0,
    categoria: 'abilities', moeda: 'credits', subcategoria: 'damage'
  },
  {
    id: 'copper-filament', nome: 'Copper Filament',
    descricao: 'Filamento condutor utilizado em circuitos e fabricação de itens básicos.',
    icone: '◆', imagem: '/assets/items/shop/copper-filament.svg',
    raridade: 'common', preco: 90, quantidade: 0,
    categoria: 'materials', moeda: 'credits', subcategoria: 'crafting'
  },
  {
    id: 'crystal-dust', nome: 'Crystal Dust',
    descricao: 'Pó de cristal utilizado em processos de refinamento energético.',
    icone: '◆', imagem: '/assets/items/shop/crystal-dust.svg',
    raridade: 'common', preco: 130, quantidade: 0,
    categoria: 'materials', moeda: 'credits', subcategoria: 'crafting'
  },
  {
    id: 'aether-weave', nome: 'Aether Weave',
    descricao: 'Tecido de éter para montagem de equipamentos leves.',
    icone: '◆', imagem: '/assets/items/shop/aether-weave.svg',
    raridade: 'uncommon', preco: 450, quantidade: 0,
    categoria: 'materials', moeda: 'credits', subcategoria: 'crafting'
  },
  {
    id: 'reinforced-fiber', nome: 'Reinforced Fiber',
    descricao: 'Fibra ultrarresistente para peças defensivas.',
    icone: '◆', imagem: '/assets/items/shop/reinforced-fiber.svg',
    raridade: 'uncommon', preco: 520, quantidade: 0,
    categoria: 'materials', moeda: 'credits', subcategoria: 'crafting'
  },
  {
    id: 'meteor-glass', nome: 'Meteor Glass',
    descricao: 'Vidro meteórico para fabricação de armas energéticas.',
    icone: '◆', imagem: '/assets/items/shop/meteor-glass.svg',
    raridade: 'rare', preco: 1050, quantidade: 0,
    categoria: 'materials', moeda: 'credits', subcategoria: 'crafting'
  },
  {
    id: 'singularity-ore', nome: 'Singularity Ore',
    descricao: 'Minério de singularidade usado em forjas de alto nível.',
    icone: '◆', imagem: '/assets/items/shop/singularity-ore.svg',
    raridade: 'epic', preco: 2200, quantidade: 0,
    categoria: 'materials', moeda: 'credits', subcategoria: 'crafting'
  },
  {
    id: 'starlight-essence', nome: 'Starlight Essence',
    descricao: 'Essência estelar rara para futuras receitas lendárias.',
    icone: '◆', imagem: '/assets/items/shop/starlight-essence.svg',
    raridade: 'legendary', preco: 4800, quantidade: 0,
    categoria: 'materials', moeda: 'credits', subcategoria: 'crafting'
  }
];

// Somente efeitos que existem de verdade no InventoryService/BuffService.
// Materiais de forja, ascensao e desbloqueios futuros ficam guardados no
// inventario (usable=false), em vez de serem gastos sem causar efeito.
export const SHOP_EXTRA_EFFECTS: Record<string, Pick<InventoryItem, 'usable' | 'buff' | 'effect'>> = {
  'crimson-salve': { usable: true, buff: { type: 'health', value: 20, } },
  'trail-ration': { usable: true, buff: { type: 'stamina', value: 30, } },
  'comet-injector': { usable: true, buff: { type: 'damage', value: 0.18, duration: 18 } },
  'celestial-heart': { usable: true, effect: { type: 'dualRestore', health: 70, stamina: 30 } },
  'memory-fragment': { usable: true, effect: { type: 'xp', value: 25 } },
  'stellar-page': { usable: true, effect: { type: 'xp', value: 35 } },
  'astral-codex': { usable: true, effect: { type: 'xp', value: 90 } },
  'synchrony-capsule': { usable: true, effect: { type: 'xp', value: 150 } },
  'plasma-magazine': { usable: true, buff: { type: 'damage', value: 0.08, duration: 15 } },
  'rift-blade-oil': { usable: true, buff: { type: 'damage', value: 0.1, duration: 15 } },
  'void-edge': { usable: true, buff: { type: 'damage', value: 0.2, duration: 12 } },
  'wind-spark': { usable: true, buff: { type: 'speed', value: 0.07, duration: 12 } },
  'focus-prism': { usable: true, buff: { type: 'stamina', value: 15, } },
  'arc-bloom': { usable: true, buff: { type: 'damage', value: 0.12, duration: 16 } },
  'phase-seed': { usable: true, buff: { type: 'speed', value: 0.13, duration: 10 } },
  'chrono-wave': { usable: true, buff: { type: 'xpGain', value: 0.25, duration: 25 } },
  'cosmic-overdrive': { usable: true, buff: { type: 'damage', value: 0.3, duration: 12 } }
};
