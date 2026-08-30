import {
  Component,
  OnDestroy,
  afterNextRender,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

interface BackgroundStar {
  left: number;
  top: number;
  size: number;
  opacity: number;
  delay: number;
}

interface CelestialEvent {

  id: number;

  type:
  | 'comet'
  | 'asteroid'
  | 'special-comet';

  left: number;

  top: number;

  angle: number;

  duration: number;

  size: number;

  opacity: number;

}

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.css'
})
export class Title implements OnDestroy {

  isLeaving = false;

  /*
   * =====================================================
   * DEBUG
   * =====================================================
   *
   * Set to true while developing.
   *
   * TRUE:
   *   - skips most of the aphelion waiting period
   *   - makes the orbit much faster
   *
   * FALSE:
   *   - normal game timing,
   *     its so slow i think
   *     imma leave always fast.
   */

  private readonly DEBUG_ORBIT = true;

  private readonly DEBUG_APHELION_PAUSE = 1_000;

  private readonly DEBUG_ORBIT_SPEED = 10;


  /*
   * =====================================================
   * BACKGROUND STARS
   * =====================================================
   */

  backgroundStars: BackgroundStar[] = [];

  /*
 * =====================================================
 * RANDOM CELESTIAL EVENTS
 * =====================================================
 */

  celestialEvents: CelestialEvent[] = [];

  private nextEventId = 0;

  private eventTimer?: ReturnType<typeof setTimeout>;

  private specialCometTimer?: ReturnType<typeof setTimeout>;

  private specialCometTriggered = false;


  /*
   * =====================================================
   * PLANET / ORBIT
   * =====================================================
   *
   * The SVG ellipse:
   *
   * cx = 600
   * cy = 350
   * rx = 500
   * ry = 230
   *
   * The planet starts at:
   *
   * x = 1100
   * y = 350
   *
   * which is the rightmost point of the ellipse.
   */

  planetX = signal(1100);
  planetY = signal(350);


  /*
   * Angle around the ellipse.
   *
   * 0°   = rightmost point
   * 90°  = bottom
   * 180° = leftmost point
   * 270° = top
   */

  private orbitAngle = 0;


  /*
   * Used to calculate elapsed time
   * between animation frames.
   */

  private previousTime = 0;


  /*
   * requestAnimationFrame ID.
   *
   * We keep this so we can stop the animation
   * if the component is destroyed.
   */

  private animationFrameId?: number;


  /*
   * =====================================================
   * ORBIT SETTINGS
   * =====================================================
   */

  private readonly centerX = 600;
  private readonly centerY = 350;

  private readonly radiusX = 500;
  private readonly radiusY = 230;


  /*
   * How long the planet stays almost completely
   * still at aphelion.
   *
   * 45 seconds.
   */

  private readonly aphelionPause =
    this.DEBUG_ORBIT
      ? this.DEBUG_APHELION_PAUSE
      : 45_000;

  /*
   * Time since the planet started leaving aphelion.
   */

  private orbitElapsed = 0;


  /*
   * Whether the planet has started its orbit.
   */

  private orbitStarted = false;


  /*
   * =====================================================
   * CONSTRUCTOR
   * =====================================================
   */

  constructor(
    private readonly router: Router
  ) {

    this.createBackgroundStars();

    /*
     * This code runs only after Angular has
     * rendered the component in the browser.
     *
     * This is important because your project
     * uses server-side rendering (SSR).
     */

    afterNextRender(() => {

      setTimeout(() => {

        this.startOrbit();

      }, 8_500);


      /*
       * Start random celestial events
       * after the title screen has had time
       * to establish itself.
       */

      setTimeout(() => {

        this.scheduleNextCelestialEvent();

      }, 12_000);


      /*
       * The special comet cannot appear
       * before one minute has passed.
       *
       * We give it a little randomness so
       * it doesn't happen at exactly 60.000 seconds.
       */

      this.specialCometTimer = setTimeout(() => {

        this.triggerSpecialComet();

      }, 60_000 + Math.random() * 30_000);

    });

  }


  /*
   * =====================================================
   * DEBUG — SHOW RANDOM CELESTIAL EVENT
   * =====================================================
   */

  debugCelestialEvent(): void {

    this.createRandomCelestialEvent();

  }


