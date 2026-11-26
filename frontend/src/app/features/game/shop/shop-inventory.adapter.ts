import type { InventoryItem, ItemCategory } from '../hud/inventory/inventory-item.model';

type ShopPurchase = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  raridade: InventoryItem['rarity'];
  categoria: string;
};

// As regras reais vivem aqui, baseadas no ID imutavel, nunca no nome/raridade.
// Itens de forja continuam inutilizaveis ate a forja ser implementada.
const ITEM_EFFECTS: Record<string, Pick<InventoryItem, 'usable' | 'buff' | 'effect'>> = {
  'character-exp': { usable: true, effect: { type: 'xp', value: 55 } },
  'character-exp-large': { usable: true, effect: { type: 'xp', value: 140 } },

  'energy-food': { usable: true, buff: { type: 'stamina', value: 25 } },
  'exp-booster': { usable: true, buff: { type: 'xpGain', value: 0.5, duration: 40 } },
  'field-berry-mix': { usable: true, buff: { type: 'health', value: 15 } },
  'recovery-shot': { usable: true, buff: { type: 'health', value: 35 } },
  'endurance-drink': { usable: true, buff: { type: 'stamina', value: 45 } },
  'rangers-brew': { usable: true, buff: { type: 'speed', value: 0.12, duration: 20 } },
  'ironheart-tea': { usable: true, buff: { type: 'health', value: 3, duration: 12 } },
  'nova-capsule': { usable: true, buff: { type: 'damage', value: 0.15, duration: 20 } },
  'moonwater-elixir': { usable: true, effect: { type: 'dualRestore', health: 55, stamina: 35 } },
  'phoenix-dew': { usable: true, buff: { type: 'health', value: 95 } }
};

export function refreshKnownItemEffects(item: InventoryItem): InventoryItem {
  const rule = ITEM_EFFECTS[item.id];
  if (!rule) return item;
  return { ...item, ...rule, buff: rule.buff, effect: rule.effect };
}

export function toInventoryItem(item: ShopPurchase): InventoryItem {
  let category: ItemCategory = 'items';
  if (item.categoria === 'weapons') category = 'weapons';
  if (item.categoria === 'consumables') category = 'potions';
  if (item.categoria === 'wishes') category = 'collectables';

  return refreshKnownItemEffects({
    id: item.id,
    name: item.nome,
    description: item.descricao,
    category,
    icon: item.imagem,
    rarity: item.raridade,
    quantity: 0,
    maxStack: 99,
    usable: false
  });
}
