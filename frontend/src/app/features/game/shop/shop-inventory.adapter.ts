
import type {
  InventoryItem,
  ItemCategory
} from '../hud/inventory/inventory-item.model';

type ShopPurchase = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  raridade: InventoryItem['rarity'];
  categoria: string;
};

export function toInventoryItem(
  item: ShopPurchase
): InventoryItem {

  let category: ItemCategory = 'items';

  if (item.categoria === 'weapons') {
    category = 'weapons';
  }

  if (item.categoria === 'consumables') {
    category = 'potions';
  }

  if (item.categoria === 'wishes') {
    category = 'collectables';
  }

  // Efeitos que já podem ser usados.
  // Os demais produtos continuam guardados
  // até suas mecânicas serem implementadas.
  const xpById: Record<string, number> = {
    'character-exp': 55,
    'character-exp-large': 140
  };

  const xp = xpById[item.id];

  return {
    id: item.id,
    name: item.nome,
    description: item.descricao,
    category,
    icon: item.imagem,
    rarity: item.raridade,
    quantity: 0,
    maxStack: 99,
    usable: xp !== undefined,

    ...(xp !== undefined
      ? {
          effect: {
            type: 'xp' as const,
            value: xp
          }
        }
      : {})
  };
}
