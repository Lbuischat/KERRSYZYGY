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
   */

  private readonly DEBUG_ORBIT = true;


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
   * CENTRAL STAR + TWO COMPANION STARS
   * =====================================================
   *
   * The logo is the fixed central star.
   *
   * Companion 1:
   *   Large inner stellar companion.
   *
   * Companion 2:
   *   Large outer stellar companion.
   *
   * Moon:
   *   Small body orbiting Companion 1.
   *
   * The coordinates are SVG coordinates relative
   * to the center of the 1200 x 700 system.
   */

  companionOneX = signal(600);
  companionOneY = signal(350);

  companionTwoX = signal(600);
  companionTwoY = signal(350);

  moonX = signal(0);
  moonY = signal(0);


  /*
   * =====================================================
   * ORBIT ANGLES
   * =====================================================
   *
   * These are independent orbital phases.
   *
   * The companions do NOT form a rigid triangle.
   *
   * Each star has its own orbital period,
   * which creates a much more natural-looking
   * stellar system.
   */

  private companionOneAngle = 0;

  private companionTwoAngle = Math.PI;

  moonAngle = 0;


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

  /*
   * =====================================================
   * STELLAR SYSTEM GEOMETRY
   * =====================================================
   */

  private readonly centerX = 600;
  private readonly centerY = 350;

  /*
   * =====================================================
   * COMPANION STAR 1 ORBIT
   * =====================================================
   *
   * This star stays relatively close to the
   * central logo.
   *
   * The orbit is elliptical rather than circular.
   */

  private readonly companionOneRadiusX = 220;
  private readonly companionOneRadiusY = 120;

  /*
   * =====================================================
   * COMPANION STAR 2 ORBIT
   * =====================================================
   *
   * This star has a wider orbit.
   *
   * Because the two stars have different periods,
   * they naturally change their relative positions.
   */

  private readonly companionTwoRadiusX = 380;
  private readonly companionTwoRadiusY = 195;

  /*
   * =====================================================
   * ORBITAL PERIODS
   * =====================================================
   *
   * DEBUG mode makes the system move quickly
   * while developing.
   *
   * Normal values can later be slowed down.
   */

  private readonly companionOnePeriod =
    this.DEBUG_ORBIT
      ? 7
      : 35;

  private readonly companionTwoPeriod =
    this.DEBUG_ORBIT
      ? 13
      : 65;

  /*
   * =====================================================
   * MOON ORBIT
   * =====================================================
   *
   * This is deliberately much smaller than
   * the stellar orbits.
   */

  private readonly moonRadiusX = 58;
  private readonly moonRadiusY = 34;

  /*
   * Moon orbital period.
   */

  private readonly moonPeriod = 3.5;




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
   * INITIAL STAR POSITIONS
   * =====================================================
   */

  private updateInitialStarPositions(): void {

    /*
     * Companion 1
     */

    this.companionOneX.set(
      this.centerX +
      this.companionOneRadiusX *
      Math.cos(this.companionOneAngle)
    );

    this.companionOneY.set(
      this.centerY +
      this.companionOneRadiusY *
      Math.sin(this.companionOneAngle)
    );

    /*
     * Companion 2
     */

    this.companionTwoX.set(
      this.centerX +
      this.companionTwoRadiusX *
      Math.cos(this.companionTwoAngle)
    );

    this.companionTwoY.set(
      this.centerY +
      this.companionTwoRadiusY *
      Math.sin(this.companionTwoAngle)
    );

    /*
     * Moon starts at zero degrees.
     */

    this.moonAngle = 0;

  }


  /*
   * =====================================================
   * START ORBIT
   * =====================================================
   */

  private startOrbit(): void {

    this.previousTime =
      performance.now();

    /*
     * Put the stars into their initial
     * orbital positions immediately.
     */

    this.updateInitialStarPositions();

    this.animationFrameId =
      requestAnimationFrame(
        (time) =>
          this.animateOrbit(time)
      );

  }


  /*
 * =====================================================
 * ORBIT ANIMATION
 * =====================================================
 */

  /*
   * =====================================================
   * ORBIT ANIMATION
   * =====================================================
   *
   * The logo remains fixed at:
   *
   *     600, 350
   *
   * Companion 1 and Companion 2 orbit around
   * that central point.
   *
   * Their orbital periods are different, so they
   * continuously change their relative positions.
   *
   * The moon independently orbits Companion 1.
   *
   * This creates a hierarchical stellar system:
   *
   *
   *                 Star 2
   *              ╱           ╲
   *            ╱               ╲
   *           ╱       LOGO      ╲
   *           ╲        ★        ╱
   *            ╲               ╱
   *              ╲           ╱
   *                 Star 1
   *                    ·
   *                  moon
   *
   * =====================================================
   */

  private animateOrbit(time: number): void {

    /*
     * -------------------------------------------------
     * FRAME TIME
     * -------------------------------------------------
     */

    const deltaTime =
      time - this.previousTime;

    this.previousTime = time;

    /*
     * Convert milliseconds to seconds.
     */

    const seconds =
      deltaTime / 1000;

    /*
     * -------------------------------------------------
     * COMPANION STAR 1
     * -------------------------------------------------
     *
     * Elliptical orbit around the central logo.
     */

    const companionOneAngularVelocity =
      (Math.PI * 2) /
      this.companionOnePeriod;

    this.companionOneAngle +=
      companionOneAngularVelocity *
      seconds;

    /*
     * Elliptical parametric orbit:
     *
     * x = cx + rx cos(theta)
     * y = cy + ry sin(theta)
     */

    const companionOneX =
      this.centerX +
      this.companionOneRadiusX *
      Math.cos(this.companionOneAngle);

    const companionOneY =
      this.centerY +
      this.companionOneRadiusY *
      Math.sin(this.companionOneAngle);

    this.companionOneX.set(
      companionOneX
    );

    this.companionOneY.set(
      companionOneY
    );

    /*
     * -------------------------------------------------
     * COMPANION STAR 2
     * -------------------------------------------------
     *
     * Star 2 has:
     *
     * - a larger orbit
     * - a different orbital period
     * - an initial phase opposite Star 1
     *
     * This prevents the stars from behaving
     * like a rigid triangle.
     */

    const companionTwoAngularVelocity =
      (Math.PI * 2) /
      this.companionTwoPeriod;

    this.companionTwoAngle +=
      companionTwoAngularVelocity *
      seconds;

    /*
     * Small orbital eccentricity.
     *
     * The radius changes slightly over the orbit.
     *
     * This prevents the movement from looking
     * mechanically perfect.
     */

    const companionTwoX =
      this.centerX +
      this.companionTwoRadiusX *
      Math.cos(this.companionTwoAngle);

    const companionTwoY =
      this.centerY +
      this.companionTwoRadiusY *
      Math.sin(this.companionTwoAngle);

    this.companionTwoX.set(
      companionTwoX
    );

    this.companionTwoY.set(
      companionTwoY
    );

    /*
     * -------------------------------------------------
     * MOON AROUND COMPANION 1
     * -------------------------------------------------
     *
     * The moon does NOT orbit the logo.
     *
     * It orbits Companion 1.
     */

    const moonAngularVelocity =
      (Math.PI * 2) /
      this.moonPeriod;

    this.moonAngle +=
      moonAngularVelocity *
      seconds;

    const moonLocalX =
      this.moonRadiusX *
      Math.cos(this.moonAngle);

    const moonLocalY =
      this.moonRadiusY *
      Math.sin(this.moonAngle);

    this.moonX.set(
      this.companionOneX() +
      moonLocalX
    );

    this.moonY.set(
      this.companionOneY() +
      moonLocalY
    );

    /*
     * -------------------------------------------------
     * NEXT FRAME
     * -------------------------------------------------
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

      clearTimeout(
        this.eventTimer
      );

    }


    if (this.specialCometTimer !== undefined) {

      clearTimeout(
        this.specialCometTimer
      );

    }

  }
}
