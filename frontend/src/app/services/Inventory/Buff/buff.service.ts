import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {
  BuffType,
  ItemBuff
} from '../../../features/game/hud/inventory/inventory-item.model';


// ================================================================
// ACTIVE BUFF
// ================================================================

export interface ActiveBuff {

  id: string;

  type: BuffType;

  value: number;

  remainingDuration?: number;

}


// ================================================================
// BUFF SERVICE
// ================================================================

@Injectable({
  providedIn: 'root'
})
export class BuffService {

  private activeBuffs: ActiveBuff[] = [];

  /*
   * Fires once for buffs with NO duration (e.g. a berry's
   * instant +10 health). These are never added to
   * `activeBuffs` — they're a one-shot effect, not something
   * that needs to be tracked or ticked down over time.
   *
   * Consumers (like Player) subscribe to this and apply the
   * effect immediately.
   */
  private instantBuff$ = new Subject<ActiveBuff>();
  readonly instantBuffApplied$ = this.instantBuff$.asObservable();


  // ==============================================================
  // ADD BUFF
  // ==============================================================

  addBuff(
    buff: ItemBuff
  ): void {

    const buffId =
      `${buff.type}-${Date.now()}-${Math.random()}`;

    const activeBuff: ActiveBuff = {

      id: buffId,

      type: buff.type,

      value: buff.value,

      remainingDuration:
        buff.duration

    };


    // ------------------------------------------------------------
    // INSTANT BUFF (no duration) — apply once, don't track it.
    // ------------------------------------------------------------

    if (buff.duration === undefined) {

      this.instantBuff$.next(
        activeBuff
      );

      console.log(
        '✨ INSTANT BUFF APPLIED:',
        buff
      );

      return;

    }


    // ------------------------------------------------------------
    // ONGOING BUFF (has a duration) — track it, tick it down.
    // ------------------------------------------------------------

    this.activeBuffs.push(
      activeBuff
    );

    console.log(
      '✨ BUFF ADDED:',
      buff
    );

  }


  // ==============================================================
  // REMOVE BUFF
  // ==============================================================

  removeBuff(
    buffId: string
  ): void {

    this.activeBuffs =
      this.activeBuffs.filter(
        buff =>
          buff.id !== buffId
      );

  }


  // ==============================================================
  // GET ACTIVE BUFFS
  // ==============================================================

  getActiveBuffs(): ActiveBuff[] {

    return [
      ...this.activeBuffs
    ];

  }


  // ==============================================================
  // GET TOTAL VALUE FOR TYPE
  // ==============================================================

  getTotalBuffValue(
    type: BuffType
  ): number {

    return this.activeBuffs
      .filter(
        buff =>
          buff.type === type
      )
      .reduce(
        (
          total,
          buff
        ) =>
          total + buff.value,
        0
      );

  }


  // ==============================================================
  // UPDATE BUFFS
  //
  // Must be called every frame by SOMETHING (Player's game loop
  // does this now) or `remainingDuration` never decreases and
  // ongoing buffs never expire.
  // ==============================================================

  update(
    deltaTime: number
  ): void {

    for (
      const buff
      of this.activeBuffs
    ) {

      if (
        buff.remainingDuration ===
        undefined
      ) {

        continue;

      }

      buff.remainingDuration -=
        deltaTime;

    }


    this.activeBuffs =
      this.activeBuffs.filter(
        buff =>
          buff.remainingDuration ===
            undefined ||
          buff.remainingDuration > 0
      );

  }


  // ==============================================================
  // CLEAR ALL
  // ==============================================================

  clearAll(): void {

    this.activeBuffs = [];

  }

}