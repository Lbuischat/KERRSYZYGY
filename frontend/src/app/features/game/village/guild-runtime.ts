import type { Point } from './village-npcs';

// O interior usa coordenadas válidas do mundo, mas não compartilha a cena exterior.
export const GUILD_ROOM = { x: 128, y: 128, w: 1024, h: 704 } as const;
export const GUILD_DOOR = { x: 1072, y: 900 } as const;
const local = (x: number, y: number): Point => ({ x: GUILD_ROOM.x + x * 2, y: GUILD_ROOM.y + y * 2 });
const bounds = { left: 24, right: 488, top: 94, bottom: 330 };
const furniture = [
  [35,94,57,35], [104,94,57,35], [181,96,150,43], [382,94,90,40],
  [51,179,96,46], [365,179,96,46], [51,261,96,46], [365,261,96,46]
].map(([x,y,w,h]) => ({ ...local(x,y), w:w*2, h:h*2 }));

interface Station { at: Point; name: string; lines: readonly string[]; }
const stations: readonly Station[] = [
  {at: local(256,155), name: 'Lyra · Líder da guilda', lines: [
    'Bem-vindo ao salão de Aster! Aqui, até as menores conquistas têm lugar entre as estrelas.',
    'O quadro reúne desafios. Uma missão bem feita vale mais que dez abandonadas.',
    'Sente-se, recupere o fôlego. O universo pode esperar alguns minutos.' ]},
  {at: local(427,150), name: 'Quadro de missões', lines: [
    'Recado de Lyra: uma tarefa por vez. Consulte o painel de missões do HUD para acompanhar seus objetivos.',
    'Aviso de Orion: cuidado com os slimes ao sul. Os viajantes devem retornar antes de escurecer.',
    'Recado de Brann: quem pegou meu martelo, por favor devolva. Não é uma missão opcional.' ]},
  {at: local(99,145), name: 'Arquivo de Aster', lines: [
    'Registro 01: Aster nasceu quando viajantes guiados pelas mesmas estrelas decidiram ficar.',
    'Registro 02: um fragmento luminoso foi encontrado na região. Hoje ele adorna a fonte da vila.' ]}
];
const EXIT = local(256,315);
const SPAWN = local(256,286);
const ASSETS = '/assets/village/';

export class GuildRuntime {
  private layer: HTMLDivElement | null = null;
  private camera: HTMLElement | null = null;
  private world: HTMLElement | null = null;
  private originalBackground = '';
  private hint: HTMLDivElement | null = null;
  private message: HTMLDivElement | null = null;
  private name: HTMLDivElement | null = null;
  private text: HTMLDivElement | null = null;
  private activeStation: Station | null = null;
  private lineIndexes = new Map<string, number>();
  private messageTime = 0;
  private lastValid: Point | null = null;
  private outside: Point | null = null;
  get active(): boolean { return this.layer !== null; }
  get returnPosition(): Point | null { return this.outside; }

