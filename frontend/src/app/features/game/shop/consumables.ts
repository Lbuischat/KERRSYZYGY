// KERRSYZYGY — 8 novos consumíveis. Os outros 2 já existem na loja.
// Cada entrada usa os mesmos campos de ShopItem, sem redesenhar o catálogo.
export type LumiConsumable = {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  imagem: string;
  raridade: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  preco: number;
  quantidade: number;
  categoria: 'consumables';
  moeda: 'credits';
  subcategoria: string;
};

export const LUMI_CONSUMABLES: LumiConsumable[] = [
  {
    id: 'field-berry-mix', nome: 'Field Berry Mix',
    descricao: 'A blend of healing berries. Restores 15 HP immediately.',
    icone: '✿', imagem: '/assets/items/shop/field-berry-mix.svg',
    raridade: 'common', preco: 90, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'healing'
  },
  {
    id: 'recovery-shot', nome: 'Recovery Shot',
    descricao: 'Emergency recovery injector. Restores 35 HP immediately.',
    icone: '✚', imagem: '/assets/items/shop/recovery-shot.svg',
    raridade: 'common', preco: 210, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'healing'
  },
  {
    id: 'endurance-drink', nome: 'Endurance Drink',
    descricao: 'An energizing drink that instantly restores 45 stamina.',
    icone: '◈', imagem: '/assets/items/shop/endurance-drink.svg',
    raridade: 'uncommon', preco: 330, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'stamina'
  },
  {
    id: 'rangers-brew', nome: "Ranger's Brew",
    descricao: 'Increases movement speed by 12% for 20 seconds.',
    icone: '➤', imagem: '/assets/items/shop/rangers-brew.svg',
    raridade: 'uncommon', preco: 500, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'speed'
  },
  {
    id: 'ironheart-tea', nome: 'Ironheart Tea',
    descricao: 'Restores 3 HP per second for 12 seconds (36 HP maximum).',
    icone: '♥', imagem: '/assets/items/shop/ironheart-tea.svg',
    raridade: 'rare', preco: 760, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'regeneration'
  },
  {
    id: 'nova-capsule', nome: 'Nova Capsule',
    descricao: 'Increases melee and projectile damage by 15% for 20 seconds.',
    icone: '✸', imagem: '/assets/items/shop/nova-capsule.svg',
    raridade: 'rare', preco: 880, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'damage'
  },
  {
    id: 'moonwater-elixir', nome: 'Moonwater Elixir',
    descricao: 'Restores 55 HP and 35 stamina instantly.',
    icone: '☾', imagem: '/assets/items/shop/moonwater-elixir.svg',
    raridade: 'epic', preco: 1550, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'dual-recovery'
  },
  {
    id: 'phoenix-dew', nome: 'Phoenix Dew',
    descricao: 'A legendary restorative. Restores 95 HP instantly.',
    icone: '✦', imagem: '/assets/items/shop/phoenix-dew.svg',
    raridade: 'legendary', preco: 2800, quantidade: 0,
    categoria: 'consumables', moeda: 'credits', subcategoria: 'healing'
  }
];
