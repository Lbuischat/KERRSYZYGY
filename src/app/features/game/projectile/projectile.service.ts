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
    targetY: number,
    isCharged = false,
  ): void {

    const isEnemyProjectile = ownerId === 'enemy';

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
      type: isEnemyProjectile ? 'enemy' : isCharged ? 'charged' : 'basic',

      x: startX,
      y: startY,

      directionX: deltaX / distance,
      directionY: deltaY / distance,

      speed: isEnemyProjectile ? 450 : isCharged ? 550 : 700,
      damage: isEnemyProjectile ? 8 : isCharged ? 30 : 10,

      size: isEnemyProjectile ? 8 : isCharged ? 14 : 8,
      color: isEnemyProjectile ? 'orange' : isCharged ? 'blue' : 'white',

      lifetime: isEnemyProjectile ? 0.8 : isCharged ? 0.5 : 0.3,
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