  /*
   * =====================================================
   * DEBUG — SHOW SPECIAL COMET
   * =====================================================
   */

  debugSpecialComet(): void {

    this.specialCometTriggered = false;

    this.triggerSpecialComet();

  }

  enterGame(): void {

    /*
     * Prevent multiple clicks while
     * the transition is happening.
     */

    if (this.isLeaving) {

      return;

    }


    /*
     * Start the fade.
     */

    this.isLeaving = true;


    /*
     * Wait for the fade to finish,
     * then navigate.
     */

    setTimeout(() => {

      this.router.navigate(['/login']);

    }, 1_200);

  }


  /*
   * =====================================================
   * BACKGROUND STARS
   * =====================================================
   */

  private createBackgroundStars(): void {

    const numberOfStars = 180;

    for (let i = 0; i < numberOfStars; i++) {

      this.backgroundStars.push({

        left: Math.random() * 100,

        top: Math.random() * 100,

        size: Math.random() < 0.9
          ? 1
          : 2,

        opacity:
          0.08 +
          Math.random() * 0.17,

        delay:
          9 +
          Math.random() * 5

      });

    }

  }

  /*
 * =====================================================
 * SCHEDULE NEXT CELESTIAL EVENT
 * =====================================================
 */

  private scheduleNextCelestialEvent(): void {

    /*
     * Random delay between 20 and 40 seconds.
     */

    const delay =
      20_000 +
      Math.random() * 40_000;


    this.eventTimer = setTimeout(() => {

      this.createRandomCelestialEvent();

      this.scheduleNextCelestialEvent();

    }, delay);

  }


  /*
   * =====================================================
   * CREATE RANDOM EVENT
   * =====================================================
   */

  private createRandomCelestialEvent(): void {

    /*
     * About 70% comets.
     * About 30% asteroids.
     */

    const type =
      Math.random() < 0.7
        ? 'comet'
        : 'asteroid';


    const event: CelestialEvent = {

      id: this.nextEventId++,

      type,

      /*
       * Start somewhere vertically across
       * the screen.
       */

      left: 0,

      top:
        5 +
        Math.random() * 90,

      /*
       * Slightly random diagonal trajectory.
       */

      angle:
        -25 +
        Math.random() * 50,

      /*
       * Comets are fast.
       * Asteroids are a little slower.
       */

      duration:
        type === 'comet'
          ? 1.5 + Math.random() * 1.5
          : 2.5 + Math.random() * 2,

      /*
       * Asteroids get different sizes.
       * Comets stay tiny.
       */

      size:
        type === 'comet'
          ? 3
          : 3 + Math.random() * 6,

      /*
       * Keep them subtle.
       */

      opacity:
        type === 'comet'
          ? 0.45 + Math.random() * 0.4
          : 0.25 + Math.random() * 0.35

    };


    this.celestialEvents.push(event);


    /*
     * Remove the event after its animation
     * has finished.
     */

    setTimeout(() => {

      this.celestialEvents =
        this.celestialEvents.filter(
          current =>
            current.id !== event.id
        );

    }, (event.duration + 0.5) * 1000);

  }


  /*
   * =====================================================
   * SPECIAL COMET
   * =====================================================
   */

  private triggerSpecialComet(): void {

    /*
     * Only allow this to happen once.
     */

    if (this.specialCometTriggered) {

      return;

    }


    this.specialCometTriggered = true;


    const event: CelestialEvent = {

      id: this.nextEventId++,

      type: 'special-comet',

      left: 0,

      /*
       * Put it somewhere slightly unusual.
       */

      top:
        15 +
        Math.random() * 55,

      /*
       * A much more dramatic trajectory.
       */

      angle:
        -18 +
        Math.random() * 36,

      /*
       * Slower than normal comets.
       *
       * This gives the player time to actually
       * notice what the fuck just happened.
       */

      duration:
        5.5 +
        Math.random() * 2,

      size: 7,

      opacity: 1

    };


    this.celestialEvents.push(event);


    /*
     * Remove it after the animation.
     */

    setTimeout(() => {

      this.celestialEvents =
        this.celestialEvents.filter(
          current =>
            current.id !== event.id
        );

    }, (event.duration + 1) * 1000);

  }


