export interface Projectile {

  // =========================
  // IDENTITY
  // =========================

  id: number;

  ownerId: string;

  type: string;

  // =========================
  // POSITION
  // =========================

  x: number;
  y: number;

  // =========================
  // DIRECTION
  // =========================

  directionX: number;
  directionY: number;

  // =========================
  // STATS
  // =========================

  speed: number;
  damage: number;

  // =========================
  // VISUAL
  // =========================

  size: number;
  color: string;

  // =========================
  // LIFETIME
  // =========================

  lifetime: number;
  age: number;
}