
import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import {
  LanguageService
} from '../../../services/language/language.service';

import {
  AccountSessionService
} from '../../../services/account-session.service';

import {
  PlayerService
} from '../../../services/player.service';

import {
  FocusSessionService
} from '../../../services/tasks/focus-session';

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
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements AfterViewInit, OnDestroy {

  // =========================================
  // SERVICES
  // =========================================

  private readonly http = inject(HttpClient);

  private readonly platformId = inject(PLATFORM_ID);

  private readonly router = inject(Router);

  private readonly accountSession =
    inject(AccountSessionService);

  private readonly playerService =
    inject(PlayerService);

  private readonly focusService =
    inject(FocusSessionService);

  // =========================================
  // FORM
  // =========================================

  email = '';
  password = '';

  isLoggingIn = false;
  errorMessage = '';

  // =========================================
  // BACKGROUND STARS
  // =========================================

  backgroundStars: BackgroundStar[] = [];

  // =========================================
  // PLANETARY ANIMATION
  // =========================================

  planetX = signal(810);
  planetY = signal(250);

  moonX = signal(0);
  moonY = signal(0);

  private animationFrameId?: number;

  private entranceTimer?: ReturnType<typeof setTimeout>;

  private googleWaitTimer?: ReturnType<typeof setTimeout>;

  private destroyed = false;

  private previousTime = 0;
  private planetAngle = 0;
  private moonAngle = 0;

  private readonly orbitCenterX = 450;
  private readonly orbitCenterY = 250;

  private readonly orbitRadiusX = 360;
  private readonly orbitRadiusY = 185;

  private readonly planetPeriod = 42;
  private readonly moonPeriod = 7;

  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor(
    public readonly languageService: LanguageService
  ) {
    this.createBackgroundStars();

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) {
        return;
      }

      this.entranceTimer = setTimeout(() => {
        if (!this.destroyed) {
          this.startAnimation();
        }
      }, 3000);
    });
  }

  // =========================================
  // INITIALIZE GOOGLE
  // =========================================

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.waitForGoogle();
  }

  // =========================================
  // EMAIL LOGIN
  // =========================================

  login(): void {
    if (this.isLoggingIn) {
      return;
    }

    this.errorMessage = '';

    const email = this.email.trim().toLowerCase();

    if (!email || !this.password) {
      this.errorMessage =
        'Preencha o e-mail e a senha.';
      return;
    }

    this.isLoggingIn = true;

    this.http.post<unknown>(
      'http://localhost:3000/users/login',
      {
        email,
        password: this.password
      }
    ).subscribe({
      next: (response: unknown) => {
        this.isLoggingIn = false;

        this.finishLogin(response);
      },

      error: (error: HttpErrorResponse) => {
        this.isLoggingIn = false;

        if (error.status === 0) {
          this.errorMessage =
            'Não foi possível conectar ao backend. Verifique o NestJS e o MongoDB.';
        } else if (
          error.status === 400 ||
          error.status === 401 ||
          error.status === 404
        ) {
          this.errorMessage =
            'E-mail ou senha incorretos.';
        } else {
          this.errorMessage =
            'Não foi possível fazer login. Tente novamente.';
        }

        console.error('Falha no login:', error);
      }
    });
  }

  // =========================================
  // LOGIN SUCCESS
  // =========================================

  private finishLogin(response: unknown): void {

    // 1. Verifica se o backend retornou
    // uma conta identificável.
    const activated =
      this.accountSession.activateFromBackend(response);

    if (!activated) {
      this.errorMessage =
        'O backend não retornou uma identificação válida do usuário.';
      return;
    }

    // 2. Atualiza os serviços para a conta
    // que acabou de entrar.
    this.playerService.reloadForCurrentAccount();

    this.focusService.reloadForCurrentAccount();

    // 3. Preenche o nome inicial do jogador
    // com o nome cadastrado, se ele ainda não
    // tiver escolhido outro nome.
    const accountName =
      this.accountSession.accountName();

    const player = this.playerService.profile;

    if (!player.username.trim() && accountName) {
      player.username = accountName;

      this.playerService.saveProfile();
    }

    // 4. Só consideramos concluído o Start
    // quando o botão CONFIRMAR PERSONAGEM
    // foi acionado no Dossiê Pessoal.
    const completedStart =
      this.accountSession.hasCompletedStart();

    // 5. Se não concluiu: entra no Start.
    // Se já concluiu: entra direto no Game.
    const destination = completedStart
      ? '/game'
      : '/start';

    void this.router.navigateByUrl(destination);
  }

  // =========================================
  // GOOGLE LOGIN
  // =========================================

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

  private initializeGoogle(): void {

    google.accounts.id.initialize({
      client_id: environment.googleClientId,

      callback: (response: any) => {

        this.errorMessage = '';
        this.isLoggingIn = true;

        // O token do Google é validado no backend.
        this.http.post<unknown>(
          'http://localhost:3000/users/google',
          {
            credential: response.credential
          }
        ).subscribe({
          next: (user: unknown) => {
            this.isLoggingIn = false;

            this.finishLogin(user);
          },

          error: (error: HttpErrorResponse) => {
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

  // =========================================
  // BACKGROUND STARS
  // =========================================

  private createBackgroundStars(): void {
    const count = 180;

    for (let i = 0; i < count; i++) {
      this.backgroundStars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,

        size: Math.random() < 0.9 ? 1 : 2,

        opacity: 0.08 + Math.random() * 0.17,

        delay: Math.random() * 2.5
      });
    }
  }

  // =========================================
  // START PLANET ANIMATION
  // =========================================

  private startAnimation(): void {
    this.previousTime = performance.now();

    this.planetAngle = 0;
    this.moonAngle = 0;

    this.updatePlanetPosition();

    this.animationFrameId = requestAnimationFrame(
      time => this.animate(time)
    );
  }

  // =========================================
  // ANIMATION LOOP
  // =========================================

  private animate(time: number): void {
    if (this.destroyed) {
      return;
    }

    const deltaTime =
      Math.max(0, (time - this.previousTime) / 1000);

    this.previousTime = time;

    this.planetAngle +=
      ((Math.PI * 2) / this.planetPeriod) *
      deltaTime;

    this.moonAngle +=
      ((Math.PI * 2) / this.moonPeriod) *
      deltaTime;

    this.updatePlanetPosition();

    this.moonX.set(
      17 * Math.cos(this.moonAngle)
    );

    this.moonY.set(
      11 * Math.sin(this.moonAngle)
    );

    this.animationFrameId = requestAnimationFrame(
      nextTime => this.animate(nextTime)
    );
  }

  // =========================================
  // PLANET POSITION
  // =========================================

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

  // =========================================
  // CLEANUP
  // =========================================

  ngOnDestroy(): void {
    this.destroyed = true;

    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.entranceTimer) {
      clearTimeout(this.entranceTimer);
    }

    if (this.googleWaitTimer) {
      clearTimeout(this.googleWaitTimer);
    }
  }
}
