import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';


interface Personagem {
  nome: string;
  classe: string;
  frase: string;
  estilo: string;
  tema: string;
  imagem: string;
}


@Component({
  selector: 'app-player-info',

  imports: [
    RouterLink,
    FormsModule
  ],

  templateUrl: './player-info.html',
  styleUrl: './player-info.css'
})


export class PlayerInfo {


  /* =====================================================
     PERSONAGENS
  ===================================================== */

  personagens: Personagem[] = [

    {
      nome: 'Astra',
      classe: 'Explorer',
      frase: 'Ready for the journey.',
      estilo: 'Cosmic',
      tema: 'Adventurer',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Luna',
      classe: 'Mage',
      frase: 'The stars will guide me.',
      estilo: 'Mystic',
      tema: 'Cosmic',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Nova',
      classe: 'Warrior',
      frase: 'My journey starts here.',
      estilo: 'Battle',
      tema: 'Adventurer',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Orion',
      classe: 'Ranger',
      frase: 'Always looking beyond.',
      estilo: 'Explorer',
      tema: 'Space',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    },


    {
      nome: 'Stella',
      classe: 'Guardian',
      frase: 'I will protect this world.',
      estilo: 'Guardian',
      tema: 'Cosmic',

      imagem:
        'https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg'
    }

  ];


  /* =====================================================
     PERSONAGEM SELECIONADO
  ===================================================== */

  personagemSelecionado: number = 0;


  /* =====================================================
     CONTROLE DOS FEEDBACKS
  ===================================================== */

  formIncompleto: boolean = false;

  perfilCriado: boolean = false;

  mostrarSucesso: boolean = false;


  /* =====================================================
     PERSONAGEM ATUAL
  ===================================================== */

  get personagemAtual(): Personagem {

    return this.personagens[this.personagemSelecionado];

  }


  /* =====================================================
     PRÓXIMO PERSONAGEM
  ===================================================== */

  proximoPersonagem(): void {

    this.personagemSelecionado =
      (this.personagemSelecionado + 1)
      % this.personagens.length;

  }


  /* =====================================================
     PERSONAGEM ANTERIOR
  ===================================================== */

  personagemAnterior(): void {

    this.personagemSelecionado =
      (
        this.personagemSelecionado
        - 1
        + this.personagens.length
      )
      % this.personagens.length;

  }


  /* =====================================================
     SELECIONAR PERSONAGEM PELAS BOLINHAS
  ===================================================== */

  selecionarPersonagem(index: number): void {

    this.personagemSelecionado = index;

  }


  /* =====================================================
     CRIAR PERFIL
  ===================================================== */

  criarPerfil(form: NgForm): void {


    /* Se algum campo estiver incompleto */

    if (form.invalid) {

      this.formIncompleto = true;

      this.mostrarSucesso = false;


      /* Mostra os erros nos campos */

      form.control.markAllAsTouched();


      return;

    }


    /* Se estiver tudo preenchido */

    this.formIncompleto = false;

    this.perfilCriado = true;

    this.mostrarSucesso = true;


    console.log(
      'Informações do perfil:',
      form.value
    );


    console.log(
      'Personagem escolhido:',
      this.personagemAtual
    );


    /* Esconde somente a mensagem depois de 3 segundos */

    setTimeout(() => {

      this.mostrarSucesso = false;

    }, 3000);

  }

}