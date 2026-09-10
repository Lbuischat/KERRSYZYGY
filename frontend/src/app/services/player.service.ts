import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface PlayerProfile {
  username: string;
  gender: string;
  pronouns: string;
  birthday: string;
  language: string;
  characterName: string;
  level: number;
  xp: number;
  worldLevel: number;
  receiveBirthdayEmails: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  private readonly storageKey = 'playerProfile';
  private readonly platformId = inject(PLATFORM_ID);

  profile: PlayerProfile = {
    username: '',
    gender: '',
    pronouns: '',
    birthday: '',
    language: '',
    characterName: '',
    level: 1,
    xp: 0,
    worldLevel: 1,
    receiveBirthdayEmails: false,
  };

  constructor() {
    this.loadProfile();
  }


  /* =========================================================
     SAVE PROFILE
     ========================================================= */

  saveProfile(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.profile)
    );
  }


  /* =========================================================
     LOAD PROFILE
     ========================================================= */

  loadProfile(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const savedProfile = localStorage.getItem(
      this.storageKey
    );

    if (!savedProfile) {
      return;
    }

    try {
      const parsedProfile = JSON.parse(savedProfile);

      this.profile = {
        ...this.profile,
        ...parsedProfile,
      };

    } catch {
      console.warn(
        'Could not load saved player profile.'
      );
    }
  }


  /* =========================================================
     SET WORLD LEVEL
     ========================================================= */

  setWorldLevel(level: number): void {
    this.profile.worldLevel = Math.max(1, level);

    this.saveProfile();
  }


  /* =========================================================
     INCREASE WORLD LEVEL
     ========================================================= */

  increaseWorldLevel(): void {
    this.profile.worldLevel++;

    this.saveProfile();
  }


  /* =========================================================
     CLEAR PROFILE
     ========================================================= */

  clearProfile(): void {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.storageKey);
    }

    this.profile = {
      username: '',
      gender: '',
      pronouns: '',
      birthday: '',
      language: '',
      characterName: '',
      level: 1,
      xp: 0,
      worldLevel: 1,
      receiveBirthdayEmails: false,
    };
  }
}