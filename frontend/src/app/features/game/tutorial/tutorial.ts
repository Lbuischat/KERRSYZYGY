import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';

import { Player } from '../player/player';

type TutorialStep =
    | 'movement'
    | 'sprint'
    | 'stamina'
    | 'attack'
    | 'attackEnemy'
    | 'complete';

@Component({
    selector: 'app-tutorial',
    standalone: true,
    imports: [],
    templateUrl: './tutorial.html',
    styleUrl: './tutorial.css'
})
export class tutorial implements OnInit, OnChanges, OnDestroy {

    // ================================================================
    // PLAYER INPUT
    // ================================================================

    /*
     * Bound from GameShell: [player]="gameWorld.player"
     *
     * We wire the getters in ngOnChanges (instead of expecting some
     * parent to call connectPlayer manually) because GameWorld's own
     * @ViewChild(Player) resolves in ITS AfterViewInit, which can
     * land a tick after GameShell's first change detection pass.
     * ngOnChanges will simply fire again once `player` is populated.
     */
    @Input() player?: Player;


    // ================================================================
    // CURRENT STEP
    // ================================================================

    currentStep: TutorialStep = 'movement';


    // ================================================================
    // MOVEMENT
    // ================================================================

    /*
     * Public because tutorial.html directly reads this.
     */
    public movementProgress = 0;

    private movementTime = 0;

    private readonly MOVEMENT_REQUIRED = 1.5;


    // ================================================================
    // SPRINT
    // ================================================================

    /*
     * Public because tutorial.html directly reads this.
     */
    public sprintProgress = 0;

    private sprintTime = 0;

    private readonly SPRINT_REQUIRED = 2;


    // ================================================================
    // STAMINA
    // ================================================================

    public staminaProgress = 0;

    private staminaStarted = false;


    // ================================================================
    // BASIC ATTACK
    // ================================================================

    public attackPerformed = false;


    // ================================================================
    // TUTORIAL ENEMY
    // ================================================================

    public tutorialEnemyDefeated = false;


    // ================================================================
    // COMPLETE
    // ================================================================

    public completed = false;


    // ================================================================
    // PLAYER CONNECTION
    // ================================================================

    /*
     * These functions are connected to the REAL Player.
     *
     * Tutorial does not listen for WASD / Shift itself.
     */

    private getPlayerMoving?: () => boolean;

    private getPlayerSprinting?: () => boolean;

    private getPlayerStamina?: () => number;


    // ================================================================
    // GAME LOOP
    // ================================================================

    private animationFrameId = 0;

    private lastTime = 0;


    // ================================================================
    // INITIALIZATION
    // ================================================================

    ngOnInit(): void {

        this.lastTime =
            performance.now();

        this.startTutorialLoop();

    }


    // ================================================================
    // REACT TO @Input() player CHANGES
    // ================================================================

    ngOnChanges(
        changes: SimpleChanges
    ): void {

        if (
            changes['player'] &&
            this.player
        ) {

            this.connectPlayer(
                () => this.player!.getIsMoving(),
                () => this.player!.getIsSprinting(),
                () => this.player!.getStamina()
            );

        }

    }


    // ================================================================
    // CONNECT PLAYER
    // ================================================================

    public connectPlayer(
        getMoving: () => boolean,
        getSprinting: () => boolean,
        getStamina: () => number
    ): void {

        this.getPlayerMoving =
            getMoving;

        this.getPlayerSprinting =
            getSprinting;

        this.getPlayerStamina =
            getStamina;

    }


    // ================================================================
    // BASIC ATTACK EVENT
    // ================================================================

    public onBasicAttack(): void {

        if (
            this.currentStep !==
            'attack'
        ) {
            return;
        }

        this.attackPerformed = true;

        this.nextStep();

    }


    // ================================================================
    // ENEMY DEFEATED EVENT
    // ================================================================

    public onTutorialEnemyDefeated(): void {

        if (
            this.currentStep !==
            'attackEnemy'
        ) {
            return;
        }

        this.tutorialEnemyDefeated = true;

        this.nextStep();

    }


    // ================================================================
    // TUTORIAL LOOP
    // ================================================================

    private startTutorialLoop(): void {

        const update = (
            currentTime: number
        ): void => {

            const deltaTime =
                (
                    currentTime -
                    this.lastTime
                ) / 1000;

            this.lastTime =
                currentTime;

            this.updateTutorial(
                deltaTime
            );

            if (!this.completed) {

                this.animationFrameId =
                    requestAnimationFrame(
                        update
                    );

            }

        };

        this.animationFrameId =
            requestAnimationFrame(
                update
            );

    }


    // ================================================================
    // UPDATE TUTORIAL
    // ================================================================

