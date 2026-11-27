import { GuildRuntime, GUILD_DOOR } from './guild-runtime';
import { BUILDINGS } from './village-buildings';
import { RESIDENTS, type Point, type Resident } from './village-npcs';

// Quatro regiões lógicas. Nenhuma geração procedural ou alteração da imagem original.
export const WORLD_CHUNKS = {
  village: { x: 0, y: 0, size: 1280 },
  exploration: { x: 1280, y: 0, size: 1280 },
  farm: { x: 0, y: 1280, size: 1280 },
  combat: { x: 1280, y: 1280, size: 1280 }
} as const;

interface Actor {
  data: Resident;
  x: number; y: number; target: number; wait: number; line: number;
  engaged: boolean; direction: number; phase: number; moving: boolean;
  node: HTMLDivElement; sprite: HTMLDivElement; indicator: HTMLDivElement; tool: HTMLDivElement; distance: number;
  lastFrame: string;
}
interface Rect { x: number; y: number; w: number; h: number; }

const STOP_RADIUS = 80;
const TALK_RADIUS = 64;
const RELEASE_RADIUS = 100;
const ACTIVE_RADIUS = 1050;
const SPEED = 42;
const RENDER_INTERVAL = 0.05;
const ASSETS = '/assets/village/';

export class VillageRuntime {
  private layer: HTMLElement | null = null;
  private actors: Actor[] = [];
  private lastValid: Point | null = null;
  private elapsed = 0;
  private dialogue: HTMLDivElement | null = null;
  private dialogueName: HTMLDivElement | null = null;
  private dialogueText: HTMLDivElement | null = null;
  private speaker: Actor | null = null;
  private dialogueRemaining = 0;
  readonly guild = new GuildRuntime();
  private welcome: HTMLDivElement | null = null;
  private welcomeTime = 0;
  private inVillage = false;
  private doorHint: HTMLDivElement | null = null;
  private readonly smithDecor = [
    { id: 'ferreiro-equipamentos', x: 334, y: 652, w: 124, h: 112 },
    { id: 'ferreiro-materiais', x: 334, y: 764, w: 104, h: 96 }
  ];
  private solids: Rect[] = [
    ...BUILDINGS.map(b => b.id === 'fonte'
      ? {x:b.x+17,y:b.y+25,w:b.w-34,h:b.h-40}
      : {x:b.x+8,y:b.y+10,w:b.w-16,h:b.h-18}),
    ...this.smithDecor.map(b => ({x:b.x+7,y:b.y+8,w:b.w-14,h:b.h-16}))
  ];

