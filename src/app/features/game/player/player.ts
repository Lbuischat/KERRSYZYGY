import {
    Component,
    Inject,
    PLATFORM_ID,
    Output,
    EventEmitter
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-player',
    imports: [],
    templateUrl: './player.html',
    styleUrl: './player.css',
})
export class Player {

    @Output() shoot = new EventEmitter<{
        mouseX: number;
        mouseY: number;
        isCharged: boolean;
    }>();

    @Output() attack =
        new EventEmitter<void>();

    // Avisa o mundo quando o jogador usa a habilidade do Q.
    @Output() skill3 =
        new EventEmitter<void>();

    @Output() skill2 =
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
        if (Date.now() < this.shieldActiveUntil) {
            console.log('SHIELD! Player blocked damage');
            return;
        }

        if (Date.now() < this.dodgeUntil) {
            console.log('DODGE! Player avoided damage');
            return;
        }
        console.log('⚠️ PLAYER TAKE DAMAGE CALLED', amount);
        this.health -= amount;
        if (this.health < 0) {
            this.health = 0;
        }
        console.log(
            'Player HP:',
            this.health
        );
        this.showDamageEffect();
        if (this.health === 0) {
            this.die();
        }
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
    private dodgeUntil = 0;
    private shieldActiveUntil = 0;
    private shieldCooldownUntil = 0;

    public startDodge(duration: number): void {
        this.dodgeUntil = Date.now() + duration;
    }

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
    private isChargedShotReady = false;
    private skill2CooldownUntil = 0;
    private skill3CooldownUntil = 0;

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
    }

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

        // Shield — T
        if (key === 't') {

            event.preventDefault();

            this.useShield();

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

        // LEFT MOUSE — NORMAL ATTACK
        if (event.button === 0) {
            this.isHoldingAttack = true;
            this.isChargedShotReady = false;

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
                }, 3000);

            return;
        }

        // RIGHT MOUSE — PROJECTILE
        if (event.button === 2) {

            event.preventDefault();

            const isCharged = this.isChargedShotReady;

            this.shoot.emit({
                mouseX: event.clientX,
                mouseY: event.clientY,
                isCharged,
            });

            // Um tiro carregado usa toda a carga.
            if (isCharged) {
                this.isChargedShotReady = false;
                this.setButtonInactive('skill1-btn');
                this.changePlayerColor('yellow');
            }

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
        this.isChargedShotReady = false;

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

        // A carga fica pronta depois de segurar o ataque por 3 segundos.
        this.isChargedShotReady = true;

        this.setButtonActive('skill1-btn');

        this.changePlayerColor(
            'turquoise'
        );

    }

    // =========================
    // SKILL 2
    // =========================

    private useSkill2(): void {

        // F só pode ser usado uma vez a cada 5 segundos.
        if (Date.now() < this.skill2CooldownUntil) {
            return;
        }
        this.skill2CooldownUntil = Date.now() + 5000;

        this.skill2.emit();

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

        // Q só pode ser usado uma vez a cada 5 segundos.
        if (Date.now() < this.skill3CooldownUntil) {
            return;
        }
        this.skill3CooldownUntil = Date.now() + 5000;

        // O Player só percebe a tecla. Quem sabe onde está o
        // inimigo e aplica o efeito é o GameWorld.
        this.skill3.emit();

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
    // SHIELD — T
    // =========================

    private useShield(): void {

        if (Date.now() < this.shieldCooldownUntil) {
            return;
        }

        // Active for 3 seconds, then waits 5 more seconds before reuse.
        this.shieldActiveUntil = Date.now() + 3000;
        this.shieldCooldownUntil = Date.now() + 8000;

        this.changePlayerColor('blue');
        console.log('SHIELD ACTIVE!');

        setTimeout(() => {
            if (!this.isHoldingAttack) {
                this.changePlayerColor('red');
            }
        }, 3000);
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
                isSprinting
                    ? this.speed *
                    this.sprintMultiplier
                    : this.speed;

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
        console.log(
            'PLAYER DIED'
        );
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
