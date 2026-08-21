import { Injectable } from '@angular/core';
import { Projectile } from './projectile.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectileService {

  private projectiles: Projectile[] = [];

  private nextId = 0;

  spawnProjectile(
    ownerId: string,
    startX: number,
    startY: number,
    targetX: number,
    targetY: number
  ): void {

    const deltaX = targetX - startX;
    const deltaY = targetY - startY;

    const distance = Math.sqrt(
      deltaX * deltaX +
      deltaY * deltaY
    );

    if (distance === 0) {
      return;
    }

    const projectile: Projectile = {

      id: this.nextId++,
      ownerId,
      type: 'basic',

      x: startX,
      y: startY,

      directionX: deltaX / distance,
      directionY: deltaY / distance,

      speed: 700,
      damage: 10,

      size: 8,
      color: 'blue',

      lifetime: 3,
      age: 0
    };

    this.projectiles.push(projectile);
  }

  update(deltaTime: number): void {

    for (
      let i = this.projectiles.length - 1;
      i >= 0;
      i--
    ) {

      const projectile =
        this.projectiles[i];

      projectile.x +=
        projectile.directionX *
        projectile.speed *
        deltaTime;

      projectile.y +=
        projectile.directionY *
        projectile.speed *
        deltaTime;

      projectile.age += deltaTime;

      if (
        projectile.age >=
        projectile.lifetime
      ) {

        this.projectiles.splice(i, 1);
      }
    }
  }

  getProjectiles(): readonly Projectile[] {
    return this.projectiles;
  }

  removeProjectile(id: number): void {
    const projectileIndex =
      this.projectiles.findIndex(
        projectile => projectile.id === id
      );

    if (projectileIndex !== -1) {
      this.projectiles.splice(projectileIndex, 1);
    }
  }
}