import type { InventoryItem } from '../hud/inventory/inventory-item.model';
import { toInventoryItem } from '../shop/shop-inventory.adapter';
import { BUILDINGS } from './village-buildings';

export const FOUNTAIN_COST = 250;
export const FOUNTAIN_LIMIT = 4;
type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
type Reward = { id: string; nome: string; raridade: Rarity; categoria: string };
// IDs, nomes e raridades do catálogo existente. Os itens de armas e materiais
// também representam o estoque planejado para o ferreiro, sem duplicar IDs.
const REWARDS: Record<Rarity, readonly Reward[]> = {
  common: [
    {id:'crimson-salve',nome:'Crimson Salve',raridade:'common',categoria:'recommended'},
    {id:'field-berry-mix',nome:'Field Berry Mix',raridade:'common',categoria:'consumables'},
    {id:'trail-ration',nome:'Trail Ration',raridade:'common',categoria:'recommended'},
    {id:'iron-shard',nome:'Iron Shard',raridade:'common',categoria:'weapons'},
    {id:'copper-filament',nome:'Copper Filament',raridade:'common',categoria:'materials'},
    {id:'crystal-dust',nome:'Crystal Dust',raridade:'common',categoria:'materials'}
  ],
  uncommon: [
    {id:'endurance-drink',nome:'Endurance Drink',raridade:'uncommon',categoria:'consumables'},
    {id:'plasma-magazine',nome:'Plasma Magazine',raridade:'uncommon',categoria:'weapons'},
    {id:'aether-weave',nome:'Aether Weave',raridade:'uncommon',categoria:'materials'},
    {id:'reinforced-fiber',nome:'Reinforced Fiber',raridade:'uncommon',categoria:'materials'}
  ],
  rare: [
    {id:'ironheart-tea',nome:'Ironheart Tea',raridade:'rare',categoria:'consumables'},
    {id:'comet-alloy',nome:'Comet Alloy',raridade:'rare',categoria:'weapons'},
    {id:'meteor-glass',nome:'Meteor Glass',raridade:'rare',categoria:'materials'}
  ],
  epic: [
    {id:'moonwater-elixir',nome:'Moonwater Elixir',raridade:'epic',categoria:'consumables'},
    {id:'void-edge',nome:'Void Edge',raridade:'epic',categoria:'weapons'},
    {id:'singularity-ore',nome:'Singularity Ore',raridade:'epic',categoria:'materials'}
  ],
  legendary: [
    {id:'phoenix-dew',nome:'Phoenix Dew',raridade:'legendary',categoria:'consumables'},
    {id:'supernova-core',nome:'Supernova Core',raridade:'legendary',categoria:'weapons'},
    {id:'starlight-essence',nome:'Starlight Essence',raridade:'legendary',categoria:'materials'}
  ]
};
const LABEL: Record<Rarity,string> = {common:'Comum',uncommon:'Incomum',rare:'Raro',epic:'Épico',legendary:'Lendário'};
const COLORS: Record<Rarity,string> = {common:'#c0c0ce',uncommon:'#86d8a1',rare:'#88b9ff',epic:'#c8a0ff',legendary:'#f4d17d'};
export function rollReward(random:()=>number = Math.random): Reward {
  const roll=random()*100;
  const rarity:Rarity=roll<60?'common':roll<85?'uncommon':roll<95?'rare':roll<99?'epic':'legendary';
  const pool=REWARDS[rarity];
  return pool[Math.min(pool.length-1,Math.floor(random()*pool.length))];
}
export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
interface DailyState { day:string; used:number; }
interface Wallet {
  key:()=>string;
  balance:()=>number;
  spend:(amount:number)=>boolean;
  refund:(amount:number)=>void;
  grant:(item:InventoryItem)=>void;
}
const fountain=BUILDINGS.find(b=>b.id==='fonte')!;
// Inclui os quatro lados da fonte, sem exigir entrar na hitbox sólida.
export function nearFountain(x:number,y:number):boolean {
  const dx=Math.max(fountain.x-x,0,x-(fountain.x+fountain.w));
  const dy=Math.max(fountain.y-y,0,y-(fountain.y+fountain.h));
  return Math.hypot(dx,dy)<=40;
}

