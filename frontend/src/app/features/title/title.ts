import { Component, OnDestroy, afterNextRender, signal, output, input } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
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

  type: 'comet' | 'asteroid' | 'special-comet';

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
  styleUrl: './title.css',
})
export class Title implements OnDestroy {
  zoomingOut = input(false);

  remember = output<void>();

  isLeaving = false;

  // =========================================================
  // DEBUG
  // =========================================================

  /*
   * Set to true while developing.
   */

  private readonly DEBUG_ORBIT = false;

  // =========================================================
  // ORBITAL STATE
  // =========================================================

  private orbitalPhase: 'normal' | 'binary' | 'exit' = 'normal';

  /*
   * BINARY
   *
   * The pair circles the fixed center star
   * (S1) together, opposite each other, for a
   * fixed number of full revolutions.
   */

  private binaryProgress = 0;
  private binaryAngle = 0;

  private readonly binaryDuration = 1.75;

  /*
   * The angle (on the small circle around S1)
   * that companion one starts AND ends the
   * binary phase at. Companion two is always
   * diametrically opposite. Since the pair
   * completes a whole number of revolutions,
   * they finish exactly where they started.
   */

  private binaryStartAngle = 0;

  private exitProgress = 0;
  private readonly exitDuration = 1.2;

  /*
   * Which encounter point each companion
   * approached from — and will exit back
   * toward, now on its newly swapped orbit.
   * Set the moment a swap begins; cleared once
   * normal orbiting resumes.
   */

  private entryPointOne: { x: number; y: number } | null = null;

  private entryPointTwo: { x: number; y: number } | null = null;

  /*
   * The angle each companion should resume at,
   * on its NEW orbit, once the exit maneuver
   * finishes. Computed the instant the swap
   * happens so motion stays continuous.
   */

  private exitTargetAngleOne = 0;
  private exitTargetAngleTwo = 0;

  /*
   * Tracks which physical orbit each companion
   * is currently using.
   *
   * A = left ellipse
   * B = right ellipse
   */

  private starTwoOrbit: 'A' | 'B' = 'A';
  private starThreeOrbit: 'A' | 'B' = 'B';

  // =========================================================
  // BACKGROUND STARS
  // =========================================================

  backgroundStars: BackgroundStar[] = [];

  // =========================================================
  // RANDOM CELESTIAL EVENTS
  // =========================================================

  celestialEvents: CelestialEvent[] = [];

  private nextEventId = 0;

  private eventTimer?: ReturnType<typeof setTimeout>;
  private specialCometTimer?: ReturnType<typeof setTimeout>;

  private specialCometTriggered = false;

  // =========================================================
  // CENTRAL STAR + COMPANION STARS
  // =========================================================

  /*
   * The logo is the fixed central star.
   *
   * S2:
   *   Companion star 1.
   *
   * S3:
   *   Companion star 2.
   *
   * Moon:
   *   Small body orbiting S2.
   *
   * All coordinates use the SVG's
   * 1200 × 700 coordinate system.
   */

  companionOneX = signal(600);
  companionOneY = signal(350);

  companionTwoX = signal(600);
  companionTwoY = signal(350);

  moonX = signal(0);
  moonY = signal(0);

  moonOneX = signal(0);
  moonOneY = signal(0);

  // =========================================================
  // ORBIT ANGLES
  // =========================================================

  /*
   * S2 starts at the top of its orbit.
   */

  private companionOneAngle = Math.PI / 2;

  /*
   * S3 starts at the top of its orbit.
   */

  private companionTwoAngle = Math.PI / 2;

  /*
   * Moon starts at zero degrees.
   */

  moonAngle = 0;

  // =========================================================
  // ANIMATION TIMING
  // =========================================================

  /*
   * Used to calculate elapsed time between
   * animation frames.
   */

  private previousTime = 0;

  /*
   * requestAnimationFrame ID.
   *
   * Stored so the animation can be stopped
   * when the component is destroyed.
   */

  private animationFrameId?: number;

  // =========================================================
  // STELLAR SYSTEM GEOMETRY
  // =========================================================

  /*
   * Central logo / S1.
   */

