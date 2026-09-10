import { Injectable, signal } from '@angular/core';

import { ActiveBuff, BuffKind, InventoryItem } from './buff.model';

@Injectable({
  providedIn: 'root'
})
export class BuffService {

  /** Only for display — the game loop reads the plain array below. */
  readonly active = signal<ActiveBuff[]>([]);

  private buffs: ActiveBuff[] = [];
  private pendingHeal = 0;
  private publishedSignature = '';

  apply(item: InventoryItem): void {
    const buff = item.buff;

    if (!buff) {
      return;
    }

    if (buff.kind === 'heal') {
      this.pendingHeal += buff.amount;
      return;
    }

    // Using the same kind again refreshes it instead of stacking forever.
    this.buffs = [
      ...this.buffs.filter(active => active.kind !== buff.kind),
      {
        kind: buff.kind,
        itemId: item.id,
        amount: buff.amount,
        remainingSeconds: buff.durationSeconds,
      },
    ];

    this.publish();
  }

  update(deltaTime: number): void {
    if (this.buffs.length === 0) {
      return;
    }

    for (const buff of this.buffs) {
      buff.remainingSeconds -= deltaTime;
    }

    this.buffs = this.buffs.filter(buff => buff.remainingSeconds > 0);

    this.publish();
  }

  /** Instant heals wait here until the game loop can hand them to the player. */
  consumeHeal(): number {
    const heal = this.pendingHeal;
    this.pendingHeal = 0;

    return heal;
  }

  speedMultiplier(): number {
    return this.multiplierFor('speed');
  }

  damageMultiplier(): number {
    return this.multiplierFor('damage');
  }

  /** Below 1 it reduces the damage the player takes. */
  defenseMultiplier(): number {
    return this.multiplierFor('defense');
  }

  clear(): void {
    this.buffs = [];
    this.pendingHeal = 0;

    this.publish();
  }

  private multiplierFor(kind: BuffKind): number {
    const buff = this.buffs.find(active => active.kind === kind);

    return buff ? buff.amount : 1;
  }

  // Publishing every frame would re-render the HUD 60 times a second,
  // so the signal only changes when a displayed second changes.
  private publish(): void {
    const signature = this.buffs
      .map(buff => `${buff.kind}:${Math.ceil(buff.remainingSeconds)}`)
      .join('|');

    if (signature === this.publishedSignature) {
      return;
    }

    this.publishedSignature = signature;

    this.active.set(
      this.buffs.map(buff => ({ ...buff }))
    );
  }
}
