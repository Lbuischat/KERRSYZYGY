import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-enemy',
  imports: [],
  templateUrl: './enemy.html',
  styleUrl: './enemy.css',
})
export class Enemy {

  constructor() {
    if (typeof document !== 'undefined') {
      requestAnimationFrame(() => {
        this.updateVisualPosition();
      });
    }
  }

  @Input() x = 600;
  @Input() y = 400;

  // =========================
  // HEALTH
  // =========================

  maxHealth = 100;
  health = 100;
  isDead = false;

  // =========================
  // SIZE
  // =========================

  size = 40;

  // =========================
  // MOVEMENT
  // =========================

  speed = 1;

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

    console.log(
      'Enemy HP:',
      this.health
    );

    this.triggerHitEffect(amount);

    if (this.health === 0) {
      this.die();
    }
  }

  private die(): void {
    this.isDead = true;

    const enemy =
      document.querySelector(
        '.enemy'
      ) as HTMLElement | null;
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
    const enemy =
      document.querySelector<HTMLElement>('.enemy');
    if (!enemy) {
      return;
    }
    enemy.style.left =
      `${this.x}px`;
    enemy.style.top =
      `${this.y}px`;
  }

  triggerHitEffect(damage: number): void {
    const enemy =
      document.querySelector<HTMLElement>('.enemy');
    if (!enemy) {
      return;
    }

    enemy.style.backgroundColor =
      'white';
    setTimeout(() => {
      enemy.style.backgroundColor =
        'purple';
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
    document.body.appendChild(
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