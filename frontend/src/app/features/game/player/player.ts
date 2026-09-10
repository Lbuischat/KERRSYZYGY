import {
    Component,
    Inject,
    OnDestroy,
    PLATFORM_ID,
    Output,
    EventEmitter,
    inject
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { BuffService } from '../buffs/buff.service';
import { GameStateService } from '../../../services/game-state/game-state.service';

@Component({
    selector: 'app-player',
    imports: [],
    templateUrl: './player.html',
    styleUrl: './player.css',
})
export class Player implements OnDestroy {

    private readonly buffService = inject(BuffService);
    private readonly gameStateService = inject(GameStateService);

    @Output() shoot = new EventEmitter<{
        mouseX: number;
        mouseY: number;
    }>();

    @Output() attack =
        new EventEmitter<void>();

    @Output() died =
        new EventEmitter<void>();

    // =========================
    // POSITION
    // =========================

    private playerX = 300;
    private playerY = 300;

    public getPosition(): {
        x: number;
        y: number;
    } {
        return {
            x: this.playerX,
            y: this.playerY
        };
    }

    public setPosition(
        x: number,
        y: number
    ): void {
        this.playerX = x;
        this.playerY = y;
    }

    public getSize(): number {
        return 40;
    }

    public takeDamage(amount: number): void {
        if (this.isDead) {
            return;
        }
        this.health -= Math.round(
            amount * this.buffService.defenseMultiplier()
        );
        if (this.health < 0) {
            this.health = 0;
        }
        this.showDamageEffect();
        if (this.health === 0) {
            this.die();
        }
    }

    public heal(amount: number): void {
        if (this.isDead || amount <= 0) {
            return;
        }
        this.health = Math.min(
            this.maxHealth,
            this.health + amount
        );
        // The health bar refreshes inside the loop, which is frozen while
        // the inventory is open, so update it here too.
        this.updatePlayerPosition();
    }

    public reset(): void {
        this.isDead = false;
        this.health = this.maxHealth;
        this.stamina = this.maxStamina;
        this.playerX = 300;
        this.playerY = 300;
        this.keys.clear();
        this.isHoldingAttack = false;
        this.isHoldingShoot = false;
        this.changePlayerColor('red');
        this.updatePlayerPosition();
    }

    public getHealthPercentage(): number {
        return (
            this.health /
            this.maxHealth
        ) * 100;
    }

    // =========================
    // SPEED
    // =========================

    private speed = 4;
    private sprintMultiplier = 1.5

    // =========================
    // STAMINA
    // =========================

    private maxStamina = 100;
    private stamina = 100;

    private staminaDrain = 20;
    private staminaRegen = 15;

    // =========================
    // HEALTH
    // =========================

    private maxHealth = 100;
    private health = 100;

    public isDead = false;

    // =========================
    // MOVEMENT
    // =========================

    private keys = new Set<string>();
    private animationFrameId = 0;

    // =========================
    // COMBAT
    // =========================

    private holdTimer?: ReturnType<typeof setTimeout>;
    private isHoldingAttack = false;

    // =========================
    // CONTINUOUS FIRE
    // =========================

    private isHoldingShoot = false;
    private shootCooldown = 0;
    private readonly fireRate = 0.18;

    private lastMouseX = 0;
    private lastMouseY = 0;

    // =========================
    // CONSTRUCTOR
    // =========================

    constructor(
        @Inject(PLATFORM_ID) private platformId: object
    ) {

        if (isPlatformBrowser(this.platformId)) {

            this.setupControls();
            this.startGameLoop();

        }
    }

    // =========================
    // CONTROLS
    // =========================

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

        // Aim follows the cursor while the right button is held down.
        window.addEventListener(
            'mousemove',
            this.handleMouseMove
        );

        // The button can be released outside the game world.
        window.addEventListener(
            'mouseup',
            this.handleWindowMouseUp
        );
    }

    ngOnDestroy(): void {

        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        cancelAnimationFrame(this.animationFrameId);

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

        window.removeEventListener(
            'mousemove',
            this.handleMouseMove
        );

        window.removeEventListener(
            'mouseup',
            this.handleWindowMouseUp
        );
    }

    private handleMouseMove = (
        event: MouseEvent
    ): void => {

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;

    };

    private handleWindowMouseUp = (
        event: MouseEvent
    ): void => {

        if (event.button === 2) {
            this.isHoldingShoot = false;
        }

    };

    private preventContextMenu = (
        event: MouseEvent
    ): void => {

        event.preventDefault();

    };

    // =========================
    // KEYBOARD
    // =========================

    private handleKeyDown = (
        event: KeyboardEvent
    ): void => {

        if (this.isDead || this.gameStateService.paused()) {
            return;
        }

        const key =
            event.key.toLowerCase();

        // Skill 2 — F
        if (key === 'f') {

            event.preventDefault();

            this.useSkill2();

            return;
        }

        // Skill 3 — Q
        if (key === 'q') {

            event.preventDefault();

            this.useSkill3();

            return;
        }

        // Movement + Shift
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

        this.keys.delete(
            event.key.toLowerCase()
        );

    };

    // =========================
    // MOUSE / ATTACK
    // =========================

    handleMouseDown = (
        event: MouseEvent
    ): void => {

        if (this.isDead || this.gameStateService.paused()) {
            return;
        }

        // LEFT MOUSE — NORMAL ATTACK
        if (event.button === 0) {
            this.isHoldingAttack = true;

            this.setButtonActive('attack-btn');

            this.changePlayerColor(
                'yellow'
            );

            console.log('PLAYER EMITTING ATTACK');

            this.attack.emit();

            this.holdTimer =
                setTimeout(() => {
                    if (this.isHoldingAttack) {
                        this.useSkill1();
                    }
                }, 2000);

            return;
        }

        // RIGHT MOUSE — PROJECTILE
        if (event.button === 2) {

            event.preventDefault();

            this.lastMouseX = event.clientX;
            this.lastMouseY = event.clientY;

            // First shot is immediate, the loop keeps firing while held.
            this.isHoldingShoot = true;
            this.shootCooldown = this.fireRate;

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

        if (event.button === 2) {
            this.isHoldingShoot = false;
            return;
        }

        if (event.button !== 0) {
            return;
        }

        this.isHoldingAttack = false;

        this.setButtonInactive('attack-btn');
        this.setButtonInactive('skill1-btn');

        if (this.holdTimer) {

            clearTimeout(
                this.holdTimer
            );

        }

        this.changePlayerColor(
            'red'
        );

    };

    // =========================
    // SKILL 1
    // =========================

    private useSkill1(): void {

        this.setButtonActive('skill1-btn');

        this.changePlayerColor(
            'turquoise'
        );

    }

    // =========================
    // SKILL 2
    // =========================

    private useSkill2(): void {

        this.setButtonActive('skill2-btn');

        this.changePlayerColor(
            'purple'
        );

        setTimeout(() => {

            this.setButtonInactive('skill2-btn');

            if (!this.isHoldingAttack) {

                this.changePlayerColor(
                    'red'
                );

            }

        }, 500);

    }

    // =========================
    // SKILL 3
    // =========================

    private useSkill3(): void {

        this.setButtonActive('skill3-btn');

        this.changePlayerColor(
            'white'
        );

        setTimeout(() => {

            this.setButtonInactive('skill3-btn');

            if (!this.isHoldingAttack) {

                this.changePlayerColor(
                    'red'
                );

            }

        }, 500);

    }

    // =========================
    // GAME LOOP
    // =========================

    private startGameLoop(): void {

        let lastTime =
            performance.now();

        const update = (
            currentTime: number
        ): void => {

            const deltaTime =
                (currentTime - lastTime) / 1000;

            lastTime = currentTime;

            if (
                this.isDead ||
                this.gameStateService.paused()
            ) {

                this.animationFrameId =
                    requestAnimationFrame(update);

                return;
            }

            this.updateContinuousFire(deltaTime);

            let horizontal = 0;
            let vertical = 0;

            // UP
            if (
                this.keys.has('w') ||
                this.keys.has('arrowup')
            ) {

                vertical -= 1;

            }

            // DOWN
            if (
                this.keys.has('s') ||
                this.keys.has('arrowdown')
            ) {

                vertical += 1;

            }

            // LEFT
            if (
                this.keys.has('a') ||
                this.keys.has('arrowleft')
            ) {

                horizontal -= 1;

            }

            // RIGHT
            if (
                this.keys.has('d') ||
                this.keys.has('arrowright')
            ) {

                horizontal += 1;

            }

            // Normalize diagonal movement
            if (
                horizontal !== 0 &&
                vertical !== 0
            ) {

                horizontal *= 0.7071;
                vertical *= 0.7071;

            }

            const isMoving =
                horizontal !== 0 ||
                vertical !== 0;

            const wantsToSprint =
                this.keys.has('shift') &&
                isMoving;

            const isSprinting =
                wantsToSprint &&
                this.stamina > 0;

            // =========================
            // STAMINA
            // =========================

            if (isSprinting) {

                this.stamina -=
                    this.staminaDrain *
                    deltaTime;

                if (this.stamina <= 0) {

                    this.stamina = 0;

                }

            } else {

                this.stamina +=
                    this.staminaRegen *
                    deltaTime;

                if (
                    this.stamina >
                    this.maxStamina
                ) {

                    this.stamina =
                        this.maxStamina;

                }
            }

            // =========================
            // SPEED
            // =========================

            const currentSpeed =
                (isSprinting
                    ? this.speed *
                    this.sprintMultiplier
                    : this.speed) *
                this.buffService.speedMultiplier();

            // =========================
            // MOVE
            // =========================

            this.playerX +=
                horizontal *
                currentSpeed;

            this.playerY +=
                vertical *
                currentSpeed;


            // Keep player inside the world

            const worldWidth = 20 * 128;
            const worldHeight = 20 * 128;

            this.playerX = Math.max(
                0,
                Math.min(
                    this.playerX,
                    worldWidth - this.getSize()
                )
            );

            this.playerY = Math.max(
                0,
                Math.min(
                    this.playerY,
                    worldHeight - this.getSize()
                )
            );

            this.updatePlayerPosition();

            this.animationFrameId =
                requestAnimationFrame(
                    update
                );

        };

        this.animationFrameId =
            requestAnimationFrame(
                update
            );

    }

    // =========================
    // CONTINUOUS FIRE
    // =========================

    private updateContinuousFire(
        deltaTime: number
    ): void {

        if (this.shootCooldown > 0) {

            this.shootCooldown -= deltaTime;

        }

        if (
            !this.isHoldingShoot ||
            this.shootCooldown > 0
        ) {
            return;
        }

        this.shoot.emit({
            mouseX: this.lastMouseX,
            mouseY: this.lastMouseY
        });

        this.shootCooldown = this.fireRate;

    }

    // =========================
    // UPDATE PLAYER
    // =========================

    private showDamageEffect(): void {
        const player =
            document.getElementById(
                'player-character'
            );
        if (!player) {
            return;
        }
        player.style.backgroundColor =
            'white';
        setTimeout(() => {
            player.style.backgroundColor =
                'red';
        }, 80);
        player.animate(
            [
                {
                    transform: 'translate(0px, 0px)'
                },
                {
                    transform: 'translate(-4px, 0px)'
                },
                {
                    transform: 'translate(4px, 0px)'
                },
                {
                    transform: 'translate(-3px, 0px)'
                },
                {
                    transform: 'translate(0px, 0px)'
                }
            ],
            {
                duration: 100,
                easing: 'linear'
            }
        );
    }

    private die(): void {
        this.isDead = true;
        this.keys.clear();
        this.isHoldingShoot = false;
        this.died.emit();
    }

    private updatePlayerPosition(): void {

        const player =
            document.getElementById(
                'player'
            );

        const staminaContainer =
            document.getElementById(
                'stamina-container'
            );

        const staminaBar =
            document.getElementById(
                'stamina-bar'
            );

        const healthBar =
            document.getElementById(
                'player-health-bar'
            );

        // Move player
        if (player) {

            player.style.transform =
                `translate(
                    ${this.playerX}px,
                    ${this.playerY}px
                )`;

        }

        // Show stamina while Shift is held
        if (staminaContainer) {

            const shiftHeld =
                this.keys.has('shift');

            staminaContainer.style.display =
                shiftHeld
                    ? 'block'
                    : 'none';

        }

        // Update stamina
        if (staminaBar) {

            const staminaPercentage =
                (this.stamina /
                    this.maxStamina) *
                100;

            staminaBar.style.width =
                `${staminaPercentage}%`;

        }

        if (healthBar) {
            healthBar.style.width =
                `${this.getHealthPercentage()}%`;
        }

    }

    // =========================
    // CHANGE COLOR
    // =========================

    private changePlayerColor(
        color: string
    ): void {

        const playerCharacter =
            document.getElementById(
                'player-character'
            );

        if (!playerCharacter) {
            return;
        }

        playerCharacter.style.backgroundColor =
            color;

    }

    private setButtonActive(
        buttonId: string
    ): void {
        const button =
            document.getElementById(buttonId);

        if (button) {
            button.classList.add('active');
        }
    }

    private setButtonInactive(
        buttonId: string
    ): void {
        const button =
            document.getElementById(buttonId);

        if (button) {
            button.classList.remove('active');
        }
    }

}