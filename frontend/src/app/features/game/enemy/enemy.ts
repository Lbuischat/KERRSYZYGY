import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-enemy',
  standalone: true,
  imports: [],
  templateUrl: './enemy.html',
  styleUrl: './enemy.css'
})
export class Enemy implements OnInit, AfterViewInit, OnDestroy {
  // Identificador de depuração, presente na main.
  private static nextId = 1;
  private readonly id = Enemy.nextId++;

  @ViewChild('enemyRef')
  enemyRef?: ElementRef<HTMLElement>;

  // Posição e tipo.
  @Input() x = 600;
  @Input() y = 400;
  @Input() elite = false;
  @Input() training = false;

  readonly spritePath = '/assets/sprites/enemies/alien-slime.png';
  readonly size = 40;
  readonly speed = 65;

  maxHealth = 100;
  health = 100;
  isDead = false;
  isPlayerInView = false;

  // Temporizadores dos ataques.
  touchTimer = 0;
  spitTimer = 1.4;
  burstTimer = 3.8;
  burstWindup = 0;
  burstCharging = false;

  ngOnInit(): void {
    this.maxHealth = this.elite ? 350 : 100;
    this.health = this.maxHealth;

    console.log(
      `🟢 CREATED ENEMY #${this.id}`,
      this.elite ? '(ELITE)' : '(NORMAL)'
    );
  }

  ngAfterViewInit(): void {
    this.updateVisualPosition();
    this.updateHealthBar();
  }

  ngOnDestroy(): void {
    // O Angular remove os elementos deste inimigo automaticamente.
  }

  // Estatísticas por tipo de slime.
  get viewRange(): number {
    return this.elite ? 390 : 260;
  }

  get attackRange(): number {
    return this.elite ? 310 : 165;
  }

  get movementSpeed(): number {
    return this.elite ? 85 : this.speed;
  }

  get touchDamage(): number {
    return this.elite ? 80 : 10;
  }

  get projectileDamage(): number {
    return this.elite ? 30 : 8;
  }

  get projectileSpeed(): number {
    return this.elite ? 275 : 195;
  }

  get spitCooldown(): number {
    return this.elite ? 1.8 : 2.8;
  }

  updateTimers(deltaTime: number): void {
    this.touchTimer = Math.max(0, this.touchTimer - deltaTime);
    this.spitTimer = Math.max(0, this.spitTimer - deltaTime);
    this.burstTimer = Math.max(0, this.burstTimer - deltaTime);
  }

  public updateVisualPosition(): void {
    const root = this.enemyRef?.nativeElement;
    if (!root) return;

    root.style.left = `${this.x}px`;
    root.style.top = `${this.y}px`;
  }

  public checkPlayerInView(
    playerX: number,
    playerY: number,
    playerSize: number
  ): boolean {
    const playerCenterX = playerX + playerSize / 2;
    const playerCenterY = playerY + playerSize / 2;
    const enemyCenterX = this.x + this.size / 2;
    const enemyCenterY = this.y + this.size / 2;

    const dx = playerCenterX - enemyCenterX;
    const dy = playerCenterY - enemyCenterY;

    this.isPlayerInView =
      !this.isDead && Math.hypot(dx, dy) <= this.viewRange;

    // Mantém o feedback visual também quando a detecção é
    // atualizada fora do ciclo de detecção de mudanças do Angular.
    this.enemyRef?.nativeElement
      .querySelector('.enemy-view-range')
      ?.classList.toggle('detected', this.isPlayerInView);

    return this.isPlayerInView;
  }

  getHealthPercentage(): number {
    if (this.maxHealth <= 0) return 0;
    return Math.max(0, (100 * this.health) / this.maxHealth);
  }

  private updateHealthBar(): void {
    const bar = this.enemyRef?.nativeElement
      .querySelector<HTMLElement>('.health-bar');

    if (bar) {
      bar.style.width = `${this.getHealthPercentage()}%`;
    }
  }

  takeDamage(amount: number): void {
    if (this.isDead || amount <= 0) return;

    this.health = Math.max(0, this.health - amount);

    console.log(`Enemy #${this.id} HP:`, this.health);

    this.updateHealthBar();
    this.triggerHitEffect(amount);

    if (this.health <= 0) {
      this.die();
    }
  }

  public triggerHitEffect(damage: number): void {
    const root = this.enemyRef?.nativeElement;
    if (!root) return;

    const sprite = root.querySelector<HTMLElement>('.enemy-sprite');

    sprite?.animate(
      [
        { filter: 'brightness(2)', transform: 'translateX(-3px)' },
        { filter: 'brightness(1)', transform: 'translateX(3px)' },
        { filter: 'brightness(1)', transform: 'translateX(0)' }
      ],
      { duration: 180 }
    );

    // Estilos inline preservados da branch Marcos para garantir
    // a aparência do elemento criado dinamicamente.
    const label = document.createElement('span');
    label.className = 'enemy-damage-label';
    label.textContent = `-${damage}`;

    Object.assign(label.style, {
      position: 'absolute',
      top: '-26px',
      left: '50%',
      zIndex: '8',
      color: '#fff',
      font: '800 15px sans-serif',
      textShadow: '0 2px 3px black',
      pointerEvents: 'none'
    });

    root.appendChild(label);

    const animation = label.animate(
      [
        { transform: 'translate(-50%, 0)', opacity: 1 },
        { transform: 'translate(-50%, -28px)', opacity: 0 }
      ],
      { duration: 650, fill: 'forwards' }
    );

    animation.onfinish = () => label.remove();
  }

  private die(): void {
    if (this.isDead) return;

    this.isDead = true;
    this.isPlayerInView = false;
    this.burstCharging = false;

    const root = this.enemyRef?.nativeElement;
    if (!root) return;

    const animation = root.animate(
      [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(1.25, .55)' }
      ],
      { duration: 300, fill: 'forwards' }
    );

    animation.onfinish = () => {
      root.style.display = 'none';
    };
  }
}
