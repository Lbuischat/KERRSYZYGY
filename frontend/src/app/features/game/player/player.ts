import {
    Component,
    Inject,
    PLATFORM_ID,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

import { BuffService } from '../../../services/Inventory/Buff/buff.service';

@Component({
    selector: 'app-player',
    imports: [],
    templateUrl: './player.html',
    styleUrl: './player.css',
})
export class Player implements OnDestroy {

    // ================================================================
    // EVENTS
    // ================================================================

    @Output() tutorialBoundary = new EventEmitter<void>();

    @Output()
    shoot = new EventEmitter<{
        mouseX: number;
        mouseY: number;
    }>();

    @Output()
    attack = new EventEmitter<void>();

    @Output()
    interact = new EventEmitter<void>();


    // ================================================================
    // MAP / PLAYER CONSTANTS
    // ================================================================

    private readonly MAP_WIDTH = 2560;
    private readonly MAP_HEIGHT = 2560;

    private readonly PLAYABLE_BOUNDARY = 2500;

    private readonly PLAYER_SIZE = 40;

    private readonly TILE_SIZE = 128;

    private readonly riverTiles = new Set([
        // Row 0
        '11,0',
        '12,0',

        // Row 1
        '12,1',
        '13,1',

        // Row 2
        '12,2',
        '13,2',

        // Row 3
        '12,3',
        '13,3',
        '14,3',

        // Row 4
        '12,4',
        '13,4',
        '14,4',
        '15,4',

        // Row 5
        '12,5',
        '13,5',
        '14,5',
        '15,5',

        // Row 6
        '14,6',
        '15,6',
        '16,6',

        // Row 7
        '16,7',
        '17,7',
        '18,7',

        // Row 8
        '16,8',
        '17,8',
        '18,8',
        '19,8',

        // Row 9
        '17,9',
        '18,9',
        '19,9',
    ]);


    // ================================================================
    // POSITION
    // ================================================================

    private playerX = 1255;
    private playerY = 1255;

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
        return this.PLAYER_SIZE;
    }

    private isRiverTile(
        x: number,
        y: number
    ): boolean {

        const column =
            Math.floor(
                x / this.TILE_SIZE
            ) + 1;

        const row =
            Math.floor(
                y / this.TILE_SIZE
            );

        return this.riverTiles.has(
            `${column},${row}`
        );
    }

    private canMoveTo(
        x: number,
        y: number
    ): boolean {

        const size =
            this.PLAYER_SIZE;

        const topLeft =
            this.isRiverTile(
                x,
                y
            );

        const topRight =
            this.isRiverTile(
                x + size - 1,
                y
            );

        const bottomLeft =
            this.isRiverTile(
                x,
                y + size - 1
            );

        const bottomRight =
            this.isRiverTile(
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


    // ================================================================
    // SPEED
    // ================================================================

    private speed = 4;
    private sprintMultiplier = 1.5;


    // ================================================================
    // STAMINA
    // ================================================================

    private maxStamina = 100;
    private stamina = 100;

    private staminaDrain = 20;
    private staminaRegen = 15;


    // ================================================================
    // TUTORIAL STATE
    // ================================================================

    /*
     * These values describe what the player is ACTUALLY doing.
     *
     * The tutorial reads these values instead of listening for
     * keyboard input itself.
     */

    private moving = false;
    private sprinting = false;


    /*
     * Tutorial accessors.
     *
     * The tutorial can call:
     *
     * player.getIsMoving()
     * player.getIsSprinting()
     * player.getStamina()
     */

    public getIsMoving(): boolean {
        return this.moving;
    }

    public getIsSprinting(): boolean {
        return this.sprinting;
    }

    public getStamina(): number {
        return this.stamina;
    }

    public getStaminaPercentage(): number {
        return (
            this.stamina /
            this.maxStamina
        ) * 100;
    }


    // ================================================================
    // DASH
    // ================================================================

    private isDashing = false;

    private dashSpeed = 14;
    private dashStaminaCost = 30;

    private readonly DASH_DISTANCE =
        this.TILE_SIZE * 2.5;

    private dashRemaining = 0;

    /*
     * Last direction the player moved.
     * Used when Q is pressed without movement input.
     */
    private lastMoveHorizontal = 1;
    private lastMoveVertical = 0;


    // ================================================================
    // HEALTH
    // ================================================================

    private maxHealth = 100;
    private health = 100;

    public takeDamage(amount: number): void {

        console.log(
            '⚠️ PLAYER TAKE DAMAGE CALLED',
            amount
        );

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

    public heal(amount: number): void {

        this.health += amount;

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }

        console.log(
            '💚 PLAYER HEALED:',
            amount,
            '| HP:',
            this.health
        );

        this.updatePlayerPosition();
    }

    public getHealthPercentage(): number {
        return (
            this.health /
            this.maxHealth
        ) * 100;
    }


    // ================================================================
    // MOVEMENT
    // ================================================================

    private keys = new Set<string>();

    private animationFrameId = 0;

    private qHeld = false;

    private wasAtBoundary = false;


    // ================================================================
    // COMBAT
    // ================================================================

    private holdTimer?: ReturnType<typeof setTimeout>;

    private isHoldingAttack = false;


    // ================================================================
    // BUFFS
    // ================================================================

    private buffSubscription?: Subscription;


    // ================================================================
    // CONSTRUCTOR
    // ================================================================

    constructor(
        @Inject(PLATFORM_ID)
        private platformId: object,

        private buffService: BuffService
    ) {

        console.log(
            '🟢 PLAYER COMPONENT CREATED'
        );

        this.buffSubscription =
            this.buffService.instantBuffApplied$.subscribe(
                (buff) => {

                    if (buff.type === 'health') {

                        this.heal(
                            buff.value
                        );

                    }

                }
            );

        if (
            isPlatformBrowser(
                this.platformId
            )
        ) {

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

            this.startGameLoop();
        }
    }


    // ================================================================
    // CONTROLS
    // ================================================================

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


    // ================================================================
    // KEYBOARD
    // ================================================================

    private handleKeyDown = (
        event: KeyboardEvent
    ): void => {

        const key =
            event.key.toLowerCase();


        // ------------------------------------------------------------
        // SKILL 2 — F
        // ------------------------------------------------------------

        if (key === 'f') {

            event.preventDefault();

            this.useSkill2();

            return;
        }


        // ------------------------------------------------------------
        // SKILL 3 — Q
        // ------------------------------------------------------------

        if (key === 'q') {

            event.preventDefault();

            if (!this.qHeld) {

                this.qHeld = true;

                this.useSkill3();

            }

            return;
        }


        // ------------------------------------------------------------
        // INTERACT — E
        // ------------------------------------------------------------

        if (key === 'e') {

            event.preventDefault();

            this.interact.emit();

            return;
        }


        // ------------------------------------------------------------
        // MOVEMENT + SHIFT
        // ------------------------------------------------------------

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

        const key =
            event.key.toLowerCase();

        this.keys.delete(key);

        if (key === 'q') {

            this.qHeld = false;

        }

    };


    // ================================================================
    // MOUSE / ATTACK
    // ================================================================

    handleMouseDown = (
        event: MouseEvent
    ): void => {

        // ------------------------------------------------------------
        // LEFT MOUSE — NORMAL ATTACK
        // ------------------------------------------------------------

        if (event.button === 0) {

            this.isHoldingAttack = true;

            this.setButtonActive(
                'attack-btn'
            );

            this.changePlayerColor(
                'yellow'
            );

            console.log(
                'PLAYER EMITTING ATTACK'
            );

            /*
             * The tutorial listens to this event.
             * This fires when the player actually performs
             * a basic attack.
             */
            this.attack.emit();

            this.holdTimer =
                setTimeout(() => {

                    if (
                        this.isHoldingAttack
                    ) {

                        this.useSkill1();

                    }

                }, 2000);

            return;
        }


        // ------------------------------------------------------------
        // RIGHT MOUSE — PROJECTILE
        // ------------------------------------------------------------

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

        this.setButtonInactive(
            'attack-btn'
        );

        this.setButtonInactive(
            'skill1-btn'
        );

        if (this.holdTimer) {

            clearTimeout(
                this.holdTimer
            );

        }

        this.changePlayerColor(
            'red'
        );

    };


    // ================================================================
    // SKILL 1
    // ================================================================

    private useSkill1(): void {

        this.setButtonActive(
            'skill1-btn'
        );

        this.changePlayerColor(
            'turquoise'
        );

    }


    // ================================================================
    // SKILL 2
    // ================================================================

    private useSkill2(): void {

        this.setButtonActive(
            'skill2-btn'
        );

        this.changePlayerColor(
            'purple'
        );

        setTimeout(() => {

            this.setButtonInactive(
                'skill2-btn'
            );

            if (!this.isHoldingAttack) {

                this.changePlayerColor(
                    'red'
                );

            }

        }, 500);

    }


    // ================================================================
    // SKILL 3
    // ================================================================

    private useSkill3(): void {

        if (this.isDashing) {
            return;
        }

        if (
            this.stamina <
            this.dashStaminaCost
        ) {
            return;
        }

        this.stamina -=
            this.dashStaminaCost;

        this.isDashing = true;

        this.dashRemaining =
            this.DASH_DISTANCE;

        this.setButtonActive(
            'skill3-btn'
        );

        this.changePlayerColor(
            'white'
        );

    }


    // ================================================================
    // GAME LOOP
    // ================================================================

    private startGameLoop(): void {

        let lastTime =
            performance.now();

        const update = (
            currentTime: number
        ): void => {

            const deltaTime =
                (
                    currentTime -
                    lastTime
                ) / 1000;

            lastTime =
                currentTime;


            // ========================================================
            // BUFFS
            // ========================================================

            this.buffService.update(
                deltaTime
            );


            // ========================================================
            // MOVEMENT INPUT
            // ========================================================

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


            // ========================================================
            // NORMALIZE DIAGONAL MOVEMENT
            // ========================================================

            if (
                horizontal !== 0 &&
                vertical !== 0
            ) {

                horizontal *= 0.7071;

                vertical *= 0.7071;

            }


            // ========================================================
            // ACTUAL MOVEMENT STATE
            // ========================================================

            /*
             * This is the REAL movement state of the player.
             *
             * Tutorial reads this instead of checking keyboard
             * input itself.
             */

            this.moving =
                horizontal !== 0 ||
                vertical !== 0;


            if (this.moving) {

                this.lastMoveHorizontal =
                    horizontal;

                this.lastMoveVertical =
                    vertical;

            }


            // ========================================================
            // ACTUAL SPRINT STATE
            // ========================================================

            const wantsToSprint =
                this.keys.has('shift') &&
                this.moving;

            /*
             * This is the REAL sprint state.
             *
             * Shift alone is NOT enough.
             *
             * The player must:
             *
             * 1. Hold Shift
             * 2. Actually be moving
             * 3. Have stamina remaining
             */

            this.sprinting =
                wantsToSprint &&
                this.stamina > 0;


            // ========================================================
            // STAMINA
            // ========================================================

            if (this.sprinting) {

                this.stamina -=
                    this.staminaDrain *
                    deltaTime;

                if (
                    this.stamina <= 0
                ) {

                    this.stamina = 0;

                    /*
                     * The player is no longer sprinting once
                     * their stamina reaches zero.
                     */
                    this.sprinting = false;

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


            // ========================================================
            // SPEED
            // ========================================================

            const currentSpeed =
                this.sprinting
                    ? this.speed *
                    this.sprintMultiplier
                    : this.speed;


            // ========================================================
            // MOVEMENT / DASH
            // ========================================================

            if (this.isDashing) {

                const dashStep =
                    Math.min(
                        this.dashSpeed,
                        this.dashRemaining
                    );

                const nextX =
                    this.playerX +
                    this.lastMoveHorizontal *
                    dashStep;

                const nextY =
                    this.playerY +
                    this.lastMoveVertical *
                    dashStep;

                this.playerX =
                    nextX;

                this.playerY =
                    nextY;

                this.dashRemaining -=
                    dashStep;

                if (
                    this.dashRemaining <= 0
                ) {

                    this.dashRemaining = 0;

                    this.isDashing = false;

                    this.setButtonInactive(
                        'skill3-btn'
                    );

                    if (
                        !this.isHoldingAttack
                    ) {

                        this.changePlayerColor(
                            'red'
                        );

                    }

                }

            } else {

                const nextX =
                    this.playerX +
                    horizontal *
                    currentSpeed;

                const nextY =
                    this.playerY +
                    vertical *
                    currentSpeed;


                if (
                    this.canMoveTo(
                        nextX,
                        this.playerY
                    )
                ) {

                    this.playerX =
                        nextX;

                }


                if (
                    this.canMoveTo(
                        this.playerX,
                        nextY
                    )
                ) {

                    this.playerY =
                        nextY;

                }

            }


            // ========================================================
            // MAP BOUNDARIES
            // ========================================================

            let hitMapBoundary = false;


            if (this.playerX < 0) {

                this.playerX = 0;

                hitMapBoundary = true;

            }


            if (
                this.playerX >=
                this.PLAYABLE_BOUNDARY
            ) {

                this.playerX =
                    this.PLAYABLE_BOUNDARY;

                hitMapBoundary = true;

            }


            if (this.playerY < 0) {

                this.playerY = 0;

                hitMapBoundary = true;

            }


            if (
                this.playerY >=
                this.PLAYABLE_BOUNDARY
            ) {

                this.playerY =
                    this.PLAYABLE_BOUNDARY;

                hitMapBoundary = true;

            }


            // ========================================================
            // BOUNDARY EVENT
            // ========================================================

            if (
                hitMapBoundary &&
                !this.wasAtBoundary
            ) {

                console.log(
                    'PLAYER REACHED MAP BOUNDARY'
                );

                this.tutorialBoundary.emit();

            }


            this.wasAtBoundary =
                hitMapBoundary;


            // ========================================================
            // UPDATE PLAYER
            // ========================================================

            this.updatePlayerPosition();


            // ========================================================
            // NEXT FRAME
            // ========================================================

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


    // ================================================================
    // DAMAGE EFFECT
    // ================================================================

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
                    transform:
                        'translate(0px, 0px)'
                },
                {
                    transform:
                        'translate(-4px, 0px)'
                },
                {
                    transform:
                        'translate(4px, 0px)'
                },
                {
                    transform:
                        'translate(-3px, 0px)'
                },
                {
                    transform:
                        'translate(0px, 0px)'
                }
            ],
            {
                duration: 100,
                easing: 'linear'
            }
        );

    }


    // ================================================================
    // DEATH
    // ================================================================

    private die(): void {

        console.log(
            'PLAYER DIED'
        );

    }


    // ================================================================
    // UPDATE PLAYER POSITION / HUD
    // ================================================================

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


        if (player) {

            player.style.transform =
                `translate(
                    ${this.playerX}px,
                    ${this.playerY}px
                )`;

        }


        if (staminaContainer) {

            const shiftHeld =
                this.keys.has('shift');

            staminaContainer.style.display =
                shiftHeld
                    ? 'block'
                    : 'none';

        }


        if (staminaBar) {

            const staminaPercentage =
                this.getStaminaPercentage();

            staminaBar.style.width =
                `${staminaPercentage}%`;

        }


        if (healthBar) {

            healthBar.style.width =
                `${this.getHealthPercentage()}%`;

        }

    }


    // ================================================================
    // PLAYER COLOR
    // ================================================================

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


    // ================================================================
    // BUTTON STATE
    // ================================================================

    private setButtonActive(
        buttonId: string
    ): void {

        const button =
            document.getElementById(
                buttonId
            );

        if (button) {

            button.classList.add(
                'active'
            );

        }

    }


    private setButtonInactive(
        buttonId: string
    ): void {

        const button =
            document.getElementById(
                buttonId
            );

        if (button) {

            button.classList.remove(
                'active'
            );

        }

    }


    // ================================================================
    // CLEANUP
    // ================================================================

    ngOnDestroy(): void {

        this.buffSubscription?.unsubscribe();

        if (
            !isPlatformBrowser(
                this.platformId
            )
        ) {
            return;
        }

        if (this.animationFrameId) {

            cancelAnimationFrame(
                this.animationFrameId
            );

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

            clearTimeout(
                this.holdTimer
            );

        }

    }

}