  mount(layer: HTMLElement): void {
    if (this.layer === layer) return;
    this.destroy();
    this.layer = layer;
    const doc = layer.ownerDocument;
    const fragment = doc.createDocumentFragment();
    const decor = doc.createElement('img');
    decor.src = ASSETS + 'decor.png'; decor.alt = ''; decor.draggable = false;
    Object.assign(decor.style, { position: 'absolute', left: '0', top: '0', width: '1280px', height: '1280px', imageRendering: 'pixelated', pointerEvents: 'none', zIndex: '0' });
    fragment.appendChild(decor);
    for (const b of BUILDINGS) {
      const img = doc.createElement('img');
      img.src = ASSETS + b.id + '.png'; img.alt = b.label; img.draggable = false;
      img.width = b.w; img.height = b.h;
      Object.assign(img.style, { position: 'absolute', left: `${b.x}px`, top: `${b.y}px`, width: `${b.w}px`, height: `${b.h}px`, imageRendering: 'pixelated', pointerEvents: 'none', zIndex: '1' });
      fragment.appendChild(img);
    }
    for (const b of this.smithDecor) {
      const img=doc.createElement('img');img.src=ASSETS+b.id+'.png';img.alt='Equipamentos e materiais do ferreiro';img.draggable=false;
      Object.assign(img.style,{position:'absolute',left:`${b.x}px`,top:`${b.y}px`,width:`${b.w}px`,height:`${b.h}px`,imageRendering:'pixelated',pointerEvents:'none',zIndex:'1'});fragment.appendChild(img);
    }
    // Placas acima dos telhados, sem bloquear portas.
    for (const b of BUILDINGS.filter(b => b.id !== 'fonte')) {
      const label = doc.createElement('span'); label.textContent = b.label;
      Object.assign(label.style, { position: 'absolute', left: `${b.x + b.w / 2}px`, top: `${b.y - 13}px`, transform: 'translate(-50%, -50%)', padding: '3px 7px', font: 'bold 10px monospace', whiteSpace: 'nowrap', color: '#e5d5b4', background: '#393346', border: '1px solid #82728b', zIndex: '2' });
      fragment.appendChild(label);
    }
    for (const data of RESIDENTS) {
      const node = doc.createElement('div');
      const sprite = doc.createElement('div');
      const indicator = doc.createElement('div');
      const tool = doc.createElement('div');
      Object.assign(tool.style, { position: 'absolute', left: '25px', top: '23px', width: '24px', height: '24px', backgroundImage: `url(${ASSETS}tools.png)`, backgroundSize: '192px 24px', backgroundPosition: `${-this.actors.length * 24}px 0`, imageRendering: 'pixelated', display: 'none' });
      Object.assign(node.style, { position: 'absolute', left: '0', top: '0', width: '40px', height: '48px', pointerEvents: 'none', zIndex: '3' });
      Object.assign(sprite.style, { width: '40px', height: '48px', backgroundImage: `url(${ASSETS}${data.id}.png)`, backgroundSize: '120px 192px', backgroundRepeat: 'no-repeat', imageRendering: 'pixelated' });
      Object.assign(indicator.style, { position: 'absolute', left: '50%', bottom: '52px', transform: 'translateX(-50%)', font: 'bold 11px sans-serif', whiteSpace: 'nowrap', padding: '4px 7px', border: '1px solid #a99bd7', borderRadius: '5px', background: '#201c36', color: '#f0e7ff', display: 'none' });
      node.append(sprite, tool, indicator); fragment.appendChild(node);
      const first = data.route[0];
      const actor: Actor = { data, x: first.x, y: first.y, target: 0, wait: first.seconds, line: 0, engaged: false, direction: 0, phase: 0, moving: false, node, sprite, indicator, tool, distance: Infinity, lastFrame: '' };
      this.actors.push(actor); this.renderActor(actor);
    }
    const dialogue = doc.createElement('div');
    const name = doc.createElement('div'); const text = doc.createElement('div');
    dialogue.setAttribute('role', 'status'); dialogue.setAttribute('aria-live', 'polite');
    Object.assign(dialogue.style, { position: 'absolute', left: '0', top: '0', width: '252px', maxWidth: '80vw', boxSizing: 'border-box', padding: '12px', color: '#f0ecfa', background: '#201c32', border: '1px solid #aa9bd6', borderRadius: '8px', font: '13px/1.4 sans-serif', zIndex: '10', pointerEvents: 'none', display: 'none' });
    Object.assign(name.style, { color: '#d0b9ff', fontWeight: 'bold', marginBottom: '5px' });
    const hint = doc.createElement('div'); hint.textContent = 'E · Próxima fala';
    Object.assign(hint.style, { color: '#ac9dc6', fontSize: '10px', marginTop: '7px' });
    dialogue.append(name, text, hint); fragment.appendChild(dialogue);
    const doorHint = doc.createElement('div'); doorHint.textContent = 'E · Entrar na guilda';
    Object.assign(doorHint.style,{position:'absolute',left:`${GUILD_DOOR.x}px`,top:`${GUILD_DOOR.y-28}px`,transform:'translate(-50%,-100%)',padding:'5px 8px',font:'bold 12px sans-serif',color:'#f4e6ff',background:'#242036',border:'1px solid #a99bd7',borderRadius:'5px',whiteSpace:'nowrap',display:'none',zIndex:'11'});
    fragment.appendChild(doorHint); this.doorHint=doorHint;
    layer.appendChild(fragment);
    const welcome=doc.createElement('div');welcome.setAttribute('role','status');welcome.setAttribute('aria-live','polite');
    Object.assign(welcome.style,{position:'absolute',top:'15%',left:'50%',transform:'translateX(-50%)',zIndex:'90',pointerEvents:'none',padding:'13px 26px',textAlign:'center',width:'max-content',maxWidth:'82vw',background:'#201c32',border:'1px solid #b19bdc',borderRadius:'8px',color:'#efe4ff',opacity:'0',transition:'opacity 250ms ease',font:'bold 18px Georgia,serif'});
    welcome.textContent='✦ Bem-vindo à Vila de Aster ✦';const subtitle=doc.createElement('div');subtitle.textContent='Onde pequenas conquistas acendem estrelas';Object.assign(subtitle.style,{font:'12px sans-serif',color:'#c6b8db',marginTop:'5px'});welcome.appendChild(subtitle);
    layer.parentElement?.parentElement?.appendChild(welcome);this.welcome=welcome;
    this.dialogue = dialogue; this.dialogueName = name; this.dialogueText = text;
  }