  enter(camera: HTMLElement, previous: Point, size: number): Point {
    this.leave();
    const doc = camera.ownerDocument;
    this.camera = camera; this.world = camera.parentElement;
    this.outside = { ...previous };
    if (this.world) { this.originalBackground = this.world.style.background; this.world.style.background = '#171525'; }
    const layer = doc.createElement('div'); layer.id = 'guild-interior-layer';
    Object.assign(layer.style, { position:'absolute', inset:'0', background:'#171525', zIndex:'4', pointerEvents:'none' });
    const room = doc.createElement('img'); room.src = ASSETS + 'guilda-interior.png'; room.alt = 'Salão da Guilda de Aster'; room.draggable = false;
    Object.assign(room.style, { position:'absolute', left:`${GUILD_ROOM.x}px`, top:`${GUILD_ROOM.y}px`, width:`${GUILD_ROOM.w}px`, height:`${GUILD_ROOM.h}px`, imageRendering:'pixelated' });
    layer.appendChild(room);
    // A líder é representada no balcão pelo mesmo sprite da vila.
    const lyra = doc.createElement('div'); const pos = local(256,87);
    Object.assign(lyra.style,{position:'absolute',left:`${pos.x-20}px`,top:`${pos.y-24}px`,width:'40px',height:'48px',backgroundImage:`url(${ASSETS}lyra.png)`,backgroundSize:'120px 192px',backgroundPosition:'0 0',imageRendering:'pixelated'});
    layer.appendChild(lyra);
    for (const [label,p] of [['ARQUIVO',local(98,66)],['GUILDA DE ASTER',local(256,18)],['MISSÕES',local(427,72)],['SAÍDA · E',local(256,345)]] as [string,Point][]) {
      const node = doc.createElement('div'); node.textContent = label;
      Object.assign(node.style,{position:'absolute',left:`${p.x}px`,top:`${p.y}px`,transform:'translate(-50%,-50%)',font:'bold 13px monospace',padding:'4px 8px',color:'#f0dfbc',background:'#342b42',border:'1px solid #9a85ac',whiteSpace:'nowrap'});
      layer.appendChild(node);
    }
    const hint = doc.createElement('div'); Object.assign(hint.style,{position:'absolute',transform:'translate(-50%,-100%)',padding:'5px 9px',font:'bold 12px sans-serif',background:'#242036',color:'#f5eaff',border:'1px solid #a99bd7',borderRadius:'5px',display:'none',zIndex:'2'}); layer.appendChild(hint);
    const message = doc.createElement('div'); message.setAttribute('role','status'); message.setAttribute('aria-live','polite');
    Object.assign(message.style,{position:'absolute',zIndex:'3',width:'260px',maxWidth:'72vw',boxSizing:'border-box',transform:'translate(-50%,-100%)',padding:'12px',border:'1px solid #aa9bd6',borderRadius:'8px',background:'#201c32',color:'#f0ecfa',font:'13px/1.4 sans-serif',display:'none'});
    const name = doc.createElement('div'); Object.assign(name.style,{color:'#d0b9ff',fontWeight:'bold',marginBottom:'5px'}); const text = doc.createElement('div'); const next = doc.createElement('div'); next.textContent='E · Próxima fala'; Object.assign(next.style,{fontSize:'10px',color:'#ac9dc6',marginTop:'6px'}); message.append(name,text,next); layer.appendChild(message);
    camera.appendChild(layer); camera.classList.add('guild-interior');
    this.layer=layer; this.hint=hint; this.message=message; this.name=name; this.text=text;
    this.lastValid = { x: SPAWN.x-size/2, y: SPAWN.y-size/2 };
    return this.lastValid;
  }
  nearDoor(px: number, py: number): boolean { return Math.hypot(px-GUILD_DOOR.x,py-GUILD_DOOR.y) <= 62; }
  nearExit(px: number, py: number): boolean { return Math.hypot(px-EXIT.x,py-EXIT.y) <= 58; }
  resolve(x: number,y: number,size: number): Point {
    const clamp = (v:number,min:number,max:number) => Math.max(min,Math.min(max,v));
    const p = {x:clamp(x,GUILD_ROOM.x+bounds.left*2,GUILD_ROOM.x+bounds.right*2-size),y:clamp(y,GUILD_ROOM.y+bounds.top*2,GUILD_ROOM.y+bounds.bottom*2-size)};
    const hits = (a:Point) => furniture.some(b=>a.x < b.x+b.w && a.x+size>b.x && a.y<b.y+b.h && a.y+size>b.y);
    const prev=this.lastValid;
    if (!hits(p)) this.lastValid=p;
    else if (prev && !hits({x:p.x,y:prev.y})) this.lastValid={x:p.x,y:prev.y};
    else if (prev && !hits({x:prev.x,y:p.y})) this.lastValid={x:prev.x,y:p.y};
    else if (!prev) this.lastValid={x:SPAWN.x-size/2,y:SPAWN.y-size/2};
    return this.lastValid!;
  }
  private station(px:number,py:number): Station | null {
    return stations.find(s=>Math.hypot(px-s.at.x,py-s.at.y)<=64) ?? null;
  }
  update(dt:number,px:number,py:number):void {
    if (!this.hint) return;
    if (this.activeStation) {
      this.messageTime-=dt;
      if(this.messageTime<=0 || Math.hypot(px-this.activeStation.at.x,py-this.activeStation.at.y)>100) this.closeDialogue();
    }
    const s=this.station(px,py); const exit=this.nearExit(px,py);
    const target=exit?EXIT:s?.at;
    if (!target || this.activeStation) {this.hint.style.display='none';return;}
    this.hint.textContent=exit?'E · Sair da guilda':`E · ${s!.name.split(' · ')[0]}`;
    this.hint.style.left=`${target.x}px`;this.hint.style.top=`${target.y-24}px`;this.hint.style.display='block';
  }
  interact(px:number,py:number):void {
    const s=this.station(px,py); if(!s||!this.message||!this.name||!this.text)return;
    const i=this.lineIndexes.get(s.name)??0;this.name.textContent=s.name;this.text.textContent=s.lines[i];this.lineIndexes.set(s.name,(i+1)%s.lines.length);this.activeStation=s;this.messageTime=10;
    this.message.style.left=`${Math.max(GUILD_ROOM.x+145,Math.min(GUILD_ROOM.x+GUILD_ROOM.w-145,s.at.x))}px`;this.message.style.top=`${s.at.y-30}px`;this.message.style.display='block';
  }
  closeDialogue():void { this.activeStation=null;this.messageTime=0;if(this.message)this.message.style.display='none'; }
  leave():Point|null {
    const previous=this.outside;this.closeDialogue();this.layer?.remove();this.camera?.classList.remove('guild-interior');if(this.world)this.world.style.background=this.originalBackground;
    this.layer=null;this.camera=null;this.world=null;this.hint=null;this.message=null;this.name=null;this.text=null;this.outside=null;this.lastValid=null;return previous;
  }
}