  private readonly centerX = 600;
  private readonly centerY = 350;

  /*
   * ---------------------------------------------------------
   * LEFT ELLIPSE / ORBIT A
   * ---------------------------------------------------------
   *
   * Matches the HTML exactly:
   *
   *   cx="400"
   *   cy="350"
   *   rx="400"
   *   ry="250"
   */

  private readonly orbitACenterX = 400;
  private readonly orbitACenterY = 350;

  private readonly orbitARadiusX = 400;
  private readonly orbitARadiusY = 250;

  /*
   * ---------------------------------------------------------
   * RIGHT ELLIPSE / ORBIT B
   * ---------------------------------------------------------
   *
   * Matches the HTML exactly:
   *
   *   cx="800"
   *   cy="350"
   *   rx="400"
   *   ry="250"
   */

  private readonly orbitBCenterX = 800;
  private readonly orbitBCenterY = 350;

  private readonly orbitBRadiusX = 400;
  private readonly orbitBRadiusY = 250;

  /*
   * ---------------------------------------------------------
   * ENCOUNTER POINTS
   * ---------------------------------------------------------
   *
   * Orbit A and Orbit B intersect at exactly two points,
   * both sitting on the vertical line through the fixed
   * center star (S1).
   *
   * These are derived from the orbit geometry above rather
   * than hardcoded, so they stay correct if the ellipses
   * are ever resized.
   */

  private readonly encounterX = (this.orbitACenterX + this.orbitBCenterX) / 2;

  private readonly encounterYOffset =
    this.orbitARadiusY *
    Math.sqrt(1 - Math.pow((this.encounterX - this.orbitACenterX) / this.orbitARadiusX, 2));

  private readonly topEncounterY = this.orbitACenterY - this.encounterYOffset;

  private readonly bottomEncounterY = this.orbitACenterY + this.encounterYOffset;

  private readonly encounterTolerance = 8;

  /*
   * Encounters repeat indefinitely, but the pair
   * needs a brief grace period after each swap
   * before the same (or the other) encounter point
   * is allowed to trigger again — otherwise they'd
   * re-trigger the instant they land back on top of
   * the intersection they just swapped at.
   */

  private encounterCooldownRemaining = 0;

  private readonly encounterCooldownDuration = 2;

  // =========================================================
  // ORBIT ROTATION
  // =========================================================

  /*
   * Both SVG ellipses are horizontal,
   * so no rotation is currently required.
   */

  private readonly orbitARotation = 0;
  private readonly orbitBRotation = 0;

  // =========================================================
  // ORBITAL PERIODS
  // =========================================================

  /*
   * DEBUG mode makes the system move quickly
   * while developing.
   */

  private readonly companionOnePeriod = this.DEBUG_ORBIT ? 1 : 35;

  private readonly companionTwoPeriod = this.DEBUG_ORBIT ? 7 : 43;

  // =========================================================
  // MOON ORBIT
  // =========================================================

  private readonly moonRadiusX = 58;
  private readonly moonRadiusY = 34;

  private readonly moonPeriod = 20;

  private readonly moonOneRadiusX = 15;
  private readonly moonOneRadiusY = 11;

  private readonly moonOnePeriod = 0.5;

