import {
  inject
} from '@angular/core';

import {
  CanActivateFn,
  CanDeactivateFn,
  Router
} from '@angular/router';

import {
  FocusSessionService
} from './focus-session';


/*
 * =====================================================
 * ENTRADA EM OUTRAS ROTAS
 * =====================================================
 *
 * Se existir um Focus ativo e o jogador tentar
 * entrar em outra página, ele volta para /game.
 */

export const focusGuard:
  CanActivateFn =
  () => {

    const focusService =
      inject(
        FocusSessionService
      );


    const router =
      inject(
        Router
      );


    /*
     * Sem Focus ativo:
     *
     * navegação normal.
     */
    if (
      !focusService.active
    ) {

      return true;

    }


    /*
     * Focus ativo:
     *
     * volta para o jogo.
     */
    return router.createUrlTree([
      '/game'
    ]);

  };


/*
 * =====================================================
 * SAÍDA DO GAME
 * =====================================================
 *
 * Mesmo se algum botão do jogo tentar navegar
 * para outra página, não deixamos enquanto
 * o Focus estiver ativo.
 */

export const focusExitGuard:
  CanDeactivateFn<unknown> =
  () => {

    const focusService =
      inject(
        FocusSessionService
      );


    /*
     * Focus ativo:
     *
     * não pode sair do Game.
     */
    if (
      focusService.active
    ) {

      return false;

    }


    /*
     * Focus terminou:
     *
     * navegação liberada.
     */
    return true;

  };