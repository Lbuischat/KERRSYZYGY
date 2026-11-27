import { Injectable, inject } from '@angular/core';
import { PlayerService } from '../player.service';
import { BuffService } from './Buff/buff.service';
import { UpgradeService } from './upgrade.service';

// Interface mínima: não altera os controles, o HUD ou a física do Player.
export interface ItemEffectsPlayerBridge {
  health: number;
  stamina: number;
  maxHealth: number;
  maxStamina: number;
  heal(amount: number): void;
}

@Injectable({ providedIn: 'root' })
export class ItemEffectsRuntimeService {
  private readonly buffs = inject(BuffService);
  private readonly upgrades = inject(UpgradeService);
  private readonly playerService = inject(PlayerService);
  private currentPlayer: ItemEffectsPlayerBridge | null = null;

  constructor() {
    // O Player original trata cura instantânea. Aqui complementamos
    // apenas a recuperação de stamina, que estava sem conexão.
    this.buffs.instantBuffApplied$.subscribe(buff => {
      if (buff.type !== 'stamina' || !this.currentPlayer) return;
      const p = this.currentPlayer;
      p.stamina = Math.min(p.maxStamina, p.stamina + Math.max(0, buff.value));
    });
  }

  get playerVitals(): ItemEffectsPlayerBridge | null { return this.currentPlayer; }

  tickPlayer(player: ItemEffectsPlayerBridge, deltaSeconds: number): void {
    this.currentPlayer = player;
    const level = Math.max(0, this.playerService.level());
    const tier = Math.floor(level / 7);
    const targetHpMax = 100 + tier * 10 + this.upgrades.get('maxHealth');
    const targetStaminaMax = 100 + tier * 5 + this.upgrades.get('maxStamina');

    if (player.maxHealth < targetHpMax) {
      const gained = targetHpMax - player.maxHealth;
      player.maxHealth = targetHpMax;
      player.health = Math.min(player.maxHealth, player.health + gained);
    }
    if (player.maxStamina < targetStaminaMax) {
      const gained = targetStaminaMax - player.maxStamina;
      player.maxStamina = targetStaminaMax;
      player.stamina = Math.min(player.maxStamina, player.stamina + gained);
    }

    const dt = Number.isFinite(deltaSeconds) ? Math.max(0, Math.min(0.1, deltaSeconds)) : 0;
    const regeneration = Math.max(0, Math.min(10, this.buffs.getTotalBuffValue('health')));
    if (dt > 0 && regeneration > 0 && player.health > 0 && player.health < player.maxHealth) {
      player.heal(regeneration * dt);
    }
  }

  speedMultiplier(): number {
    const permanent = this.upgrades.get('speed');
    const temporary = Math.min(0.3, Math.max(0, this.buffs.getTotalBuffValue('speed')));
    return 1 + permanent + temporary;
  }

  damage(base: number): number {
    const permanent = this.upgrades.get('damage');
    const temporary = Math.min(0.5, Math.max(0, this.buffs.getTotalBuffValue('damage')));
    return Math.max(1, Math.round(base * (1 + permanent + temporary) * 100) / 100);
  }
}
