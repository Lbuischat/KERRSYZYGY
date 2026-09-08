import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-mini-map',
  standalone: true,
  templateUrl: './mini-map.html',
  styleUrl: './mini-map.css'
})
export class MiniMap implements AfterViewInit, OnDestroy {

  // =========================
  // POSIÇÕES NO MINI MAPA
  // =========================

  posicaoJogadorX = 50;
  posicaoJogadorY = 65;

  direcaoJogador = 0;

  posicaoInimigoX = 25;
  posicaoInimigoY = 30;


  // Guarda a animação
  private animationFrameId?: number;


  ngAfterViewInit(): void {

    this.atualizarMiniMapa();

  }


  ngOnDestroy(): void {

    if (this.animationFrameId) {

      cancelAnimationFrame(
        this.animationFrameId
      );

    }

  }


  atualizarMiniMapa(): void {

    /*
      ESTES SELETORES PROCURAM
      OS ELEMENTOS REAIS DO JOGO.

      Talvez precisemos alterar os nomes
      dependendo de como seu jogo foi feito.
    */

    const mapa = document.querySelector(
      '.game-map'
    ) as HTMLElement;

    const jogador = document.querySelector(
      '.player'
    ) as HTMLElement;

    const inimigo = document.querySelector(
      '.enemy'
    ) as HTMLElement;


    // Se encontrou mapa e jogador
    if (mapa && jogador) {

      const mapaRect =
        mapa.getBoundingClientRect();

      const jogadorRect =
        jogador.getBoundingClientRect();


      // Centro do jogador
      const jogadorCentroX =
        jogadorRect.left +
        jogadorRect.width / 2;

      const jogadorCentroY =
        jogadorRect.top +
        jogadorRect.height / 2;


      /*
        TRANSFORMA A POSIÇÃO REAL
        EM PORCENTAGEM
      */

      this.posicaoJogadorX =
        (
          (jogadorCentroX - mapaRect.left)
          / mapaRect.width
        ) * 100;


      this.posicaoJogadorY =
        (
          (jogadorCentroY - mapaRect.top)
          / mapaRect.height
        ) * 100;


      // Impede sair do mini mapa
      this.posicaoJogadorX =
        Math.max(
          0,
          Math.min(
            100,
            this.posicaoJogadorX
          )
        );


      this.posicaoJogadorY =
        Math.max(
          0,
          Math.min(
            100,
            this.posicaoJogadorY
          )
        );

    }


    // Se encontrou mapa e inimigo
    if (mapa && inimigo) {

      const mapaRect =
        mapa.getBoundingClientRect();

      const inimigoRect =
        inimigo.getBoundingClientRect();


      // Centro do inimigo
      const inimigoCentroX =
        inimigoRect.left +
        inimigoRect.width / 2;

      const inimigoCentroY =
        inimigoRect.top +
        inimigoRect.height / 2;


      /*
        TRANSFORMA A POSIÇÃO REAL
        EM PORCENTAGEM
      */

      this.posicaoInimigoX =
        (
          (inimigoCentroX - mapaRect.left)
          / mapaRect.width
        ) * 100;


      this.posicaoInimigoY =
        (
          (inimigoCentroY - mapaRect.top)
          / mapaRect.height
        ) * 100;


      // Impede sair do mini mapa
      this.posicaoInimigoX =
        Math.max(
          0,
          Math.min(
            100,
            this.posicaoInimigoX
          )
        );


      this.posicaoInimigoY =
        Math.max(
          0,
          Math.min(
            100,
            this.posicaoInimigoY
          )
        );

    }


    /*
      REPETE A ATUALIZAÇÃO
      CONSTANTEMENTE
    */

    this.animationFrameId =
      requestAnimationFrame(() => {

        this.atualizarMiniMapa();

      });

  }

}