  moonOneAngle = 0;

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    public readonly languageService: LanguageService,
    private readonly router: Router,
  ) {
    this.createBackgroundStars();

    afterNextRender(() => {
      /*
       * Start the orbital animation after
       * the title screen has appeared.
       *
       * This is browser-only code and therefore
       * runs safely after Angular rendering.
       */

      setTimeout(() => {
        this.startOrbit();
      }, 2_500);

      /*
       * Start random celestial events after
       * the title screen has had time to establish itself.
       */

      setTimeout(() => {
        this.scheduleNextCelestialEvent();
      }, 12_000);

      /*
       * The special comet cannot appear before
       * one minute has passed.
       *
       * Add a random 0–30 second delay so it
       * does not always appear at the same time.
       */

      this.specialCometTimer = setTimeout(
        () => {
          this.triggerSpecialComet();
        },
        60_000 + Math.random() * 30_000,
      );
    });
  }

  // =========================================================
  // DEBUG — RANDOM CELESTIAL EVENT
  // =========================================================

  debugCelestialEvent(): void {
    this.createRandomCelestialEvent();
  }

  // =========================================================
  // DEBUG — SPECIAL COMET
  // =========================================================

  debugSpecialComet(): void {
    this.specialCometTriggered = false;

    this.triggerSpecialComet();
  }

  // =========================================================
  // ENTER GAME
  // =========================================================

  enterGame(): void {
    /*
     * Kill the REMEMBER button immediately.
     *
     * The title scene itself remains mounted.
     */

    this.isLeaving = true;

    /*
     * Tell GameEntry to begin the transition.
     */

    this.remember.emit();
  }

  if() {
    this.isLeaving = true;
  }

  // =========================================================
  // BACKGROUND STARS
  // =========================================================

  private createBackgroundStars(): void {
    const numberOfStars = 180;

    for (let i = 0; i < numberOfStars; i++) {
      this.backgroundStars.push({
        left: Math.random() * 100,

        top: Math.random() * 100,

        size: Math.random() < 0.9 ? 1 : 2,

        opacity: 0.08 + Math.random() * 0.17,

        delay: 9 + Math.random() * 5,
      });
    }
  }

  // =========================================================
  // SCHEDULE NEXT CELESTIAL EVENT
  // =========================================================

  private scheduleNextCelestialEvent(): void {
    /*
     * Random delay between 20 and 60 seconds.
     */

    const delay = 20_000 + Math.random() * 40_000;

    this.eventTimer = setTimeout(() => {
      this.createRandomCelestialEvent();

      this.scheduleNextCelestialEvent();
    }, delay);
  }

  // =========================================================
  // CREATE RANDOM CELESTIAL EVENT
  // =========================================================

  private createRandomCelestialEvent(): void {
    /*
     * About 70% comets.
     * About 30% asteroids.
     */

    const type = Math.random() < 0.7 ? 'comet' : 'asteroid';

    const event: CelestialEvent = {
      id: this.nextEventId++,

      type,

      /*
       * Events enter from the left side.
       */

      left: 0,

      /*
       * Start somewhere vertically
       * across most of the screen.
       */

      top: 5 + Math.random() * 90,

      /*
       * Slightly random diagonal trajectory.
       */

      angle: -25 + Math.random() * 50,

      /*
       * Comets are fast.
       * Asteroids are a little slower.
       */

      duration: type === 'comet' ? 1.5 + Math.random() * 1.5 : 2.5 + Math.random() * 2,

      /*
       * Comets stay tiny.
       * Asteroids get different sizes.
       */

      size: type === 'comet' ? 3 : 3 + Math.random() * 6,

      /*
       * Keep them subtle.
       */

      opacity: type === 'comet' ? 0.45 + Math.random() * 0.4 : 0.25 + Math.random() * 0.35,
    };

    this.celestialEvents.push(event);

    /*
     * Remove the event after its animation
     * has finished.
     */

    setTimeout(
      () => {
        this.celestialEvents = this.celestialEvents.filter((current) => current.id !== event.id);
      },
      (event.duration + 0.5) * 1000,
    );
  }

  // =========================================================
  // SPECIAL COMET
  // =========================================================

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

      top: 15 + Math.random() * 55,

      /*
       * Give it a more dramatic trajectory.
       */

      angle: -18 + Math.random() * 36,

      /*
       * Slower than normal comets so
       * the player has time to notice it.
       */

      duration: 5.5 + Math.random() * 2,

      size: 7,

      opacity: 1,
    };

    this.celestialEvents.push(event);

    /*
     * Remove it after the animation.
     */

    setTimeout(
      () => {
        this.celestialEvents = this.celestialEvents.filter((current) => current.id !== event.id);
      },
      (event.duration + 1) * 1000,
    );
  }

  // =========================================================
  // ANGLE FOR A KNOWN POINT ON AN ORBIT
  // =========================================================

  /*
   * Both encounter points sit exactly on Orbit A
   * AND Orbit B (that is what makes them intersections),
   * so given either orbit and one of those points, this
   * returns the parametric angle that reproduces it.
   *
   * Used right after a swap so the companion can resume
   * normal orbiting from the correct angle instead of
   * snapping back to its orbit's starting position.
   */

  private calculateAngleOnOrbit(orbit: 'A' | 'B', point: { x: number; y: number }): number {
    const centerX = orbit === 'A' ? this.orbitACenterX : this.orbitBCenterX;

    const centerY = orbit === 'A' ? this.orbitACenterY : this.orbitBCenterY;

    const radiusX = orbit === 'A' ? this.orbitARadiusX : this.orbitBRadiusX;

    const radiusY = orbit === 'A' ? this.orbitARadiusY : this.orbitBRadiusY;

    return Math.atan2(
      (point.y - centerY) / radiusY,

      (point.x - centerX) / radiusX,
    );
  }

  // =========================================================
  // ORBIT POSITION
  // =========================================================

  /*
   * Calculates a position directly from the
   * SVG ellipse that the star is currently using.
   *
   * This is the important part:
   *
   * TypeScript and HTML now use the same geometry.
   */

  private calculateOrbitPosition(orbit: 'A' | 'B', angle: number) {
    const centerX = orbit === 'A' ? this.orbitACenterX : this.orbitBCenterX;

    const centerY = orbit === 'A' ? this.orbitACenterY : this.orbitBCenterY;

    const radiusX = orbit === 'A' ? this.orbitARadiusX : this.orbitBRadiusX;

    const radiusY = orbit === 'A' ? this.orbitARadiusY : this.orbitBRadiusY;

    /*
     * Horizontal ellipses currently have
     * zero rotation, but keeping the rotation
     * calculation here makes the method easier
     * to extend later.
     */

    const rotation = orbit === 'A' ? this.orbitARotation : this.orbitBRotation;

    const localX = radiusX * Math.cos(angle);

    const localY = radiusY * Math.sin(angle);

    const cosRotation = Math.cos(rotation);

    const sinRotation = Math.sin(rotation);

    return {
      x: centerX + localX * cosRotation - localY * sinRotation,

      y: centerY + localX * sinRotation + localY * cosRotation,
    };
  }

  // =========================================================
  // LINEAR INTERPOLATION
  // =========================================================

  private lerp(start: number, end: number, amount: number): number {
    return start + (end - start) * amount;
  }

  // =========================================================
  // INITIAL STAR POSITIONS
  // =========================================================

  private updateInitialStarPositions(): void {
    /*
     * S2 starts on Orbit A.
     */

    const s2Position = this.calculateOrbitPosition(this.starTwoOrbit, this.companionOneAngle);

    this.companionOneX.set(s2Position.x);

    this.companionOneY.set(s2Position.y);

    /*
     * S3 starts on Orbit B.
     */

    const s3Position = this.calculateOrbitPosition(this.starThreeOrbit, this.companionTwoAngle);

    this.companionTwoX.set(s3Position.x);

    this.companionTwoY.set(s3Position.y);

    /*
     * Moon starts at zero degrees.
     */

    this.moonAngle = 0;
  }

  // =========================================================
  // NORMAL ORBIT
  // =========================================================

  private updateNormalOrbit(deltaTime: number): void {
    /*
     * -------------------------------------------------------
     * S2
     * -------------------------------------------------------
     */

    const s2AngularVelocity = (Math.PI * 2) / this.companionOnePeriod;

    this.companionOneAngle += s2AngularVelocity * deltaTime;

    const s2Position = this.calculateOrbitPosition(this.starTwoOrbit, this.companionOneAngle);

    this.companionOneX.set(s2Position.x);

    this.companionOneY.set(s2Position.y);

    /*
     * -------------------------------------------------------
     * S3
     * -------------------------------------------------------
     */

    const s3AngularVelocity = (Math.PI * 2) / this.companionTwoPeriod;

    this.companionTwoAngle += s3AngularVelocity * deltaTime;

    const s3Position = this.calculateOrbitPosition(this.starThreeOrbit, this.companionTwoAngle);

    this.companionTwoX.set(s3Position.x);

    this.companionTwoY.set(s3Position.y);

    /*
     * -------------------------------------------------------
     * COOLDOWN
     * -------------------------------------------------------
     */

    if (this.encounterCooldownRemaining > 0) {
      this.encounterCooldownRemaining = Math.max(0, this.encounterCooldownRemaining - deltaTime);

      return;
    }

    /*
     * -------------------------------------------------------
     * ENCOUNTER POINTS
     * -------------------------------------------------------
     */

    const topPoint = {
      x: this.encounterX,
      y: this.topEncounterY,
    };

    const bottomPoint = {
      x: this.encounterX,
      y: this.bottomEncounterY,
    };

    const isNear = (x: number, y: number, point: { x: number; y: number }): boolean =>
      Math.hypot(x - point.x, y - point.y) < this.encounterTolerance;

    const s2AtTop = isNear(this.companionOneX(), this.companionOneY(), topPoint);

    const s2AtBottom = isNear(this.companionOneX(), this.companionOneY(), bottomPoint);

    const s3AtTop = isNear(this.companionTwoX(), this.companionTwoY(), topPoint);

    const s3AtBottom = isNear(this.companionTwoX(), this.companionTwoY(), bottomPoint);

    /*
     * -------------------------------------------------------
     * START BINARY MANEUVER
     * -------------------------------------------------------
     *
     * One star must be at the top and the other
     * at the bottom.
     *
     * No convergence.
     * No inward movement.
     * No stopping.
     */

    if (s2AtTop && s3AtBottom) {
      this.entryPointOne = topPoint;
      this.entryPointTwo = bottomPoint;

      this.binaryStartAngle = -Math.PI / 2;

      this.binaryAngle = this.binaryStartAngle;

      this.binaryProgress = 0;

      this.orbitalPhase = 'binary';
    } else if (s2AtBottom && s3AtTop) {
      this.entryPointOne = bottomPoint;
      this.entryPointTwo = topPoint;

      this.binaryStartAngle = Math.PI / 2;

      this.binaryAngle = this.binaryStartAngle;

      this.binaryProgress = 0;

      this.orbitalPhase = 'binary';
    }
  }

  // =========================================================
  // BINARY ORBIT
  // =========================================================

  private updateBinaryOrbit(deltaTime: number): void {
    /*
     * Advance through exactly ONE HALF revolution.
     *
     * S2:
     *   top    → bottom
     *
     * S3:
     *   bottom → top
     *
     * They never move toward the center.
     * They simply rotate around S1.
     */

    this.binaryProgress += deltaTime;

    const progress = Math.min(this.binaryProgress / this.binaryDuration, 1);

    this.binaryAngle = this.binaryStartAngle + progress * Math.PI;
    /*
     * Radius of the binary circle.
     *
     * This is exactly the distance from S1
     * to the top/bottom encounter points.
     */

    const binaryRadius = Math.abs(this.topEncounterY - this.centerY);

    /*
     * -------------------------------------------------------
     * S2
     * -------------------------------------------------------
     */

    const s2x = this.centerX + Math.cos(this.binaryAngle) * binaryRadius;

    const s2y = this.centerY + Math.sin(this.binaryAngle) * binaryRadius;

    /*
     * -------------------------------------------------------
     * S3
     * -------------------------------------------------------
     *
     * Always exactly opposite S2.
     */

    const s3x = this.centerX - Math.cos(this.binaryAngle) * binaryRadius;

    const s3y = this.centerY - Math.sin(this.binaryAngle) * binaryRadius;

    this.companionOneX.set(s2x);
    this.companionOneY.set(s2y);

    this.companionTwoX.set(s3x);
    this.companionTwoY.set(s3y);

    /*
     * -------------------------------------------------------
     * FINISHED
     * -------------------------------------------------------
     */

    if (progress >= 1) {
      /*
       * Swap the physical orbits.
       */

      const temporary = this.starTwoOrbit;

      this.starTwoOrbit = this.starThreeOrbit;

      this.starThreeOrbit = temporary;

      /*
       * The stars are now sitting exactly on
       * the opposite encounter points.
       *
       * Calculate those exact positions as angles
       * on their NEW orbits.
       */

      this.companionOneAngle = this.calculateAngleOnOrbit(this.starTwoOrbit, {
        x: this.companionOneX(),
        y: this.companionOneY(),
      });

      this.companionTwoAngle = this.calculateAngleOnOrbit(this.starThreeOrbit, {
        x: this.companionTwoX(),
        y: this.companionTwoY(),
      });

      /*
       * Prevent the same intersection from
       * immediately triggering again.
       */

      this.encounterCooldownRemaining = this.encounterCooldownDuration;

      /*
       * Reset binary state.
       */

      this.binaryProgress = 0;

      /*
       * GO DIRECTLY BACK TO NORMAL ORBIT.
       *
       * No exit phase.
       * No interpolation.
       * No pause.
       */

      this.orbitalPhase = 'normal';
    }
  }

  // =========================================================
  // START ORBIT
  // =========================================================

  private startOrbit(): void {
    this.previousTime = performance.now();

    /*
     * Put the stars into their initial
     * orbital positions immediately.
     */

    this.updateInitialStarPositions();

    /*
     * Start the animation loop.
     */

    this.animationFrameId = requestAnimationFrame((time) => this.animateOrbit(time));
  }

  // =========================================================
  // ORBIT ANIMATION
  // =========================================================

  /*
   * The logo remains fixed at:
   *
   *   600, 350
   *
   * S2 and S3 follow their elliptical paths.
   *
   * The moon independently orbits S2.
   *
   * Whenever one companion sits at the top
   * intersection while the other sits at the
   * bottom (either can be at either point),
   * they're pulled inward to circle the fixed
   * center star (S1) together twice, then
   * head back out — each onto the OTHER'S
   * former orbit — through the same point it
   * came in from. This repeats indefinitely
   * for as long as the animation runs.
   */

  private animateOrbit(time: number): void {
    /*
     * -------------------------------------------------------
     * FRAME TIME
     * -------------------------------------------------------
     */

    const deltaTime = time - this.previousTime;

    this.previousTime = time;

    /*
     * Convert milliseconds to seconds.
     */

    const seconds = deltaTime / 1000;

    /*
     * -------------------------------------------------------
     * ORBITAL STATE
     * -------------------------------------------------------
     */

    if (this.orbitalPhase === 'binary') {
      this.updateBinaryOrbit(seconds);
    } else {
      this.updateNormalOrbit(seconds);
    }

    /*
     * -------------------------------------------------------
     * MOON AROUND S2
     * -------------------------------------------------------
     *
     * The moon does not orbit the logo.
     *
     * It orbits Companion 1 / S2.
     */
    const moonAngularVelocity = (Math.PI * 2) / this.moonPeriod;

    this.moonAngle += moonAngularVelocity * seconds;

    const moonLocalX = this.moonRadiusX * Math.cos(this.moonAngle);

    const moonLocalY = this.moonRadiusY * Math.sin(this.moonAngle);

    this.moonX.set(moonLocalX);

    this.moonY.set(moonLocalY);

    const moonOneAngularVelocity = (Math.PI * 2) / this.moonOnePeriod;

    this.moonOneAngle += moonOneAngularVelocity * seconds;

    const moonOneLocalX = this.moonOneRadiusX * Math.cos(this.moonOneAngle);

    const moonOneLocalY = this.moonOneRadiusY * Math.sin(this.moonOneAngle);

    this.moonOneX.set(moonOneLocalX);

    this.moonOneY.set(moonOneLocalY);

    /*
     * -------------------------------------------------------
     * NEXT FRAME
     * -------------------------------------------------------
     */

    this.animationFrameId = requestAnimationFrame((nextTime) => this.animateOrbit(nextTime));
  }

  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy(): void {
    /*
     * Stop the orbital animation.
     */

    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }

    /*
     * Stop random celestial events.
     */

    if (this.eventTimer !== undefined) {
      clearTimeout(this.eventTimer);
    }

    /*
     * Stop the special-comet timer.
     */

    if (this.specialCometTimer !== undefined) {
      clearTimeout(this.specialCometTimer);
    }
  }
}
