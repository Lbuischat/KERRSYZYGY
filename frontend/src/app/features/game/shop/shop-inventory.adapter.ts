import type { InventoryItem, ItemCategory, ItemBuff, ItemEffect } from '../hud/inventory/inventory-item.model';

export const SHOP_ITEM_ICONS: Record<string, string> = {
  'character-exp': '/assets/items/shop-icons/character-exp.png',
  'weapon-material': '/assets/items/shop-icons/weapon-material.png',
  'ability-core': '/assets/items/shop-icons/ability-core.png',
  'ascension-material': '/assets/items/shop-icons/ascension-material.png',
  'wish-token': '/assets/items/shop-icons/wish-token.png',
  'wish-pack': '/assets/items/shop-icons/wish-pack.png',
  'crimson-salve': '/assets/items/shop-icons/crimson-salve.png',
  'trail-ration': '/assets/items/shop-icons/trail-ration.png',
  'comet-injector': '/assets/items/shop-icons/comet-injector.png',
  'celestial-heart': '/assets/items/shop-icons/celestial-heart.png',
  'character-exp-large': '/assets/items/shop-icons/character-exp-large.png',
  'character-ascension': '/assets/items/shop-icons/character-ascension.png',
  'character-skill': '/assets/items/shop-icons/character-skill.png',
  'memory-fragment': '/assets/items/shop-icons/memory-fragment.png',
  'stellar-page': '/assets/items/shop-icons/stellar-page.png',
  'astral-codex': '/assets/items/shop-icons/astral-codex.png',
  'synchrony-capsule': '/assets/items/shop-icons/synchrony-capsule.png',
  'luminary-core': '/assets/items/shop-icons/luminary-core.png',
  'celestial-sigil': '/assets/items/shop-icons/celestial-sigil.png',
  'origin-star': '/assets/items/shop-icons/origin-star.png',
  'weapon-exp': '/assets/items/shop-icons/weapon-exp.png',
  'weapon-ascension': '/assets/items/shop-icons/weapon-ascension.png',
  'weapon-core': '/assets/items/shop-icons/weapon-core.png',
  'iron-shard': '/assets/items/shop-icons/iron-shard.png',
  'quartz-coil': '/assets/items/shop-icons/quartz-coil.png',
  'plasma-magazine': '/assets/items/shop-icons/plasma-magazine.png',
  'rift-blade-oil': '/assets/items/shop-icons/rift-blade-oil.png',
  'comet-alloy': '/assets/items/shop-icons/comet-alloy.png',
  'void-edge': '/assets/items/shop-icons/void-edge.png',
  'supernova-core': '/assets/items/shop-icons/supernova-core.png',
  'ability-exp': '/assets/items/shop-icons/ability-exp.png',
  'ability-core-rare': '/assets/items/shop-icons/ability-core-rare.png',
  'wind-spark': '/assets/items/shop-icons/wind-spark.png',
  'aegis-pulse': '/assets/items/shop-icons/aegis-pulse.png',
  'flow-circuit': '/assets/items/shop-icons/flow-circuit.png',
  'focus-prism': '/assets/items/shop-icons/focus-prism.png',
  'arc-bloom': '/assets/items/shop-icons/arc-bloom.png',
  'phase-seed': '/assets/items/shop-icons/phase-seed.png',
  'chrono-wave': '/assets/items/shop-icons/chrono-wave.png',
  'cosmic-overdrive': '/assets/items/shop-icons/cosmic-overdrive.png',
  'basic-material': '/assets/items/shop-icons/basic-material.png',
  'rare-material': '/assets/items/shop-icons/rare-material.png',
  'advanced-material': '/assets/items/shop-icons/advanced-material.png',
  'copper-filament': '/assets/items/shop-icons/copper-filament.png',
  'crystal-dust': '/assets/items/shop-icons/crystal-dust.png',
  'aether-weave': '/assets/items/shop-icons/aether-weave.png',
  'reinforced-fiber': '/assets/items/shop-icons/reinforced-fiber.png',
  'meteor-glass': '/assets/items/shop-icons/meteor-glass.png',
  'singularity-ore': '/assets/items/shop-icons/singularity-ore.png',
  'starlight-essence': '/assets/items/shop-icons/starlight-essence.png',
  'energy-food': '/assets/items/shop-icons/energy-food.png',
  'exp-booster': '/assets/items/shop-icons/exp-booster.png',
  'field-berry-mix': '/assets/items/shop-icons/field-berry-mix.png',
  'recovery-shot': '/assets/items/shop-icons/recovery-shot.png',
  'endurance-drink': '/assets/items/shop-icons/endurance-drink.png',
  'rangers-brew': '/assets/items/shop-icons/rangers-brew.png',
  'ironheart-tea': '/assets/items/shop-icons/ironheart-tea.png',
  'nova-capsule': '/assets/items/shop-icons/nova-capsule.png',
  'moonwater-elixir': '/assets/items/shop-icons/moonwater-elixir.png',
  'phoenix-dew': '/assets/items/shop-icons/phoenix-dew.png',
};
export const SHOP_SHOP_ITEM_IDS = Object.freeze(Object.keys(SHOP_ITEM_ICONS));

type Purchase = {
  id: string; nome: string; descricao: string; imagem: string;
  raridade: InventoryItem['rarity']; categoria: string;
};
type Stat = 'maxHealth'|'maxStamina'|'damage'|'speed'|'xpGain';
type Rule = { buff?: ItemBuff; effect?: ItemEffect };
const hp = (value:number): Rule => ({ buff: {type:'health',value} });
const sta = (value:number): Rule => ({ buff: {type:'stamina',value} });
const xp = (value:number): Rule => ({ effect:{type:'xp',value} });
const shop = (value:number): Rule => ({ effect:{type:'shopXp',value} });
const dual = (health:number,stamina:number): Rule => ({ effect:{type:'dualRestore',health,stamina} });
const timed = (type:'speed'|'damage'|'xpGain'|'health',value:number,duration:number):Rule => ({buff:{type,value,duration}});
const up = (stats:Partial<Record<Stat,number>>):Rule => ({effect:{type:'upgrade',stats}});