  // Colisão simples com construções: usa hitbox quadrada do jogador e desliza por eixos.
  resolvePlayer(x: number, y: number, size: number): Point {
    if (this.guild.active) return this.guild.resolve(x,y,size);
    const hits = (px: number, py: number): boolean => this.solids.some(b =>
      px < b.x + b.w && px + size > b.x && py < b.y + b.h && py + size > b.y);
    if (!hits(x, y)) {
      this.lastValid = { x, y }; return this.lastValid;
    }
    if (this.lastValid) {
      const previous = this.lastValid;
      if (!hits(x, previous.y)) { this.lastValid = { x, y: previous.y }; return this.lastValid; }
      if (!hits(previous.x, y)) { this.lastValid = { x: previous.x, y }; return this.lastValid; }
      if (!hits(previous.x, previous.y)) return previous;
    }
    // Recuperação caso uma posição antiga de save já esteja dentro de uma casa.
    const candidates: Point[] = [];
    for (const b of this.solids) {
      if (x < b.x + b.w && x + size > b.x && y < b.y + b.h && y + size > b.y) {
        candidates.push({x:b.x-size,y}, {x:b.x+b.w,y}, {x,y:b.y-size}, {x,y:b.y+b.h});
      }
    }
    candidates.sort((a,b) => Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y));
    this.lastValid = candidates.find(p => p.x >= 0 && p.y >= 0 && !hits(p.x,p.y)) ?? {x:1255,y:1255};
    return this.lastValid;
  }

  private face(actor: Actor, dx: number, dy: number): void {
    if (Math.abs(dx) + Math.abs(dy) < 1) return;
    actor.direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 2 : 3) : (dy > 0 ? 0 : 1);
  }

  update(dt: number, px: number, py: number): void {
    if (!this.layer) return;
    if (this.guild.active) {this.guild.update(dt,px,py);return;}
    // Aster: pequena margem para evitar disparar no spawn central (1255,1255).
    if (!this.inVillage && px < 1240 && py < 1240) {
      this.inVillage=true;this.welcomeTime=4;if(this.welcome)this.welcome.style.opacity='1';
    } else if (this.inVillage && (px>1300||py>1300)) {this.inVillage=false;this.hideWelcome();}
    if(this.welcomeTime>0){this.welcomeTime-=dt;if(this.welcomeTime<=0)this.hideWelcome();}
    const atDoor=this.guild.nearDoor(px,py);
    if(this.doorHint)this.doorHint.style.display=atDoor?'block':'none';
    this.elapsed += dt;
    const paint = this.elapsed >= RENDER_INTERVAL;
    if (paint) this.elapsed = 0;
    if (this.speaker) {
      this.dialogueRemaining -= dt;
      if (this.dialogueRemaining <= 0 || Math.hypot(px-this.speaker.x, py-this.speaker.y) > RELEASE_RADIUS) this.closeDialogue();
    }
    let nearest: Actor | null = null; let nearestDistance = TALK_RADIUS;
    for (const a of this.actors) {
      const distance = Math.hypot(px-a.x, py-a.y);
      a.distance = distance;
      if (distance > ACTIVE_RADIUS) {
        a.engaged = false; a.moving = false; a.indicator.style.display = 'none'; a.tool.style.display = 'none';
        continue;
      }
      // Histerese: para a 80 px, mas só volta a andar após 100 px.
      a.engaged = distance <= STOP_RADIUS || (a.engaged && distance <= RELEASE_RADIUS);
      a.moving = false;
      if (a.engaged) {
        this.face(a, px-a.x, py-a.y);
      } else if (a.wait > 0) {
        a.wait -= dt;
        if (a.wait <= 0) a.target = (a.target+1) % a.data.route.length;
        // Atividade parada: animação discreta em ritmo lento.
        a.phase += dt * 2.5;
      } else {
        const target = a.data.route[a.target];
        const dx = target.x-a.x, dy = target.y-a.y;
        const dist = Math.hypot(dx,dy);
        const step = Math.min(dist,SPEED*dt);
        if (dist <= 0.5) {
          a.x = target.x; a.y = target.y; a.wait = target.seconds;
        } else {
          a.x += dx/dist*step; a.y += dy/dist*step;
          this.face(a,dx,dy); a.moving = true; a.phase += dt*7;
        }
      }
      if (distance <= nearestDistance) { nearest = a; nearestDistance = distance; }
      if (paint) this.renderActor(a);
    }
    if (paint) {
      for (const a of this.actors) {
        const show = !atDoor && a === nearest && a !== this.speaker && !this.speaker;
        const activity = !a.engaged && !a.moving && a.wait > 0 && a.distance < 220 && a.distance > RELEASE_RADIUS;
        a.indicator.style.display = show || activity ? 'block' : 'none';
        if (show) a.indicator.textContent = `E · ${a.data.name}`;
        else if (activity) a.indicator.textContent = a.data.route[a.target].activity;
      }
    }
  }

  private renderActor(a: Actor): void {
    a.node.style.transform = `translate(${Math.round(a.x-20)}px,${Math.round(a.y-24)}px)`;
    const working = !a.engaged && !a.moving && a.wait > 0;
    a.tool.style.display = working ? 'block' : 'none';
    if (working) a.tool.style.transform = `translateY(${Math.floor(a.phase)%2 ? -3 : 0}px)`;
    const frame = a.engaged ? 0 : a.moving ? 1+Math.floor(a.phase)%2 : Math.floor(a.phase)%3===0 ? 1 : 0;
    const key = `${frame}:${a.direction}`;
    if (a.lastFrame !== key) {
      a.sprite.style.backgroundPosition = `${-frame*40}px ${-a.direction*48}px`;
      a.lastFrame = key;
    }
  }

  interact(px: number, py: number): boolean {
    let nearest: Actor | null = null; let best = TALK_RADIUS;
    for (const a of this.actors) {
      const d = Math.hypot(px-a.x, py-a.y);
      if (d <= best) { best = d; nearest = a; }
    }
    if (!nearest || !this.dialogue || !this.dialogueName || !this.dialogueText) return false;
    this.speaker = nearest; nearest.engaged = true; nearest.indicator.style.display = 'none';
    this.dialogueName.textContent = `${nearest.data.name} · ${nearest.data.role}`;
    this.dialogueText.textContent = nearest.data.lines[nearest.line];
    nearest.line = (nearest.line+1) % nearest.data.lines.length;
    this.dialogueRemaining = 9;
    this.dialogue.style.left = `${Math.max(12, Math.min(2560-264, nearest.x-126))}px`;
    this.dialogue.style.top = `${Math.max(8,nearest.y-45)}px`;
    this.dialogue.style.transform = 'translateY(-100%)';
    this.dialogue.style.display = 'block';
    return true;
  }

  hideWelcome():void {this.welcomeTime=0;if(this.welcome)this.welcome.style.opacity='0';}
  enterGuild(camera:HTMLElement, previous:Point, size:number):Point {
    this.closeDialogue();this.hideWelcome();this.lastValid=null;
    return this.guild.enter(camera,previous,size);
  }
  leaveGuild():Point|null {this.lastValid=null;return this.guild.leave();}
  closeDialogue(): void {
    this.speaker = null; this.dialogueRemaining = 0;
    if (this.dialogue) this.dialogue.style.display = 'none';
  }
  reset(): void {
    this.leaveGuild();this.hideWelcome();this.inVillage=false;this.closeDialogue(); this.lastValid = null; this.elapsed = 0;
    for (const a of this.actors) {
      const p = a.data.route[0];
      a.x=p.x; a.y=p.y; a.target=0; a.wait=p.seconds; a.engaged=false; a.moving=false; a.direction=0; a.phase=0;
      a.indicator.style.display='none'; this.renderActor(a);
    }
  }
  destroy(): void {
    this.leaveGuild();this.hideWelcome();this.welcome?.remove();this.welcome=null;this.doorHint=null;this.inVillage=false;
    this.closeDialogue();
    this.layer?.replaceChildren(); this.layer=null; this.actors=[];
    this.dialogue=null; this.dialogueName=null; this.dialogueText=null; this.lastValid=null;
  }
}
