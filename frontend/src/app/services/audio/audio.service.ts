import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private music: HTMLAudioElement | null = null;
  private riverAudio: HTMLAudioElement | null = null;

  musicVolume = 0.5;
  sfxVolume = 0.5;

  environmentVolume = 0.7;
  monstersVolume = 0.7;
  natureVolume = 0.7;

  masterVolume = 1;

  muted = false;

  private readonly sounds: Record<string, string> = {
    // Music
    'music.title': 'audio/music/title.mp3',
    'music.world': 'audio/music/world.mp3',
    'music.combat': 'audio/music/combat.mp3',

    // Player
    'player.attack': 'audio/player/attack.wav',
    'player.dash': 'audio/player/dash.wav',
    'player.hurt': 'audio/player/hurt.wav',

    // Item pickup
    'item.pop1': 'audio/item/pop1.wav',
    'item.pop2': 'audio/item/pop2.wav',
    'item.pop3': 'audio/item/pop3.wav',
    'item.pop4': 'audio/item/pop4.wav',
    'item.pop5': 'audio/item/pop5.wav',

    // Enemy
    'enemy.attack': 'audio/enemy/attack.wav',
    'enemy.death': 'audio/enemy/death.wav',

    // Environment
    'environment.river': 'audio/environment/river.mp3',
    'environment.bush': 'audio/environment/bush.wav',

    // UI
    'ui.click': 'audio/ui/click.wav',
    'ui.open': 'audio/ui/open.wav',
    'ui.close': 'audio/ui/close.wav',
  };

  // ================================================================
  // INDIVIDUAL SOUND VOLUMES
  // ================================================================

  private readonly soundVolumes: Record<string, number> = {
    // Player
    'player.attack': 0.7,
    'player.dash': 0.3,
    'player.hurt': 0.8,

    //items-pick up
    'item.pop1': 0.7,
    'item.pop2': 0.7,
    'item.pop3': 0.7,
    'item.pop4': 0.7,
    'item.pop5': 0.7,

    // Enemy
    'enemy.attack': 0.7,
    'enemy.death': 0.8,

    // Environment
    'environment.bush': 0.7,

    // UI
    'ui.click': 0.5,
    'ui.open': 0.5,
    'ui.close': 0.5,
  };

  // ================================================================
  // SOUND CATEGORY
  // ================================================================

  private getCategoryVolume(sound: string): number {
    if (sound.startsWith('enemy.')) {
      return this.monstersVolume;
    }

    if (sound.startsWith('environment.river')) {
      return this.environmentVolume;
    }

    if (sound.startsWith('environment.')) {
      return this.natureVolume;
    }

    return this.sfxVolume;
  }

  // ================================================================
  // SOUND EFFECTS
  // ================================================================

  playSfx(sound: string): void {
    const path = this.sounds[sound];

    if (!path || this.muted) {
      return;
    }

    const audio = new Audio(path);

    const individualVolume = this.soundVolumes[sound] ?? 1;

    const categoryVolume = this.getCategoryVolume(sound);

    audio.volume = this.masterVolume * categoryVolume * individualVolume;

    audio.play().catch(() => {
      // Browser blocked playback.
    });
  }

  playItemPickup(): void {
    const pops = [
      'item.pop1',
      'item.pop2',
      'item.pop3',
      'item.pop4',
      'item.pop5',
    ];

    const randomIndex = Math.floor(
      Math.random() * pops.length
    );

    this.playSfx(pops[randomIndex]);
  }

  // ================================================================
  // MUSIC
  // ================================================================

  playMusic(sound: string): void {
    const path = this.sounds[sound];

    if (!path) {
      return;
    }

    this.stopMusic();

    this.music = new Audio(path);

    this.music.loop = true;

    this.updateMusicVolume();

    this.music.play().catch(() => {
      // Browser blocked autoplay.
    });
  }

  stopMusic(): void {
    if (!this.music) {
      return;
    }

    this.music.pause();
    this.music.currentTime = 0;
    this.music = null;
  }

  // ================================================================
  // RIVER AMBIENT AUDIO
  // ================================================================

  updateRiverVolume(distance: number): void {
    const hearingDistance = 500;

    if (distance >= hearingDistance || this.muted) {
      if (this.riverAudio) {
        this.riverAudio.volume = 0;
      }

      return;
    }

    if (!this.riverAudio) {
      const path = this.sounds['environment.river'];

      if (!path) {
        return;
      }

      this.riverAudio = new Audio(path);

      this.riverAudio.loop = true;

      this.riverAudio.play().catch(() => {
        // Browser blocked playback.
      });
    }

    const proximity = 1 - distance / hearingDistance;

    this.riverAudio.volume = proximity * this.masterVolume * this.environmentVolume;
  }

  stopRiver(): void {
    if (!this.riverAudio) {
      return;
    }

    this.riverAudio.pause();
    this.riverAudio.currentTime = 0;
    this.riverAudio = null;
  }

  // ================================================================
  // VOLUME
  // ================================================================

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));

    this.updateMusicVolume();

    if (this.riverAudio) {
      // River gets recalculated by the player
      // on the next game frame.
    }
  }

  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));

    this.updateMusicVolume();
  }

  setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  setEnvironmentVolume(volume: number): void {
    this.environmentVolume = Math.max(0, Math.min(1, volume));
  }

  setMonstersVolume(volume: number): void {
    this.monstersVolume = Math.max(0, Math.min(1, volume));
  }

  setNatureVolume(volume: number): void {
    this.natureVolume = Math.max(0, Math.min(1, volume));
  }

  private updateMusicVolume(): void {
    if (!this.music) {
      return;
    }

    this.music.volume = this.muted ? 0 : this.masterVolume * this.musicVolume;
  }

  // ================================================================
  // MUTE
  // ================================================================

  setMuted(muted: boolean): void {
    this.muted = muted;

    this.updateMusicVolume();

    if (this.riverAudio) {
      this.riverAudio.volume = 0;
    }
  }

  toggleMute(): void {
    this.setMuted(!this.muted);
  }

  isMuted(): boolean {
    return this.muted;
  }
}
