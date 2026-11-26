
import {
  Component,
  Inject,
  PLATFORM_ID,
  Output,
  EventEmitter,
  OnDestroy,
  type Signal
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { AudioService } from '../../../services/audio/audio.service';
import {
  GameStateService,
  type PlayerVitals
} from '../../../services/game-state/game-state.service';
import { PlayerService } from '../../../services/player.service';
import { BuffService } from '../../../services/Inventory/Buff/buff.service';

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnDestroy {

  // O HUD e as barras sobre o personagem
  // usam exatamente os mesmos dados.
  public readonly playerVitals: Signal<PlayerVitals>;

  @Output()
  tutorialBoundary = new EventEmitter<void>();

  @Output()
  shoot = new EventEmitter<{
    mouseX: number;
    mouseY: number;
  }>();

  @Output()
  attack = new EventEmitter<void>();

  @Output()
  interact = new EventEmitter<void>();

  // ==========================================
  // MAPA
  // ==========================================

  private readonly MAP_WIDTH = 2560;
  private readonly MAP_HEIGHT = 2560;
  private readonly PLAYABLE_BOUNDARY = 2500;
  private readonly PLAYER_SIZE = 40;
  private readonly TILE_SIZE = 128;

  private readonly riverTiles = new Set([
    '11,0', '12,0',
    '12,1', '13,1',
    '12,2', '13,2',
    '12,3', '13,3', '14,3',
    '12,4', '13,4', '14,4', '15,4',
    '12,5', '13,5', '14,5', '15,5',
    '14,6', '15,6', '16,6',
    '16,7', '17,7', '18,7',
    '16,8', '17,8', '18,8', '19,8',
    '17,9', '18,9', '19,9'
  ]);

  // ==========================================
  // POSIÇÃO
  // ==========================================

  private playerX = 1255;
  private playerY = 1255;

  public getPosition(): { x: number; y: number } {
    return {
      x: this.playerX,
      y: this.playerY
    };
  }

  public setPosition(x: number, y: number): void {
    this.playerX = x;
    this.playerY = y;
  }

  public getSize(): number {
    return this.PLAYER_SIZE;
  }

  private isRiverTile(x: number, y: number): boolean {
    const column = Math.floor(x / this.TILE_SIZE) + 1;
    const row = Math.floor(y / this.TILE_SIZE);
    return this.riverTiles.has(`${column},${row}`);
  }

  private getDistanceToRiver(): number {
    const playerCenterX = this.playerX + this.PLAYER_SIZE / 2;
    const playerCenterY = this.playerY + this.PLAYER_SIZE / 2;

    let closestDistance = Infinity;

    for (const tile of this.riverTiles) {
      const [columnString, rowString] = tile.split(',');
      const column = Number(columnString);
      const row = Number(rowString);

      const tileX = (column - 1) * this.TILE_SIZE;
      const tileY = row * this.TILE_SIZE;
      const tileRight = tileX + this.TILE_SIZE;
      const tileBottom = tileY + this.TILE_SIZE;

      const closestX = Math.max(
        tileX,
        Math.min(playerCenterX, tileRight)
      );

      const closestY = Math.max(
        tileY,
        Math.min(playerCenterY, tileBottom)
      );

      const dx = playerCenterX - closestX;
      const dy = playerCenterY - closestY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < closestDistance) {
        closestDistance = distance;
      }
    }

    return closestDistance;
  }

  private canMoveTo(x: number, y: number): boolean {
    const size = this.PLAYER_SIZE;

    const topLeft = this.isRiverTile(x, y);
    const topRight = this.isRiverTile(x + size - 1, y);
    const bottomLeft = this.isRiverTile(x, y + size - 1);
    const bottomRight = this.isRiverTile(
      x + size - 1,
      y + size - 1
    );

    return !(
      topLeft ||
      topRight ||
      bottomLeft ||
      bottomRight
    );
  }

  // ==========================================
  // MOVIMENTAÇÃO
  // ==========================================

  private speed = 4;
  private sprintMultiplier = 1.5;

  private moving = false;
  private sprinting = false;

  public getIsMoving(): boolean {
    return this.moving;
  }

  public getIsSprinting(): boolean {
    return this.sprinting;
  }

  // ==========================================
  // STAMINA
  // ==========================================

  private maxStamina = 100;
  private stamina = 100;

  private staminaDrain = 20;
  private staminaRegen = 15;

  public getStamina(): number {
    return this.stamina;
  }

  public getStaminaPercentage(): number {
    return this.maxStamina > 0
      ? (this.stamina / this.maxStamina) * 100
      : 0;
  }

  // ==========================================
  // DASH E ESQUIVA
  // ==========================================

  private isDashing = false;
  private dashSpeed = 14;
  private dashStaminaCost = 30;
  private readonly dodgeStaminaCost = 15;

  private activeDashButton:
    'skill2-btn' | 'skill3-btn' = 'skill3-btn';

  private readonly DASH_DISTANCE = this.TILE_SIZE * 2.5;
  private dashRemaining = 0;

  private lastMoveHorizontal = 1;
  private lastMoveVertical = 0;

  // ==========================================
  // VIDA
  // ==========================================

  private maxHealth = 100;
  private health = 100;

  public takeDamage(amount: number): void {
    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      this.health <= 0
    ) {
      return;
    }

    // Esquiva F mantém a invulnerabilidade existente.
    if (
      this.isDashing &&
      this.activeDashButton === 'skill2-btn'
    ) {
      return;
    }

    console.log('⚠️ PLAYER TAKE DAMAGE CALLED', amount);

    this.health = Math.max(0, this.health - amount);

    console.log('Player HP:', this.health);

    // Mostra a barra acima da cabeça por 5 segundos.
    this.healthHudUntil = Date.now() + 5000;
    this.publishVitals(true);
    this.showDamageEffect();

    if (this.health === 0) {
      this.die();
    }
  }

  public heal(amount: number): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    const before = this.health;

    this.health = Math.min(
      this.maxHealth,
      this.health + amount
    );

    console.log(
      '💚 PLAYER HEALED:',
      amount,
      '| HP:',
      this.health
    );

    if (this.health > before) {
      this.healthHudUntil = Date.now() + 3200;
      this.publishVitals(true);
    }

    this.updatePlayerPosition();
  }

  public getHealthPercentage(): number {
    return this.maxHealth > 0
      ? (this.health / this.maxHealth) * 100
      : 0;
  }

  // ==========================================
  // TECLADO / COMBATE
  // ==========================================

  private keys = new Set<string>();
  private animationFrameId = 0;
  private qHeld = false;
  private wasAtBoundary = false;

  private holdTimer?: ReturnType<typeof setTimeout>;
  private isHoldingAttack = false;

  // ==========================================
  // BUFFS E INDICADORES
  // ==========================================

  private buffSubscription?: Subscription;

  private healthHudUntil = 0;
  private staminaHudUntil = 0;
  private lastVitalsPublish = 0;
  private lastLevelTier = -1;

  // ==========================================
  // CONSTRUTOR
  // ==========================================

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private buffService: BuffService,
    private audioService: AudioService,
    private gameStateService: GameStateService,
    private playerService: PlayerService
  ) {
    // Signal substitui o AsyncPipe.
    // Resolve a dependência de imports no template.
    this.playerVitals = toSignal(
      this.gameStateService.playerVitals$,
      { requireSync: true }
    );

    console.log('🟢 PLAYER COMPONENT CREATED');

    this.updateLevelStats();

    this.buffSubscription =
      this.buffService.instantBuffApplied$.subscribe(
        buff => {
          if (buff.type === 'health') {
            this.heal(buff.value);
          }
        }
      );

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener(
        'keydown',
        this.handleKeyDown
      );

      window.addEventListener(
        'keyup',
        this.handleKeyUp
      );

      window.addEventListener(
        'contextmenu',
        this.preventContextMenu
      );

      this.publishVitals(true);
      this.startGameLoop();
    }
  }

  private setupControls(): void {
    window.addEventListener(
      'keydown',
      this.handleKeyDown
    );

    window.addEventListener(
      'keyup',
      this.handleKeyUp
    );

    window.addEventListener(
      'contextmenu',
      this.preventContextMenu
    );
  }

  private preventContextMenu = (
    event: MouseEvent
  ): void => {
    event.preventDefault();
  };

  // ==========================================
  // CONTROLES DO TECLADO
  // ==========================================

  private handleKeyDown = (
    event: KeyboardEvent
  ): void => {
    const key = event.key.toLowerCase();

    // F — Esquiva
    if (key === 'f') {
      event.preventDefault();

      if (!event.repeat) {
        this.useSkill2();
      }

      return;
    }

    // Q — Dash
    if (key === 'q') {
      event.preventDefault();

      if (!this.qHeld) {
        this.qHeld = true;
        this.useSkill3();
      }

      return;
    }

    // E — Interação com arbustos
    if (key === 'e') {
      event.preventDefault();

      if (event.repeat) {
        return;
      }

      this.interact.emit();
      return;
    }

    // Movimentação
    if (
      key === 'w' ||
      key === 'a' ||
      key === 's' ||
      key === 'd' ||
      key === 'arrowup' ||
      key === 'arrowdown' ||
      key === 'arrowleft' ||
      key === 'arrowright' ||
      key === 'shift'
    ) {
      event.preventDefault();
      this.keys.add(key);
    }
  };

  private handleKeyUp = (
    event: KeyboardEvent
  ): void => {
    const key = event.key.toLowerCase();

    this.keys.delete(key);

    if (key === 'q') {
      this.qHeld = false;
    }
  };

  // ==========================================
  // MOUSE / ATAQUES
  // ==========================================

  handleMouseDown = (
    event: MouseEvent
  ): void => {
    if (event.button === 0) {
      this.isHoldingAttack = true;
      this.setButtonActive('attack-btn');
      this.changePlayerColor('yellow');

      console.log('PLAYER EMITTING ATTACK');

      this.attack.emit();

      this.holdTimer = setTimeout(() => {
        if (this.isHoldingAttack) {
          this.useSkill1();
        }
      }, 2000);

      return;
    }

    if (event.button === 2) {
      event.preventDefault();

      this.shoot.emit({
        mouseX: event.clientX,
        mouseY: event.clientY
      });

      return;
    }
  };

  handleMouseUp = (
    event: MouseEvent
  ): void => {
    if (event.button !== 0) {
      return;
    }

    this.isHoldingAttack = false;

    this.setButtonInactive('attack-btn');
    this.setButtonInactive('skill1-btn');

    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
    }

    this.changePlayerColor('red');
  };

  // ==========================================
  // HABILIDADE 1
  // ==========================================

  private useSkill1(): void {
    this.setButtonActive('skill1-btn');
    this.changePlayerColor('turquoise');
  }

  // ==========================================
  // HABILIDADE 2 — F
  // ==========================================

  private useSkill2(): void {
    if (
      this.isDashing ||
      this.stamina < this.dodgeStaminaCost
    ) {
      return;
    }

    this.stamina -= this.dodgeStaminaCost;

    this.staminaHudUntil = Date.now() + 1800;
    this.publishVitals(true);

    this.isDashing = true;
    this.dashRemaining = this.TILE_SIZE * 0.8;
    this.activeDashButton = 'skill2-btn';

    this.setButtonActive(this.activeDashButton);
    this.changePlayerColor('purple');
    this.audioService.playSfx('player.dash');
  }

  // ==========================================
  // HABILIDADE 3 — Q
  // ==========================================

  private useSkill3(): void {
    if (this.isDashing) {
      return;
    }

    if (this.stamina < this.dashStaminaCost) {
      return;
    }

    this.stamina -= this.dashStaminaCost;

    this.staminaHudUntil = Date.now() + 1800;
    this.publishVitals(true);

    this.isDashing = true;
    this.audioService.playSfx('player.dash');

    this.dashRemaining = this.DASH_DISTANCE;
    this.activeDashButton = 'skill3-btn';

    this.setButtonActive('skill3-btn');
    this.changePlayerColor('white');
  }

  // ==========================================
  // LOOP PRINCIPAL DO JOGO
  // ==========================================

  private startGameLoop(): void {
    let lastTime = performance.now();

    const update = (currentTime: number): void => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Atualização dos buffs e níveis.
      this.buffService.update(deltaTime);
      this.updateLevelStats();

      let horizontal = 0;
      let vertical = 0;

      if (
        this.keys.has('w') ||
        this.keys.has('arrowup')
      ) {
        vertical -= 1;
      }

      if (
        this.keys.has('s') ||
        this.keys.has('arrowdown')
      ) {
        vertical += 1;
      }

      if (
        this.keys.has('a') ||
        this.keys.has('arrowleft')
      ) {
        horizontal -= 1;
      }

      if (
        this.keys.has('d') ||
        this.keys.has('arrowright')
      ) {
        horizontal += 1;
      }

      // Normaliza o movimento diagonal.
      if (horizontal !== 0 && vertical !== 0) {
        horizontal *= 0.7071;
        vertical *= 0.7071;
      }

      this.moving =
        horizontal !== 0 || vertical !== 0;

      if (this.moving) {
        this.lastMoveHorizontal = horizontal;
        this.lastMoveVertical = vertical;
      }

      const wantsToSprint =
        this.keys.has('shift') && this.moving;

      this.sprinting =
        wantsToSprint && this.stamina > 0;

      // ======================================
      // GASTO / REGENERAÇÃO DA STAMINA
      // ======================================

      if (this.sprinting) {
        this.staminaHudUntil = Date.now() + 1600;

        this.stamina -= this.staminaDrain * deltaTime;

        if (this.stamina <= 0) {
          this.stamina = 0;
          this.sprinting = false;
        }
      } else {
        this.stamina += this.staminaRegen * deltaTime;

        if (this.stamina > this.maxStamina) {
          this.stamina = this.maxStamina;
        }
      }

      const currentSpeed = this.sprinting
        ? this.speed * this.sprintMultiplier
        : this.speed;

      // ======================================
      // DASH
      // ======================================

      if (this.isDashing) {
        const dashStep = Math.min(
          this.dashSpeed,
          this.dashRemaining
        );

        const nextX =
          this.playerX +
          this.lastMoveHorizontal * dashStep;

        const nextY =
          this.playerY +
          this.lastMoveVertical * dashStep;

        this.playerX = nextX;
        this.playerY = nextY;

        this.dashRemaining -= dashStep;

        if (this.dashRemaining <= 0) {
          this.dashRemaining = 0;
          this.isDashing = false;

          this.setButtonInactive(
            this.activeDashButton
          );

          if (!this.isHoldingAttack) {
            this.changePlayerColor('red');
          }
        }
      } else {
        // ====================================
        // MOVIMENTAÇÃO NORMAL + COLISÃO
        // ====================================

        const nextX =
          this.playerX + horizontal * currentSpeed;

        const nextY =
          this.playerY + vertical * currentSpeed;

        if (this.canMoveTo(nextX, this.playerY)) {
          this.playerX = nextX;
        }

        if (this.canMoveTo(this.playerX, nextY)) {
          this.playerY = nextY;
        }
      }

      // ======================================
      // LIMITES DO MAPA
      // ======================================

      let hitMapBoundary = false;

      if (this.playerX < 0) {
        this.playerX = 0;
        hitMapBoundary = true;
      }

      if (this.playerX >= this.PLAYABLE_BOUNDARY) {
        this.playerX = this.PLAYABLE_BOUNDARY;
        hitMapBoundary = true;
      }

      if (this.playerY < 0) {
        this.playerY = 0;
        hitMapBoundary = true;
      }

      if (this.playerY >= this.PLAYABLE_BOUNDARY) {
        this.playerY = this.PLAYABLE_BOUNDARY;
        hitMapBoundary = true;
      }

      if (hitMapBoundary && !this.wasAtBoundary) {
        console.log('PLAYER REACHED MAP BOUNDARY');
        this.tutorialBoundary.emit();
      }

      this.wasAtBoundary = hitMapBoundary;

      // Som ambiente do rio.
      const riverDistance = this.getDistanceToRiver();
      this.audioService.updateRiverVolume(riverDistance);

      // Atualiza o personagem e as barras.
      this.updatePlayerPosition();

      this.animationFrameId =
        requestAnimationFrame(update);
    };

    this.animationFrameId =
      requestAnimationFrame(update);
  }

  // ==========================================
  // EFEITO DE DANO
  // ==========================================

  private showDamageEffect(): void {
    const player = document.getElementById(
      'player-character'
    );

    if (!player) {
      return;
    }

    player.classList.add('player-hit');

    setTimeout(() => {
      player.classList.remove('player-hit');
    }, 200);

    player.style.backgroundColor = 'white';

    setTimeout(() => {
      player.style.backgroundColor = 'red';
    }, 80);

    player.animate(
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
  }

  // ==========================================
  // MORTE
  // ==========================================

  private die(): void {
    console.log('PLAYER DIED');
  }

  // ==========================================
  // ATRIBUTOS A CADA 7 NÍVEIS
  // ==========================================

  private updateLevelStats(): void {
    const level = Math.max(
      0,
      this.playerService.level()
    );

    const tier = Math.floor(level / 7);

    if (tier === this.lastLevelTier) {
      return;
    }

    const previousHealthMax = this.maxHealth;
    const previousStaminaMax = this.maxStamina;

    this.maxHealth = 100 + tier * 10;
    this.maxStamina = 100 + tier * 5;

    if (this.lastLevelTier < 0) {
      this.health = this.maxHealth;
      this.stamina = this.maxStamina;
    } else {
      this.health = Math.max(
        0,
        Math.min(
          this.maxHealth,
          this.health +
            (this.maxHealth - previousHealthMax)
        )
      );

      this.stamina = Math.max(
        0,
        Math.min(
          this.maxStamina,
          this.stamina +
            (this.maxStamina - previousStaminaMax)
        )
      );

      if (tier > this.lastLevelTier) {
        this.healthHudUntil = Date.now() + 4500;
        this.staminaHudUntil = Date.now() + 4500;
      }
    }

    this.lastLevelTier = tier;
    this.publishVitals(true);
  }

  // ==========================================
  // SINCRONIZAÇÃO DE VIDA E STAMINA
  // ==========================================

  private publishVitals(force = false): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const now = Date.now();

    // Limita atualizações para evitar sobrecarregar o HUD.
    if (
      !force &&
      now - this.lastVitalsPublish < 125
    ) {
      return;
    }

    this.lastVitalsPublish = now;

    const healthRatio = this.maxHealth > 0
      ? this.health / this.maxHealth
      : 0;

    const staminaRatio = this.maxStamina > 0
      ? this.stamina / this.maxStamina
      : 0;

    // ======================================
    // EFEITOS DE PERIGO NO PERSONAGEM
    // ======================================

    const sprite = document.getElementById(
      'player-character'
    );

    if (sprite) {
      sprite.classList.toggle(
        'player-danger',
        this.health > 0 && healthRatio <= 0.4
      );

      sprite.classList.toggle(
        'player-critical',
        this.health > 0 && healthRatio <= 0.25
      );

      sprite.classList.toggle(
        'player-exhausted',
        this.moving && staminaRatio <= 0.22
      );
    }

    // O HUD sempre mostra as duas barras.
    // Essas flags controlam apenas as barras
    // temporárias acima da cabeça.

    const showOverheadHealth =
      now < this.healthHudUntil;

    const showOverheadStamina =
      this.sprinting ||
      this.isDashing ||
      now < this.staminaHudUntil;

    this.gameStateService.setPlayerVitals({
      health: this.health,
      maxHealth: this.maxHealth,
      stamina: this.stamina,
      maxStamina: this.maxStamina,
      showHealth: showOverheadHealth,
      showStamina: showOverheadStamina
    });
  }

  // ==========================================
  // POSIÇÃO DO PLAYER
  // ==========================================

  private updatePlayerPosition(): void {
    const player = document.getElementById('player');

    if (player) {
      player.style.transform =
        `translate(${this.playerX}px, ${this.playerY}px)`;
    }

    this.publishVitals();
  }

  // ==========================================
  // CORES DO PERSONAGEM
  // ==========================================

  private changePlayerColor(color: string): void {
    const playerCharacter =
      document.getElementById('player-character');

    if (playerCharacter) {
      playerCharacter.style.backgroundColor = color;
    }
  }

  // ==========================================
  // ESTADO DOS BOTÕES
  // ==========================================

  private setButtonActive(buttonId: string): void {
    const button = document.getElementById(buttonId);

    if (button) {
      button.classList.add('active');
    }
  }

  private setButtonInactive(buttonId: string): void {
    const button = document.getElementById(buttonId);

    if (button) {
      button.classList.remove('active');
    }
  }

  // ==========================================
  // LIMPEZA
  // ==========================================

  ngOnDestroy(): void {
    this.buffSubscription?.unsubscribe();

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener(
      'keydown',
      this.handleKeyDown
    );

    window.removeEventListener(
      'keyup',
      this.handleKeyUp
    );

    window.removeEventListener(
      'contextmenu',
      this.preventContextMenu
    );

    if (this.holdTimer) {
      clearTimeout(this.holdTimer);
    }
  }
}