export class FountainRuntime {
  private world:HTMLElement|null=null;
  private hint:HTMLDivElement|null=null;
  private panel:HTMLDivElement|null=null;
  private balanceText:HTMLSpanElement|null=null;
  private remainingText:HTMLSpanElement|null=null;
  private status:HTMLDivElement|null=null;
  private rewardBox:HTMLDivElement|null=null;
  private confirm:HTMLButtonElement|null=null;
  private nearby=false;
  private busy=false;
  private openKey='';
  private refreshTime=0;
  constructor(private readonly wallet:Wallet) {}
  get active():boolean{return this.panel!==null;}

  private read():DailyState {
    const day=localDay();
    const raw=localStorage.getItem(this.wallet.key());
    if(raw===null)return {day,used:0};
    const saved=JSON.parse(raw) as DailyState;
    if(typeof saved.day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(saved.day)||!Number.isInteger(saved.used)||saved.used<0||saved.used>FOUNTAIN_LIMIT)throw new Error('Registro inválido');
    // Não reabre tentativas se o relógio retroceder para um dia anterior.
    return saved.day>=day?saved:{day,used:0};
  }
  mount(world:HTMLElement,layer:HTMLElement):void {
    if(this.world===world && this.hint?.isConnected)return;
    this.destroy();this.world=world;
    const h=world.ownerDocument.createElement('div');h.className='aster-fountain-hint';h.textContent='E · Fonte Astral';
    h.style.left=`${fountain.x+fountain.w/2}px`;h.style.top=`${fountain.y-12}px`;h.hidden=true;
    layer.appendChild(h);this.hint=h;
  }
  update(dt:number,x:number,y:number,enabled:boolean):void {
    this.nearby=enabled&&nearFountain(x,y);
    if(this.active&&(!this.nearby||this.openKey!==this.wallet.key()))this.close();
    if(this.hint)this.hint.hidden=!this.nearby||this.active;
    if(this.active){this.refreshTime+=dt;if(this.refreshTime>=.5){this.refreshTime=0;this.refresh();}}
  }
  interact(x:number,y:number):boolean {
    if(!nearFountain(x,y)||!this.world)return false;
    this.nearby=true;if(!this.active)this.open();return true;
  }
  private open():void {
    if(!this.world)return;
    const doc=this.world.ownerDocument;
    const overlay=doc.createElement('div');overlay.className='aster-fountain-overlay';
    const card=doc.createElement('section');card.className='aster-fountain-card';card.setAttribute('role','dialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','Fonte Astral de Aster');
    const title=doc.createElement('h2');title.textContent='✦ Fonte Astral de Aster';
    const art=doc.createElement('img');art.className='aster-fountain-art';art.src='/assets/village/fonte.png';art.alt='Cristal da fonte';
    const subtitle=doc.createElement('p');subtitle.textContent='As estrelas guardam surpresas para aqueles que seguem sua luz.';
    const details=doc.createElement('div');details.className='aster-fountain-details';
    const row=(label:string)=>{const line=doc.createElement('div');const l=doc.createElement('span');l.textContent=label;const r=doc.createElement('strong');line.append(l,r);details.append(line);return r;};
    row('Oferenda').textContent='250 Shop XP';this.balanceText=row('Seu saldo');this.remainingText=row('Tentativas de hoje');
    const odds=doc.createElement('p');odds.className='aster-fountain-odds';odds.textContent='Comum 60% · Incomum 25% · Raro 10% · Épico 4% · Lendário 1%';
    this.rewardBox=doc.createElement('div');this.rewardBox.className='aster-fountain-reward';this.rewardBox.hidden=true;
    this.status=doc.createElement('div');this.status.className='aster-fountain-status';this.status.setAttribute('role','status');this.status.textContent='Uma oferenda concede um item aleatório. Confirme para gastar XP.';
    const buttons=doc.createElement('div');buttons.className='aster-fountain-buttons';
    const confirm=doc.createElement('button');confirm.type='button';confirm.textContent='Oferecer 250 Shop XP';confirm.onclick=()=>this.offer();this.confirm=confirm;
    const close=doc.createElement('button');close.type='button';close.className='aster-fountain-close';close.textContent='Fechar';close.onclick=()=>this.close();buttons.append(confirm,close);
    card.append(art,title,subtitle,details,odds,this.rewardBox,this.status,buttons);overlay.append(card);
    for(const ev of ['mousedown','mouseup','click','contextmenu'])overlay.addEventListener(ev,e=>e.stopPropagation());
    overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();this.close();}else if(e.key==='Enter'||e.key===' ')e.stopPropagation();});
    this.panel=overlay;this.openKey=this.wallet.key();this.world.appendChild(overlay);if(this.hint)this.hint.hidden=true;this.refresh();close.focus();
  }
  private refresh():void {
    if(!this.confirm||!this.balanceText||!this.remainingText)return;
    this.balanceText.textContent=`${this.wallet.balance()} Shop XP`;
    try{
      const remaining=FOUNTAIN_LIMIT-this.read().used;
      this.remainingText.textContent=`${remaining}/${FOUNTAIN_LIMIT}`;
      this.confirm.disabled=this.busy||remaining===0||this.wallet.balance()<FOUNTAIN_COST||!this.nearby;
      if(remaining===0&&!this.busy&&this.status)this.status.textContent='As estrelas repousam por hoje. Retorne amanhã, viajante.';
      else if(this.wallet.balance()<FOUNTAIN_COST&&!this.busy&&this.status)this.status.textContent='Shop XP insuficiente.';
    }catch{this.confirm.disabled=true;this.remainingText.textContent='Indisponível';if(this.status)this.status.textContent='Não foi possível acessar o registro diário. Nenhum XP será gasto.';}
  }
  private offer():void {
    if(!this.active||!this.nearby||this.busy||this.openKey!==this.wallet.key())return;
    this.busy=true;
    const key=this.wallet.key();let previous:string|null=null;let reserved=false;let spent=false;let granted=false;
    try{
      const daily=this.read();
      if(daily.used>=FOUNTAIN_LIMIT||this.wallet.balance()<FOUNTAIN_COST)return;
      const reward=rollReward();
      const item=toInventoryItem({...reward,descricao:'Recompensa da Fonte Astral de Aster.',imagem:''});
      // Reserva a tentativa ANTES de gastar; se o storage falhar, não há cobrança.
      previous=localStorage.getItem(key);localStorage.setItem(key,JSON.stringify({day:daily.day,used:daily.used+1}));reserved=true;
      if(!this.wallet.spend(FOUNTAIN_COST))throw new Error('Saldo insuficiente');spent=true;
      this.wallet.grant(item);granted=true;
      if(this.rewardBox){
        const doc=this.rewardBox.ownerDocument;const img=doc.createElement('img');img.src=item.icon??'';img.alt='';
        const text=doc.createElement('div');const name=doc.createElement('strong');name.textContent=item.name;name.style.color=COLORS[reward.raridade];
        const rarity=doc.createElement('span');rarity.textContent=`${LABEL[reward.raridade]} · +1 no inventário`;text.append(name,rarity);this.rewardBox.replaceChildren(img,text);this.rewardBox.hidden=false;
      }
      if(this.status)this.status.textContent='A fonte respondeu ao seu chamado!';
    }catch{
      if(!granted){if(spent)this.wallet.refund(FOUNTAIN_COST);if(reserved){try{if(previous===null)localStorage.removeItem(key);else localStorage.setItem(key,previous);}catch{/* falha local; não conceder recompensa adicional */}}}
      if(this.status)this.status.textContent='Não foi possível concluir a oferenda.';
    }finally{this.busy=false;this.refresh();}
  }
  close():void {this.panel?.remove();this.panel=null;this.confirm=null;this.balanceText=null;this.remainingText=null;this.status=null;this.rewardBox=null;this.openKey='';this.refreshTime=0;}
  destroy():void{this.close();this.hint?.remove();this.hint=null;this.world=null;this.nearby=false;}
}
