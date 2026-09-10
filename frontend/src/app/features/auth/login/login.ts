import {
  AfterViewInit,
  Component,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LanguageService } from '../../../services/language/language.service';

interface BackgroundStar {
  left: number;
  top: number;
  size: number;
  opacity: number;
  delay: number;
}

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements AfterViewInit, OnDestroy {
  // =========================================================
  // DEPENDENCIES
  // =========================================================

  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  // =========================================================
  // LOGIN FORM
  // =========================================================

  email = '';
  password = '';
  isLoggingIn = false;
  errorMessage = '';

  // =========================================================
  // BACKGROUND STARS
  // =========================================================

  backgroundStars: BackgroundStar[] = [];

  // =========================================================
  // PLANETARY SYSTEM
  // =========================================================

  planetX = signal(810);
  planetY = signal(250);
  moonX = signal(0);
  moonY = signal(0);

  // =========================================================
  // ANIMATION
  // =========================================================

  private animationFrameId?: number;
  private previousTime = 0;
  private planetAngle = 0;
  private moonAngle = 0;

  // Large orbit - corresponds to the SVG ellipse: cx = 450, cy = 250, rx = 360, ry = 185
  private readonly orbitCenterX = 450;
  private readonly orbitCenterY = 250;
  private readonly orbitRadiusX = 360;
  private readonly orbitRadiusY = 185;

  // Deliberately slow - the planetary system should feel alive, not animated
  private readonly planetPeriod = 42;
  private readonly moonPeriod = 7;

  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(public readonly languageService: LanguageService) {
    this.createBackgroundStars();

    // Everything below is browser-only

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      // Let the visual entrance happen before starting the continuous motion

      setTimeout(() => {
        this.startAnimation();
      }, 3_000);
    });
  }

  // =========================================================
  // ANGULAR VIEW INITIALIZATION
  // =========================================================

  ngAfterViewInit(): void {
    // Google Identity Services is loaded externally, so wait for it to exist
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const checkGoogle = () => {
      if (typeof google === 'undefined') {
        setTimeout(checkGoogle, 100);
        return;
      }

      this.initializeGoogle();
    };

    checkGoogle();
  }

  // =========================================================
  // EMAIL / PASSWORD LOGIN
  // =========================================================

  login(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter your email and password.';
      return;
    }

    this.isLoggingIn = true;

    this.http
      .post('http://localhost:3000/users/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (user) => {
          console.log('✅ LOGIN SUCCESSFUL:', user);

          this.isLoggingIn = false;

          this.router.navigate(['/start']);
        },

        error: (error) => {
          console.error('❌ LOGIN FAILED:', error);
          this.isLoggingIn = false;
          this.errorMessage = 'Invalid email or password.';
        },
      });
  }

  // =========================================================
  // GOOGLE LOGIN
  // =========================================================

  private initializeGoogle(): void {
    console.log('Google Client ID being used:', environment.googleClientId);

    google.accounts.id.initialize({
      client_id: environment.googleClientId,

      callback: (response: any) => {
        console.log('🎉 GOOGLE LOGIN SUCCESS!');

        this.http
          .post('http://localhost:3000/users/google', { credential: response.credential })
          .subscribe({
            next: (user) => {
              console.log('✅ LOGIN SUCCESSFUL:', user);

              this.isLoggingIn = false;

              this.router.navigate(['/start']);
            },

            error: (error) => {
              console.error('❌ BACKEND REJECTED GOOGLE TOKEN:', error);
            },
          });
      },
    });

    const button = document.getElementById('google-button');

    if (!button) {
      console.error('Google button container not found.');
      return;
    }

    google.accounts.id.renderButton(button, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
    });
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
        // Login begins with the stars, so their delays are much earlier than on the title screen
        delay: Math.random() * 2.5,
      });
    }
  }

  // =========================================================
  // START CONTINUOUS ANIMATION
  // =========================================================

  private startAnimation(): void {
    this.previousTime = performance.now();

    // Start the planet at the right side of the ellipse
    this.planetAngle = 0;

    this.updatePlanetPosition();

    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
  }

  // =========================================================
  // ANIMATION LOOP
  // =========================================================

  private animate(time: number): void {
    const deltaTime = (time - this.previousTime) / 1000;
    this.previousTime = time;

    // Planet orbit
    this.planetAngle += ((Math.PI * 2) / this.planetPeriod) * deltaTime;

    this.updatePlanetPosition();

    // Moon orbit
    this.moonAngle += ((Math.PI * 2) / this.moonPeriod) * deltaTime;

    this.moonX.set(17 * Math.cos(this.moonAngle));
    this.moonY.set(11 * Math.sin(this.moonAngle));

    // Continue forever
    this.animationFrameId = requestAnimationFrame((nextTime) => this.animate(nextTime));
  }

  // =========================================================
  // PLANET POSITION
  // =========================================================

  private updatePlanetPosition(): void {
    this.planetX.set(this.orbitCenterX + this.orbitRadiusX * Math.cos(this.planetAngle));

    this.planetY.set(this.orbitCenterY + this.orbitRadiusY * Math.sin(this.planetAngle));
  }

  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy(): void {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
