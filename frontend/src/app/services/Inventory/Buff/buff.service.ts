import { Injectable } from '@angular/core';

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


  // ==============================================================
  // ADD BUFF
  // ==============================================================

  addBuff(
    buff: ItemBuff
  ): void {

    const buffId =
      `${buff.type}-${Date.now()}-${Math.random()}`;


    this.activeBuffs.push({

      id: buffId,

      type: buff.type,

      value: buff.value,

      remainingDuration:
        buff.duration

    });

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