  /*
   * =====================================================
   * START ORBIT
   * =====================================================
   */

  private startOrbit(): void {

    /*
     * Start the timer at the moment
     * the orbit is activated.
     */

    this.previousTime = performance.now();

    this.animationFrameId =
      requestAnimationFrame(
        (time) => this.animateOrbit(time)
      );

  }


  /*
   * =====================================================
   * ORBIT ANIMATION
   * =====================================================
   */

  private animateOrbit(time: number): void {

    /*
     * Calculate how much time has passed
     * since the previous frame.
     */

    const deltaTime =
      time - this.previousTime;

    this.previousTime = time;


    /*
     * -------------------------------------------------
     * PHASE 1 — WAIT AT APHELION
     * -------------------------------------------------
     */

    if (!this.orbitStarted) {

      this.orbitElapsed += deltaTime;

      if (this.orbitElapsed >= this.aphelionPause) {

        this.orbitStarted = true;

        this.orbitElapsed = 0;

      }

    }


    /*
     * -------------------------------------------------
     * PHASE 2 — MOVE AROUND THE ORBIT
     * -------------------------------------------------
     */

    else {

      /*
       * Convert milliseconds to seconds.
       */

      const seconds =
        deltaTime / 1000;


      /*
       * Base orbital speed.
       *
       * 2π radians = one complete orbit.
       *
       * 60 seconds = roughly one minute
       * for a complete normal orbit.
       */

      const normalSpeed =
        (Math.PI * 2) / 60 *
        (
          this.DEBUG_ORBIT
            ? this.DEBUG_ORBIT_SPEED
            : 1
        );



      /*
       * Determine where we are around
       * the orbit.
       *
       * 0 = right / aphelion
       * π = left / opposite point
       */

      const normalizedAngle =
        this.orbitAngle % (Math.PI * 2);


      /*
       * -------------------------------------------------
       * SLOW REGION AROUND APHELION
       * -------------------------------------------------
       *
       * When we're close to the right side,
       * we move extremely slowly.
       *
       * This creates the strange "lingering"
       * behavior you wanted.
       */

      const distanceFromAphelion =
        Math.min(
          normalizedAngle,
          Math.PI * 2 - normalizedAngle
        );


      /*
       * 50° of the orbit is the "slow region".
       */

      const slowRegion =
        (50 * Math.PI) / 180;


      let speedMultiplier = 1;


      if (distanceFromAphelion < slowRegion) {

        /*
         * Convert distance to 0 → 1.
         *
         * 0 = exactly aphelion
         * 1 = edge of slow region
         */

        const progress =
          distanceFromAphelion /
          slowRegion;


        /*
         * Cubic easing.
         *
         * Very slow at aphelion,
         * gradually becoming normal.
         */

        speedMultiplier =
          progress * progress * progress;

        /*
         * Give it a tiny minimum movement
         * so it doesn't get permanently stuck.
         */

        speedMultiplier =
          Math.max(
            speedMultiplier,
            0.002
          );

      }


      /*
       * Move the planet.
       */

      this.orbitAngle +=
        normalSpeed *
        speedMultiplier *
        seconds;

    }


    /*
     * -------------------------------------------------
     * CALCULATE PLANET POSITION
     * -------------------------------------------------
     *
     * Parametric ellipse equation:
     *
     * x = cx + rx cos(angle)
     * y = cy + ry sin(angle)
     */

    this.planetX.set(
      this.centerX +
      this.radiusX *
      Math.cos(this.orbitAngle)
    );

    this.planetY.set(
      this.centerY +
      this.radiusY *
      Math.sin(this.orbitAngle)
    );


    /*
     * Ask the browser for the next frame.
     */

    this.animationFrameId =
      requestAnimationFrame(
        (nextTime) =>
          this.animateOrbit(nextTime)
      );

  }


  /*
   * =====================================================
   * CLEANUP
   * =====================================================
   */

  ngOnDestroy(): void {

    if (this.animationFrameId !== undefined) {

      cancelAnimationFrame(
        this.animationFrameId
      );

    }


    if (this.eventTimer !== undefined) {

      clearTimeout(this.eventTimer);

    }


    if (this.specialCometTimer !== undefined) {

      clearTimeout(this.specialCometTimer);

    }

  }

}