import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';


interface Boost {
  nome: string;
  descricao: string;
  preco: number;
  icone: string;
  quantidade: number;
}


interface Stat {
  nome: string;
  valor: number;
  preco: number;
  icone: string;
}


@Component({
  selector: 'app-shop',

  imports: [
    RouterLink
  ],

  templateUrl: './shop.html',
  styleUrl: './shop.css'
})


export class Shop implements OnDestroy {


  /* =====================================================
     RECURSOS
  ===================================================== */

  xp: number = 2000;

  credits: number = 10000;



  /* =====================================================
     FEEDBACK
  ===================================================== */

  mensagem: string = '';

  tipoMensagem: 'sucesso' | 'erro' | '' = '';



  /* =====================================================
     CONTROLE DOS BOTÕES SEGURADOS
  ===================================================== */

  private intervaloAcao:
    ReturnType<typeof setInterval> | null = null;


  private tempoMensagem:
    ReturnType<typeof setTimeout> | null = null;



  /* =====================================================
     ITENS
  ===================================================== */

  boosts: Boost[] = [

    {
      nome: 'Impulso de Missão',
      descricao: 'Melhora a recompensa da próxima missão.',
      preco: 100,
      icone: '⚡',
      quantidade: 0
    },

    {
      nome: 'XP Nebuloso',
      descricao: 'Amplifica temporariamente seu ganho de XP.',
      preco: 200,
      icone: '✦',
      quantidade: 0
    },

    {
      nome: 'Reroll Quântico',
      descricao: 'Troca uma tarefa usando tecnologia quântica.',
      preco: 150,
      icone: '↻',
      quantidade: 0
    },

    {
      nome: 'Carga Dupla',
      descricao: 'Duplica a recompensa da próxima atividade.',
      preco: 300,
      icone: '◈',
      quantidade: 0
    },

    {
      nome: 'Escudo de Sequência',
      descricao: 'Protege sua sequência por um ciclo.',
      preco: 500,
      icone: '⬡',
      quantidade: 0
    }

  ];



  /* =====================================================
     MELHORIAS
  ===================================================== */

  stats: Stat[] = [

    {
      nome: 'ATQ',
      valor: 0,
      preco: 10,
      icone: '⚔'
    },

    {
      nome: 'DEF',
      valor: 0,
      preco: 10,
      icone: '⬢'
    },

    {
      nome: 'ENERGIA',
      valor: 0,
      preco: 10,
      icone: '⚡'
    }

  ];



  /* =====================================================
     COMPRAR ITEM
  ===================================================== */

  comprarBoost(
    boost: Boost,
    mostrarFeedback: boolean = true
  ): boolean {


    if (this.xp < boost.preco) {

      this.pararAcaoContinua();


      if (mostrarFeedback) {

        this.mostrarMensagem(
          'XP insuficiente para comprar este item.',
          'erro'
        );

      }


      return false;

    }


    this.xp -= boost.preco;

    boost.quantidade++;


    if (mostrarFeedback) {

      this.mostrarMensagem(
        `${boost.nome} adicionado à carga!`,
        'sucesso'
      );

    }


    return true;

  }



  /* =====================================================
     SEGURAR BOTÃO DE COMPRA
  ===================================================== */

  iniciarCompraContinua(boost: Boost): void {

    this.pararAcaoContinua();


    const comprou =
      this.comprarBoost(boost, false);


    if (!comprou) {

      this.mostrarMensagem(
        'XP insuficiente.',
        'erro'
      );

      return;

    }


    this.intervaloAcao = setInterval(() => {

      const conseguiu =
        this.comprarBoost(boost, false);


      if (!conseguiu) {

        this.pararAcaoContinua();

        this.mostrarMensagem(
          'Seu XP acabou!',
          'erro'
        );

      }

    }, 180);

  }



  /* =====================================================
     AUMENTAR MELHORIA
  ===================================================== */

  aumentarStat(stat: Stat): boolean {

    if (this.credits < stat.preco) {

      this.pararAcaoContinua();

      return false;

    }


    if (stat.valor >= 99) {

      this.pararAcaoContinua();

      return false;

    }


    this.credits -= stat.preco;

    stat.valor++;


    return true;

  }



  /* =====================================================
     DIMINUIR MELHORIA
  ===================================================== */

  diminuirStat(stat: Stat): boolean {

    if (stat.valor <= 0) {

      this.pararAcaoContinua();

      return false;

    }


    stat.valor--;

    this.credits += stat.preco;


    return true;

  }



  /* =====================================================
     SEGURAR +
  ===================================================== */

  iniciarAumentoContinuo(stat: Stat): void {

    this.pararAcaoContinua();


    if (!this.aumentarStat(stat)) {

      this.mostrarMensagem(
        'Não foi possível aumentar essa melhoria.',
        'erro'
      );

      return;

    }


    this.intervaloAcao = setInterval(() => {

      if (!this.aumentarStat(stat)) {

        this.pararAcaoContinua();

      }

    }, 160);

  }



  /* =====================================================
     SEGURAR -
  ===================================================== */

  iniciarDiminuicaoContinua(stat: Stat): void {

    this.pararAcaoContinua();


    this.diminuirStat(stat);


    this.intervaloAcao = setInterval(() => {

      if (!this.diminuirStat(stat)) {

        this.pararAcaoContinua();

      }

    }, 160);

  }



  /* =====================================================
     PARAR
  ===================================================== */

  pararAcaoContinua(): void {

    if (this.intervaloAcao !== null) {

      clearInterval(this.intervaloAcao);

      this.intervaloAcao = null;

    }

  }



  /* =====================================================
     MENSAGEM
  ===================================================== */

  mostrarMensagem(
    texto: string,
    tipo: 'sucesso' | 'erro'
  ): void {


    this.mensagem = texto;

    this.tipoMensagem = tipo;


    if (this.tempoMensagem !== null) {

      clearTimeout(this.tempoMensagem);

    }


    this.tempoMensagem = setTimeout(() => {

      this.mensagem = '';

      this.tipoMensagem = '';

    }, 2500);

  }



  /* =====================================================
     LIMPEZA
  ===================================================== */

  ngOnDestroy(): void {

    this.pararAcaoContinua();


    if (this.tempoMensagem !== null) {

      clearTimeout(this.tempoMensagem);

    }

  }

}