    private updateTutorial(
        deltaTime: number
    ): void {

        if (this.completed) {
            return;
        }

        switch (
            this.currentStep
        ) {

            case 'movement':

                this.updateMovement(
                    deltaTime
                );

                break;


            case 'sprint':

                this.updateSprint(
                    deltaTime
                );

                break;


            case 'stamina':

                this.updateStamina();

                break;


            case 'attack':

                /*
                 * Waiting for Player.attack.
                 */

                break;


            case 'attackEnemy':

                /*
                 * Waiting for enemy death.
                 */

                break;

        }

    }


    // ================================================================
    // MOVEMENT
    // ================================================================

    private updateMovement(
        deltaTime: number
    ): void {

        if (
            !this.getPlayerMoving
        ) {
            return;
        }

        const isMoving =
            this.getPlayerMoving();

        if (!isMoving) {
            return;
        }

        this.movementTime +=
            deltaTime;

        this.movementProgress =
            Math.min(
                100,
                (
                    this.movementTime /
                    this.MOVEMENT_REQUIRED
                ) * 100
            );

        if (
            this.movementTime >=
            this.MOVEMENT_REQUIRED
        ) {

            this.movementProgress = 100;

            this.nextStep();

        }

    }


    // ================================================================
    // SPRINT
    // ================================================================

    private updateSprint(
        deltaTime: number
    ): void {

        if (
            !this.getPlayerSprinting
        ) {
            return;
        }

        const isSprinting =
            this.getPlayerSprinting();

        if (!isSprinting) {
            return;
        }

        this.sprintTime +=
            deltaTime;

        this.sprintProgress =
            Math.min(
                100,
                (
                    this.sprintTime /
                    this.SPRINT_REQUIRED
                ) * 100
            );

        if (
            this.sprintTime >=
            this.SPRINT_REQUIRED
        ) {

            this.sprintProgress = 100;

            this.nextStep();

        }

    }


    // ================================================================
    // STAMINA
    // ================================================================

    private updateStamina(): void {

        if (
            !this.getPlayerStamina
        ) {
            return;
        }

        const stamina =
            this.getPlayerStamina();

        /*
         * Start at 0% and increase as stamina is depleted.
         */
        this.staminaProgress =
            Math.min(
                100,
                Math.max(
                    0,
                    100 - stamina
                )
            );

        if (stamina <= 0) {

            this.staminaProgress = 100;

            this.nextStep();

        }

    }


    // ================================================================
    // NEXT STEP
    // ================================================================

    private nextStep(): void {

        switch (
            this.currentStep
        ) {

            // --------------------------------------------------------
            // MOVEMENT → SPRINT
            // --------------------------------------------------------

            case 'movement':

                this.currentStep =
                    'sprint';

                this.movementProgress =
                    100;

                this.sprintProgress =
                    0;

                this.sprintTime =
                    0;

                break;


            // --------------------------------------------------------
            // SPRINT → STAMINA
            // --------------------------------------------------------

            case 'sprint':

                this.currentStep =
                    'stamina';

                this.sprintProgress =
                    100;

                this.staminaProgress =
                    0;

                this.staminaStarted =
                    false;

                break;


            // --------------------------------------------------------
            // STAMINA → ATTACK
            // --------------------------------------------------------

            case 'stamina':

                this.currentStep =
                    'attack';

                this.staminaProgress =
                    100;

                this.attackPerformed =
                    false;

                break;


            // --------------------------------------------------------
            // ATTACK → ENEMY
            // --------------------------------------------------------

            case 'attack':

                this.currentStep =
                    'attackEnemy';

                this.attackPerformed =
                    true;

                this.tutorialEnemyDefeated =
                    false;

                break;


            // --------------------------------------------------------
            // ENEMY → COMPLETE
            // --------------------------------------------------------

            case 'attackEnemy':

                this.currentStep =
                    'complete';

                this.tutorialEnemyDefeated =
                    true;

                this.completed =
                    true;

                break;

        }

    }


    // ================================================================
    // HELPERS
    // ================================================================

    public getProgress(): number {

        switch (
            this.currentStep
        ) {

            case 'movement':
                return this.movementProgress;

            case 'sprint':
                return this.sprintProgress;

            case 'stamina':
                return this.staminaProgress;

            case 'attack':
                return this.attackPerformed
                    ? 100
                    : 0;

            case 'attackEnemy':
                return this.tutorialEnemyDefeated
                    ? 100
                    : 0;

            case 'complete':
                return 100;

        }

    }


    public isComplete(): boolean {
        return this.completed;
    }


    // ================================================================
    // CLEANUP
    // ================================================================

    ngOnDestroy(): void {

        if (
            this.animationFrameId
        ) {

            cancelAnimationFrame(
                this.animationFrameId
            );

        }

    }

}