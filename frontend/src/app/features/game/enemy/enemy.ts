
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
export class Enemy
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('enemyRef')
  enemyRef?: ElementRef<HTMLElement>;

  // =====================================
  // POSIÇÃO / TIPO
  // =====================================

  @Input() x = 600;
  @Input() y = 400;

  @Input() elite = false;
  @Input() training = false;

  readonly spritePath =
    '/assets/sprites/enemies/alien-slime.png';

  // =====================================
  // HITBOX E VELOCIDADE
  // =====================================

  readonly size = 40;
  readonly speed = 65;

  // =====================================
  // VIDA
  // =====================================

  maxHealth = 100;
  health = 100;

  isDead = false;
  isPlayerInView = false;

  // =====================================
  // TEMPORIZADORES
  // =====================================

  touchTimer = 0;
  spitTimer = 1.4;

  // Golpe especial exclusivo do elite.
  burstTimer = 3.8;

  // Tempo de preparação da rajada.
  burstWindup = 0;

  burstCharging = false;

  // =====================================
  // INICIALIZAÇÃO
  // =====================================

  ngOnInit(): void {

    // Slime normal: 100 HP
    // Slime Elite: 350 HP
    this.maxHealth = this.elite
      ? 350
      : 100;

    this.health = this.maxHealth;
  }

  ngAfterViewInit(): void {
    this.updateVisualPosition();
    this.updateHealthBar();
  }

  ngOnDestroy(): void {
    // O Angular remove os elementos
    // deste inimigo automaticamente.
  }

  // =====================================
  // ESTATÍSTICAS POR TIPO
  // =====================================

  get viewRange(): number {
    return this.elite ? 390 : 260;
  }

  get attackRange(): number {
    return this.elite ? 310 : 165;
  }

  get movementSpeed(): number {
    return this.elite
      ? 85
      : this.speed;
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

  // =====================================
  // TEMPOS DE RECARGA DOS ATAQUES
  // =====================================

  updateTimers(deltaTime: number): void {

    this.touchTimer = Math.max(
      0,
      this.touchTimer - deltaTime
    );

    this.spitTimer = Math.max(
      0,
      this.spitTimer - deltaTime
    );

    this.burstTimer = Math.max(
      0,
      this.burstTimer - deltaTime
    );
  }

  // =====================================
  // ATUALIZAR POSIÇÃO
  // =====================================

  updateVisualPosition(): void {

    const root = this.enemyRef?.nativeElement;

    if (!root) {
      return;
    }

    root.style.left = `${this.x}px`;
    root.style.top = `${this.y}px`;
  }

  // =====================================
  // DETECTAR JOGADOR
  // =====================================

  checkPlayerInView(
    playerX: number,
    playerY: number,
    playerSize: number
  ): boolean {

    const dx =
      playerX + playerSize / 2 -
      (this.x + this.size / 2);

    const dy =
      playerY + playerSize / 2 -
      (this.y + this.size / 2);

    this.isPlayerInView =
      !this.isDead &&
      Math.hypot(dx, dy) <= this.viewRange;

    // Feedback no círculo de detecção.
    this.enemyRef?.nativeElement
      .querySelector('.enemy-view-range')
      ?.classList.toggle(
        'detected',
        this.isPlayerInView
      );

    return this.isPlayerInView;
  }

  // =====================================
  // PORCENTAGEM DA VIDA
  // =====================================

  getHealthPercentage(): number {

    if (this.maxHealth <= 0) {
      return 0;
    }

    return Math.max(
      0,
      100 * this.health / this.maxHealth
    );
  }

  // =====================================
  // ATUALIZAR BARRA DE HP
  // =====================================

  private updateHealthBar(): void {

    const bar = this.enemyRef?.nativeElement
      .querySelector<HTMLElement>(
        '.health-bar'
      );

    if (bar) {
      bar.style.width =
        `${this.getHealthPercentage()}%`;
    }
  }

  // =====================================
  // RECEBER DANO
  // =====================================

  takeDamage(amount: number): void {

    if (
      this.isDead ||
      amount <= 0
    ) {
      return;
    }

    this.health = Math.max(
      0,
      this.health - amount
    );

    this.updateHealthBar();

    this.triggerHitEffect(amount);

    if (this.health <= 0) {
      this.die();
    }
  }

  // =====================================
  // FEEDBACK VISUAL DE DANO
  // =====================================

  private triggerHitEffect(
    damage: number
  ): void {

    const root = this.enemyRef?.nativeElement;

    if (!root) {
      return;
    }

    const sprite = root.querySelector<HTMLElement>(
      '.enemy-sprite'
    );

    // Pequeno flash ao sofrer dano.
    sprite?.animate(
      [
        {
          filter: 'brightness(2)',
          transform: 'translateX(-3px)'
        },
        {
          filter: 'brightness(1)',
          transform: 'translateX(3px)'
        },
        {
          filter: 'brightness(1)',
          transform: 'translateX(0)'
        }
      ],
      {
        duration: 180
      }
    );

    // Número de dano flutuante.
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
        {
          transform: 'translate(-50%, 0)',
          opacity: 1
        },
        {
          transform: 'translate(-50%, -28px)',
          opacity: 0
        }
      ],
      {
        duration: 650,
        fill: 'forwards'
      }
    );

    animation.onfinish = () => {
      label.remove();
    };
  }

  // =====================================
  // MORTE DO INIMIGO
  // =====================================

  private die(): void {

    if (this.isDead) {
      return;
    }

    this.isDead = true;
    this.isPlayerInView = false;
    this.burstCharging = false;

    const root = this.enemyRef?.nativeElement;

    if (!root) {
      return;
    }

    const animation = root.animate(
      [
        {
          opacity: 1,
          transform: 'scale(1)'
        },
        {
          opacity: 0,
          transform: 'scale(1.25, .55)'
        }
      ],
      {
        duration: 300,
        fill: 'forwards'
      }
    );

    animation.onfinish = () => {
      root.style.display = 'none';
    };
  }
}
