import {
  AfterViewInit,
  Component,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { LanguageService } from '../../../services/language/language.service';

import { AccountSessionService } from '../../../services/account-session.service';

import { PlayerService } from '../../../services/player.service';

import { FocusSessionService } from '../../../services/tasks/focus-session';


// =========================================================
// BACKGROUND STAR
// =========================================================

interface BackgroundStar {
  left: number;
  top: number;
  size: number;
  opacity: number;
  delay: number;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit, OnDestroy {


  // =========================================================
  // DEPENDENCIES
  // =========================================================

  private readonly http = inject(HttpClient);

  private readonly platformId = inject(PLATFORM_ID);

  private readonly router = inject(Router);

  private readonly accountSession =
    inject(AccountSessionService);

  private readonly playerService =
    inject(PlayerService);

  private readonly focusService =
    inject(FocusSessionService);


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

  private entranceTimer?: ReturnType<typeof setTimeout>;

  private googleWaitTimer?: ReturnType<typeof setTimeout>;

  private destroyed = false;

  private previousTime = 0;

  private planetAngle = 0;

  private moonAngle = 0;


  // =========================================================
  // ORBIT CONFIGURATION
  // =========================================================

  // Corresponds to the SVG ellipse:
  // cx = 450, cy = 250, rx = 360, ry = 185

  private readonly orbitCenterX = 450;

  private readonly orbitCenterY = 250;

  private readonly orbitRadiusX = 360;

  private readonly orbitRadiusY = 185;


  // Deliberately slow planetary movement.

  private readonly planetPeriod = 42;

  private readonly moonPeriod = 7;


  // =========================================================
  // CONSTRUCTOR
  // =========================================================

  constructor(
    public readonly languageService: LanguageService
  ) {

    this.createBackgroundStars();


    // ---------------------------------------------------------
    // Browser-only initialization
    // ---------------------------------------------------------

    afterNextRender(() => {

      if (
        !isPlatformBrowser(this.platformId) ||
        this.destroyed
      ) {

        return;

      }


      // Let the visual entrance happen before starting animation.

      this.entranceTimer = setTimeout(() => {

        if (!this.destroyed) {

          this.startAnimation();

        }

      }, 3000);

    });

  }


  // =========================================================
  // INITIALIZE GOOGLE
  // =========================================================

  ngAfterViewInit(): void {

    if (!isPlatformBrowser(this.platformId)) {

      return;

    }

    this.waitForGoogle();

  }


  // =========================================================
  // EMAIL / PASSWORD LOGIN
  // =========================================================

  login(): void {

    if (
      this.isLoggingIn ||
      this.destroyed
    ) {

      return;

    }


    this.errorMessage = '';


    // ---------------------------------------------------------
    // Normalize and validate input
    // ---------------------------------------------------------

    const email = this.email.trim().toLowerCase();


    if (!email || !this.password) {

      this.errorMessage =
        'Preencha o e-mail e a senha.';

      return;

    }


    // ---------------------------------------------------------
    // Begin request
    // ---------------------------------------------------------

    this.isLoggingIn = true;


    this.http.post<unknown>(
      'http://localhost:3000/users/login',
      {
        email,
        password: this.password
      }
    ).subscribe({

      // -------------------------------------------------------
      // SUCCESS
      // -------------------------------------------------------

      next: (response: unknown) => {

        if (this.destroyed) {

          return;

        }

        this.isLoggingIn = false;

        this.finishLogin(response);

      },


      // -------------------------------------------------------
      // ERROR
      // -------------------------------------------------------

      error: (error: HttpErrorResponse) => {

        if (this.destroyed) {

          return;

        }

        this.isLoggingIn = false;


        if (error.status === 0) {

          this.errorMessage =
            'Não foi possível conectar ao backend. Verifique o NestJS e o MongoDB.';

        }

        else if (
          error.status === 400 ||
          error.status === 401 ||
          error.status === 404
        ) {

          this.errorMessage =
            'E-mail ou senha incorretos.';

        }

        else {

          this.errorMessage =
            'Não foi possível fazer login. Tente novamente.';

        }


        console.error(
          'Falha no login:',
          error
        );

      }

    });

  }


  // =========================================================
  // LOGIN SUCCESS
  // =========================================================

  private finishLogin(response: unknown): void {


    // ---------------------------------------------------------
    // 1. Activate account session
    // ---------------------------------------------------------

    const activated =
      this.accountSession.activateFromBackend(response);


    if (!activated) {

      this.errorMessage =
        'O backend não retornou uma identificação válida do usuário.';

      return;

    }


    // ---------------------------------------------------------
    // 2. Reload account-specific services
    // ---------------------------------------------------------

    this.playerService.reloadForCurrentAccount();

    this.focusService.reloadForCurrentAccount();


    // ---------------------------------------------------------
    // 3. Initialize player username
    // ---------------------------------------------------------

    const accountName =
      this.accountSession.accountName();

    const player = this.playerService.profile;


    if (
      !player.username.trim() &&
      accountName
    ) {

      player.username = accountName;

      this.playerService.saveProfile();

    }


    // ---------------------------------------------------------
    // 4. Check onboarding progress
    // ---------------------------------------------------------

    const completedStart =
      this.accountSession.hasCompletedStart();


    // ---------------------------------------------------------
    // 5. Determine destination
    // ---------------------------------------------------------

    const destination = completedStart
      ? '/game'
      : '/start';


    void this.router.navigateByUrl(destination);

  }


  // =========================================================
  // GOOGLE LOGIN
  // =========================================================

  private waitForGoogle(): void {

    if (this.destroyed) {

      return;

    }


    if (typeof google === 'undefined') {

      this.googleWaitTimer = setTimeout(() => {

        this.waitForGoogle();

      }, 200);

      return;

    }


    this.initializeGoogle();

  }


  // =========================================================
  // INITIALIZE GOOGLE IDENTITY SERVICES
  // =========================================================

  private initializeGoogle(): void {

    if (this.destroyed) {

      return;

    }


    google.accounts.id.initialize({

      client_id: environment.googleClientId,


      callback: (response: any) => {

        if (
          this.destroyed ||
          this.isLoggingIn
        ) {

          return;

        }


        this.errorMessage = '';

        this.isLoggingIn = true;


        // -----------------------------------------------------
        // Validate Google credential through backend
        // -----------------------------------------------------

        this.http.post<unknown>(
          'http://localhost:3000/users/google',
          {
            credential: response.credential
          }
        ).subscribe({

          // ---------------------------------------------------
          // SUCCESS
          // ---------------------------------------------------

          next: (user: unknown) => {

            if (this.destroyed) {

              return;

            }

            this.isLoggingIn = false;

            this.finishLogin(user);

          },


          // ---------------------------------------------------
          // ERROR
          // ---------------------------------------------------

          error: (error: HttpErrorResponse) => {

            if (this.destroyed) {

              return;

            }

            this.isLoggingIn = false;


            this.errorMessage = error.status === 0

              ? 'Backend indisponível. Verifique o NestJS.'

              : 'Não foi possível autenticar com o Google.';


            console.error(
              'Falha no login Google:',
              error
            );

          }

        });

      }

    });


    // ---------------------------------------------------------
    // Render Google button
    // ---------------------------------------------------------

    const button =
      document.getElementById('google-button');


    if (!button) {

      console.warn(
        'Botão do Google não encontrado.'
      );

      return;

    }


    google.accounts.id.renderButton(button, {

      theme: 'outline',

      size: 'large',

      text: 'continue_with'

    });

  }


  // =========================================================
  // BACKGROUND STARS
  // =========================================================

  private createBackgroundStars(): void {

    const numberOfStars = 180;


    for (
      let i = 0;
      i < numberOfStars;
      i++
    ) {

      this.backgroundStars.push({

        left:
          Math.random() * 100,

        top:
          Math.random() * 100,

        size:
          Math.random() < 0.9 ? 1 : 2,

        opacity:
          0.08 + Math.random() * 0.17,

        // Login begins with the stars already revealing.

        delay:
          Math.random() * 2.5

      });

    }

  }


  // =========================================================
  // START CONTINUOUS ANIMATION
  // =========================================================

  private startAnimation(): void {

    if (this.destroyed) {

      return;

    }


    this.previousTime = performance.now();


    // Start the planet at the right side of the ellipse.

    this.planetAngle = 0;

    this.moonAngle = 0;


    this.updatePlanetPosition();


    this.animationFrameId = requestAnimationFrame(
      time => this.animate(time)
    );

  }


  // =========================================================
  // ANIMATION LOOP
  // =========================================================

  private animate(time: number): void {

    if (this.destroyed) {

      return;

    }


    const deltaTime =
      Math.max(
        0,
        (time - this.previousTime) / 1000
      );


    this.previousTime = time;


    // ---------------------------------------------------------
    // Planet orbit
    // ---------------------------------------------------------

    this.planetAngle +=
      ((Math.PI * 2) / this.planetPeriod) *
      deltaTime;


    this.updatePlanetPosition();


    // ---------------------------------------------------------
    // Moon orbit
    // ---------------------------------------------------------

    this.moonAngle +=
      ((Math.PI * 2) / this.moonPeriod) *
      deltaTime;


    this.moonX.set(
      17 * Math.cos(this.moonAngle)
    );

    this.moonY.set(
      11 * Math.sin(this.moonAngle)
    );


    // ---------------------------------------------------------
    // Continue animation
    // ---------------------------------------------------------

    this.animationFrameId = requestAnimationFrame(
      nextTime => this.animate(nextTime)
    );

  }


  // =========================================================
  // PLANET POSITION
  // =========================================================

  private updatePlanetPosition(): void {

    this.planetX.set(
      this.orbitCenterX +
      this.orbitRadiusX *
      Math.cos(this.planetAngle)
    );


    this.planetY.set(
      this.orbitCenterY +
      this.orbitRadiusY *
      Math.sin(this.planetAngle)
    );

  }


  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy(): void {

    this.destroyed = true;


    // ---------------------------------------------------------
    // Cancel animation
    // ---------------------------------------------------------

    if (
      this.animationFrameId !== undefined
    ) {

      cancelAnimationFrame(
        this.animationFrameId
      );

    }


    // ---------------------------------------------------------
    // Clear entrance timer
    // ---------------------------------------------------------

    if (this.entranceTimer) {

      clearTimeout(
        this.entranceTimer
      );

    }


    // ---------------------------------------------------------
    // Clear Google initialization timer
    // ---------------------------------------------------------

    if (this.googleWaitTimer) {

      clearTimeout(
        this.googleWaitTimer
      );

    }

  }

}