import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-enemy',
  imports: [],
  templateUrl: './enemy.html',
  styleUrl: './enemy.css',
})
export class Enemy implements OnInit {

  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  // =========================
  // SPAWN CONFIG
  // =========================

  @Input() startX = 600;
  @Input() startY = 400;
  @Input() maxHealth = 100;
  @Input() speed = 1;
  @Input() size = 40;

  @Output() died = new EventEmitter<void>();

  // =========================
  // RUNTIME STATE
  // =========================

  x = 600;
  y = 400;
  health = 100;
  isDead = false;
  attackCooldown = 0;

  private element: HTMLElement | null = null;

  ngOnInit(): void {
    this.x = this.startX;
    this.y = this.startY;
    this.health = this.maxHealth;

    // Enemies only exist in the browser, but ngOnInit also runs on the server.
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        this.updateVisualPosition();
      });
    }
  }

  // Each enemy owns only the element inside its own host,
  // so a document-wide query would hit the wrong one.
  private getElement(): HTMLElement | null {
    if (!this.element) {
      this.element =
        this.host.nativeElement.querySelector<HTMLElement>('.enemy');
    }

    return this.element;
  }

  // =========================
  // DAMAGE
  // =========================

  takeDamage(amount: number): void {
    if (this.isDead) {
      return;
    }

    this.health -= amount;

    if (this.health < 0) {
      this.health = 0;
    }

    this.triggerHitEffect(amount);

    if (this.health === 0) {
      this.die();
    }
  }

  private die(): void {
    this.isDead = true;

    this.died.emit();

    const enemy = this.getElement();
    if (!enemy) {
      return;
    }

    enemy.animate(
      [
        {
          transform: 'scale(1)',
          opacity: '1'
        },
        {
          transform: 'scale(1.3)',
          opacity: '0'
        }
      ],
      {
        duration: 250,
        easing: 'ease-out'
      }
    );

    setTimeout(() => {
      enemy.remove();
    }, 250);
  }

  getHealthPercentage(): number {
    return (this.health / this.maxHealth) * 100;
  }

  public updateVisualPosition(): void {
    const enemy = this.getElement();
    if (!enemy) {
      return;
    }

    enemy.style.left = `${this.x}px`;
    enemy.style.top = `${this.y}px`;
  }

  public updateHealthBar(): void {
    const enemy = this.getElement();
    if (!enemy) {
      return;
    }

    const healthBar =
      enemy.querySelector<HTMLElement>('.health-bar');
    if (!healthBar) {
      return;
    }

    healthBar.style.width = `${this.getHealthPercentage()}%`;
  }

  triggerHitEffect(damage: number): void {
    const enemy = this.getElement();
    if (!enemy) {
      return;
    }

    enemy.style.backgroundColor = 'white';
    setTimeout(() => {
      enemy.style.backgroundColor = 'purple';
    }, 80);

    // =========================
    // SHAKE
    // =========================

    enemy.animate(
      [
        { transform: 'translate(0px, 0px)' },
        { transform: 'translate(-4px, 0px)' },
        { transform: 'translate(4px, 0px)' },
        { transform: 'translate(-3px, 0px)' },
        { transform: 'translate(0px, 0px)' }
      ],
      {
        duration: 100,
        easing: 'linear'
      }
    );

    // =========================
    // DAMAGE NUMBER
    // =========================

    // The damage number uses world coordinates, so it belongs to the
    // camera-translated layer — the document body would not follow the camera.
    const layer =
      document.getElementById('world-layer') ?? document.body;

    const damageNumber =
      document.createElement('div');
    damageNumber.textContent =
      `-${damage}`;
    damageNumber.style.position =
      'absolute';
    damageNumber.style.left =
      `${this.x + this.size / 2}px`;
    damageNumber.style.top =
      `${this.y - 10}px`;
    damageNumber.style.color =
      'white';
    damageNumber.style.fontWeight =
      'bold';
    damageNumber.style.fontSize =
      '16px';
    damageNumber.style.pointerEvents =
      'none';
    damageNumber.style.zIndex =
      '100';
    layer.appendChild(
      damageNumber
    );

    // =========================
    // FLOAT + FADE
    // =========================

    damageNumber.animate(
      [
        {
          transform: 'translateY(0px)',
          opacity: '1'
        },
        {
          transform: 'translateY(-35px)',
          opacity: '0'
        }
      ],
      {
        duration: 600,
        easing: 'ease-out'
      }
    );

    setTimeout(() => {
      damageNumber.remove();
    }, 600);
  }

}