// Exatamente os 60 IDs do catalogo da Shop, e mais 3 itens coletados.
const RULES: Record<string,Rule> = {
  // Recommended
  'character-exp':xp(55),
  'weapon-material':up({damage:.002}),
  'ability-core':up({maxStamina:2}),
  'ascension-material':up({maxHealth:3}),
  'wish-token':shop(20),
  'wish-pack':shop(200),
  'crimson-salve':hp(20),
  'trail-ration':sta(30),
  'comet-injector':timed('damage',.18,18),
  'celestial-heart':dual(70,30),
  // Characters
  'character-exp-large':xp(140),
  'character-ascension':up({maxHealth:8}),
  'character-skill':up({damage:.004}),
  'memory-fragment':xp(25),
  'stellar-page':xp(35),
  'astral-codex':xp(90),
  'synchrony-capsule':xp(150),
  'luminary-core':up({maxHealth:6,maxStamina:4}),
  'celestial-sigil':up({maxHealth:8,damage:.005}),
  'origin-star':up({maxHealth:20,maxStamina:15,speed:.01}),
  // Weapons
  'weapon-exp':up({damage:.001}),
  'weapon-ascension':up({damage:.015}),
  'weapon-core':up({damage:.03}),
  'iron-shard':up({damage:.002}),
  'quartz-coil':up({damage:.004}),
  'plasma-magazine':timed('damage',.08,15),
  'rift-blade-oil':timed('damage',.1,15),
  'comet-alloy':up({damage:.012}),
  'void-edge':timed('damage',.2,12),
  'supernova-core':up({damage:.05}),
  // Abilities
  'ability-exp':up({speed:.002}),
  'ability-core-rare':up({xpGain:.02}),
  'wind-spark':timed('speed',.07,12),
  'aegis-pulse':up({maxHealth:4}),
  'flow-circuit':up({speed:.003}),
  'focus-prism':sta(15),
  'arc-bloom':timed('damage',.12,16),
  'phase-seed':timed('speed',.13,10),
  'chrono-wave':timed('xpGain',.25,25),
  'cosmic-overdrive':timed('damage',.3,12),
  // Materials
  'basic-material':up({maxStamina:1}),
  'rare-material':up({maxHealth:4}),
  'advanced-material':up({maxHealth:12,damage:.01}),
  'copper-filament':up({maxStamina:1}),
  'crystal-dust':up({maxHealth:1}),
  'aether-weave':up({speed:.004}),
  'reinforced-fiber':up({maxHealth:3}),
  'meteor-glass':up({damage:.007}),
  'singularity-ore':up({damage:.025}),
  'starlight-essence':up({maxHealth:10,maxStamina:10,xpGain:.01}),
  // Consumables
  'energy-food':sta(25),
  'exp-booster':timed('xpGain',.5,40),
  'field-berry-mix':hp(15),
  'recovery-shot':hp(35),
  'endurance-drink':sta(45),
  'rangers-brew':timed('speed',.12,20),
  'ironheart-tea':timed('health',3,12),
  'nova-capsule':timed('damage',.15,20),
  'moonwater-elixir':dual(55,35),
  'phoenix-dew':hp(95),
  // World pickup items
  berry:hp(10),
  'astral-potion':sta(25),
  'star-fragment':xp(5)
};

function description(rule:Rule, previous:string): string {
  const e = rule.effect;
  if (e?.type === 'xp') return `Concede ${e.value} XP ao personagem.`;
  if (e?.type === 'shopXp') return `Concede ${e.value} XP da loja.`;
  if (e?.type === 'dualRestore') return `Recupera ${e.health} HP e ${e.stamina} stamina.`;
  if (e?.type === 'upgrade') return `Melhoria permanente: ${Object.entries(e.stats).map(([k,v])=> `${k} +${['damage','speed','xpGain'].includes(k) ? (Number(v)*100).toFixed(1)+'%' : v}`).join(', ')}. Limite por atributo.`;
  if (rule.buff) {
    const b=rule.buff;
    if (b.duration !== undefined) return b.type==='health' ? `Regenera ${b.value} HP por segundo durante ${b.duration}s.` : `${b.type} +${Math.round(b.value*100)}% durante ${b.duration}s.`;
    return `Recupera ${b.value} de ${b.type}.`;
  }
  return previous;
}
export function refreshKnownItemEffects(item:InventoryItem):InventoryItem {
  const rule=RULES[item.id]; if(!rule) return item;
  return {...item,icon: SHOP_ITEM_ICONS[item.id] ?? item.icon,usable:true,buff:rule.buff,effect:rule.effect,description:description(rule,item.description)};
}
export function toInventoryItem(item:Purchase):InventoryItem {
  let category:ItemCategory='items';
  if(item.categoria==='weapons')category='weapons';
  else if(item.categoria==='consumables')category='potions';
  else if(item.categoria==='materials')category='collectables';
  return refreshKnownItemEffects({id:item.id,name:item.nome,description:item.descricao,category,
    icon: SHOP_ITEM_ICONS[item.id] ?? item.imagem,rarity:item.raridade,quantity:0,maxStack:99,usable:false});
}
export const ITEM_EFFECT_COUNT = Object.keys(RULES).length;
export const SHOP_SHOP_EFFECT_COUNT = SHOP_SHOP_ITEM_IDS.filter(id => !!RULES[id]).length;
