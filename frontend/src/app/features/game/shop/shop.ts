import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { ShopCbb } from './shop-cbb';


type ShopCategory =
  | 'recommended'
  | 'characters'
  | 'weapons'
  | 'abilities'
  | 'materials'
  | 'consumables'
  | 'wishes';

type MessageType = 'sucesso' | 'erro';

interface ShopItem {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  preco: number;
  quantidade: number;
  categoria: ShopCategory;

  /**
   * Which currency is required to purchase this item.
   */
  moeda: 'credits' | 'xp';

  /**
   * Optional category used for future filtering / organization.
   */
  subcategoria?: string;
}

interface ShopSaveData {
  credits: number;
  xp: number;
  quantities: Record<string, number>;
  selectedCategory: ShopCategory;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    ShopCbb
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit, OnDestroy {

  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  /* ============================================================
     STORAGE
     ============================================================ */

  private readonly STORAGE_KEY = 'game-shop-state';


  /* ============================================================
     PLAYER CURRENCIES
     ============================================================ */

  credits = 12480;
  xp = 2840;


  /* ============================================================
     SHOP STATE
     ============================================================ */

  selectedCategory: ShopCategory = 'recommended';

  mensagem = '';
  tipoMensagem: MessageType = 'sucesso';


  /* ============================================================
     PURCHASE STATE
     ============================================================ */

  private purchaseInterval: ReturnType<typeof setInterval> | null = null;

  private purchaseTimeout: ReturnType<typeof setTimeout> | null = null;

  private readonly INITIAL_REPEAT_DELAY = 350;

  private readonly REPEAT_INTERVAL = 90;


  /* ============================================================
     SHOP ITEMS
     ============================================================ */

  boosts: ShopItem[] = [

    /* --------------------------------------------------------
       RECOMMENDED
       -------------------------------------------------------- */

    {
      id: 'character-exp',
      nome: 'Stellar Concentrate',
      descricao:
        'Condensed energetic matter used to accelerate a character’s development.',
      icone: '✦',
      preco: 500,
      quantidade: 24,
      categoria: 'recommended',
      moeda: 'credits',
      subcategoria: 'character-exp',
    },

    {
      id: 'weapon-material',
      nome: 'Tungsten Alloy',
      descricao:
        'High-strength metallic alloy used in equipment enhancement.',
      icone: '◇',
      preco: 350,
      quantidade: 31,
      categoria: 'recommended',
      moeda: 'credits',
      subcategoria: 'weapon-enhancement',
    },

    {
      id: 'ability-core',
      nome: 'Resonance Charge',
      descricao:
        'Stored energy capable of intensifying the response of abilities and powers.',
      icone: '✧',
      preco: 1200,
      quantidade: 8,
      categoria: 'recommended',
      moeda: 'credits',
      subcategoria: 'ability',
    },

    {
      id: 'ascension-material',
      nome: 'Collapse Matter',
      descricao:
        'Matter altered by extreme gravitational conditions, used to surpass developmental limits.',
      icone: '◆',
      preco: 800,
      quantidade: 12,
      categoria: 'recommended',
      moeda: 'credits',
      subcategoria: 'ascension',
    },


    /* --------------------------------------------------------
       CHARACTERS
       -------------------------------------------------------- */

    {
      id: 'character-exp-large',
      nome: 'Refined Stellar Concentrate',
      descricao:
        'A highly concentrated form of stellar energy capable of considerably accelerating development.',
      icone: '✦',
      preco: 1200,
      quantidade: 6,
      categoria: 'characters',
      moeda: 'credits',
      subcategoria: 'character-exp',
    },

    {
      id: 'character-ascension',
      nome: 'Collapse Residue',
      descricao:
        'Matter remaining from stellar collapse processes, used during advanced stages of development.',
      icone: '◇',
      preco: 1800,
      quantidade: 4,
      categoria: 'characters',
      moeda: 'credits',
      subcategoria: 'ascension',
    },

    {
      id: 'character-skill',
      nome: 'Neural Record',
      descricao:
        'Condensed data containing combat patterns used to enhance abilities.',
      icone: '✧',
      preco: 950,
      quantidade: 14,
      categoria: 'characters',
      moeda: 'credits',
      subcategoria: 'talent',
    },


    /* --------------------------------------------------------
       WEAPONS
       -------------------------------------------------------- */

    {
      id: 'weapon-exp',
      nome: 'Energy Cell',
      descricao:
        'An energy unit used to increase a weapon’s capacity.',
      icone: '⌁',
      preco: 300,
      quantidade: 42,
      categoria: 'weapons',
      moeda: 'credits',
      subcategoria: 'weapon-exp',
    },

    {
      id: 'weapon-ascension',
      nome: 'Iridium Alloy',
      descricao:
        'Extremely durable metallic alloy used in the fabrication and ascension of advanced weaponry.',
      icone: '◆',
      preco: 1500,
      quantidade: 7,
      categoria: 'weapons',
      moeda: 'credits',
      subcategoria: 'weapon-ascension',
    },

    {
      id: 'weapon-core',
      nome: 'Resonance Matrix',
      descricao:
        'An energetic structure used to refine and stabilize a weapon’s operation.',
      icone: '✦',
      preco: 2200,
      quantidade: 3,
      categoria: 'weapons',
      moeda: 'credits',
      subcategoria: 'refinement',
    },


    /* --------------------------------------------------------
       ABILITIES
       -------------------------------------------------------- */

    {
      id: 'ability-exp',
      nome: 'Energy Pulse',
      descricao:
        'A stabilized energetic discharge used to increase the potency of abilities.',
      icone: '✧',
      preco: 700,
      quantidade: 18,
      categoria: 'abilities',
      moeda: 'credits',
      subcategoria: 'ability-exp',
    },

    {
      id: 'ability-core-rare',
      nome: 'Resonance Condensate',
      descricao:
        'Highly concentrated energy capable of producing significant alterations in the manifestation of an ability.',
      icone: '✦',
      preco: 2400,
      quantidade: 2,
      categoria: 'abilities',
      moeda: 'credits',
      subcategoria: 'ability-core',
    },


    /* --------------------------------------------------------
       MATERIALS
       -------------------------------------------------------- */

    {
      id: 'basic-material',
      nome: 'Structural Alloy',
      descricao:
        'Versatile material used in the fabrication and maintenance of various types of equipment.',
      icone: '◆',
      preco: 250,
      quantidade: 56,
      categoria: 'materials',
      moeda: 'credits',
    },

    {
      id: 'rare-material',
      nome: 'Fusion Crystal',
      descricao:
        'Material formed under extreme conditions of temperature and pressure, used in advanced manufacturing processes.',
      icone: '◇',
      preco: 900,
      quantidade: 11,
      categoria: 'materials',
      moeda: 'credits',
    },

    {
      id: 'advanced-material',
      nome: 'Degenerate Matter',
      descricao:
        'Extremely rare material originating under conditions of anomalous density and energy.',
      icone: '✦',
      preco: 3000,
      quantidade: 2,
      categoria: 'materials',
      moeda: 'credits',
    },


    /* --------------------------------------------------------
       CONSUMABLES
       -------------------------------------------------------- */

    {
      id: 'energy-food',
      nome: 'High-Density Ration',
      descricao:
        'Compact food developed to provide energy during extended periods of exploration.',
      icone: '○',
      preco: 180,
      quantidade: 8,
      categoria: 'consumables',
      moeda: 'credits',
    },

    {
      id: 'exp-booster',
      nome: 'Metabolic Stimulant',
      descricao:
        'A compound that temporarily accelerates metabolic processes and improves the assimilation of experience.',
      icone: '✦',
      preco: 850,
      quantidade: 4,
      categoria: 'consumables',
      moeda: 'credits',
    },


    /* --------------------------------------------------------
       WISHES
       -------------------------------------------------------- */

    {
      id: 'wish-token',
      nome: 'Stellar Resonator',
      descricao:
        'A device capable of establishing temporary resonance with the stellar phenomenon.',
      icone: '✦',
      preco: 160,
      quantidade: 18,
      categoria: 'wishes',
      moeda: 'credits',
      subcategoria: 'wish',
    },

    {
      id: 'wish-pack',
      nome: 'Resonator Set',
      descricao:
        'A set of resonators prepared for multiple attempts to establish contact with the phenomenon.',
      icone: '✦',
      preco: 1500,
      quantidade: 2,
      categoria: 'wishes',
      moeda: 'credits',
      subcategoria: 'wish-pack',
    },
  ];


  /* ============================================================
     ANGULAR LIFECYCLE
     ============================================================ */

  ngOnInit(): void {
    this.carregarEstado();
  }


  ngOnDestroy(): void {
    this.pararAcaoContinua();
  }


  /* ============================================================
     CATEGORY
     ============================================================ */

  selecionarCategoria(category: ShopCategory): void {
    this.selectedCategory = category;

    this.limparMensagem();

    this.salvarEstado();
  }


  /* ============================================================
     FILTERED ITEMS
     ============================================================ */

  get itensVisiveis(): ShopItem[] {

    if (this.selectedCategory === 'recommended') {
      return this.boosts.filter(
        item => item.categoria === 'recommended'
      );
    }

    return this.boosts.filter(
      item => item.categoria === this.selectedCategory
    );
  }


  /* ============================================================
     PURCHASE
     ============================================================ */

  comprar(item: ShopItem): void {

    const currency = this.obterSaldo(item);

    if (currency < item.preco) {
      this.mostrarMensagem(
        `Saldo insuficiente para comprar ${item.nome}.`,
        'erro'
      );

      return;
    }

    this.definirSaldo(
      item,
      currency - item.preco
    );

    item.quantidade += 1;

    this.mostrarMensagem(
      `${item.nome} adquirido.`,
      'sucesso'
    );

    this.salvarEstado();
  }


  /* ============================================================
     CONTINUOUS PURCHASE
     ============================================================ */

  iniciarCompraContinua(item: ShopItem): void {

    this.pararAcaoContinua();

    /*
     * Compra imediatamente ao pressionar.
     */
    this.comprar(item);

    /*
     * Depois de segurar o botão por um curto período,
     * começa a repetir automaticamente.
     */
    this.purchaseTimeout = setTimeout(() => {

      this.purchaseInterval = setInterval(() => {

        const saldo = this.obterSaldo(item);

        if (saldo < item.preco) {
          this.pararAcaoContinua();

          this.mostrarMensagem(
            `Saldo insuficiente para comprar ${item.nome}.`,
            'erro'
          );

          return;
        }

        this.comprarSilenciosamente(item);

      }, this.REPEAT_INTERVAL);

    }, this.INITIAL_REPEAT_DELAY);
  }


  pararAcaoContinua(): void {

    if (this.purchaseTimeout) {
      clearTimeout(this.purchaseTimeout);
      this.purchaseTimeout = null;
    }

    if (this.purchaseInterval) {
      clearInterval(this.purchaseInterval);
      this.purchaseInterval = null;
    }
  }


  private comprarSilenciosamente(item: ShopItem): void {

    const saldo = this.obterSaldo(item);

    if (saldo < item.preco) {
      this.pararAcaoContinua();
      return;
    }

    this.definirSaldo(
      item,
      saldo - item.preco
    );

    item.quantidade += 1;

    this.salvarEstado();
  }


  /* ============================================================
     CURRENCY
     ============================================================ */

  private obterSaldo(item: ShopItem): number {

    if (item.moeda === 'xp') {
      return this.xp;
    }

    return this.credits;
  }


  private definirSaldo(
    item: ShopItem,
    valor: number
  ): void {

    if (item.moeda === 'xp') {
      this.xp = valor;
      return;
    }

    this.credits = valor;
  }


  /* ============================================================
     FEEDBACK
     ============================================================ */

  private mostrarMensagem(
    mensagem: string,
    tipo: MessageType
  ): void {

    this.mensagem = mensagem;
    this.tipoMensagem = tipo;

    /*
     * Remove a mensagem automaticamente.
     */
    setTimeout(() => {

      if (this.mensagem === mensagem) {
        this.limparMensagem();
      }

    }, 2500);
  }


  private limparMensagem(): void {
    this.mensagem = '';
  }


  /* ============================================================
     NAVIGATION
     ============================================================ */

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {

    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this.voltarParaOJogo();
    }
  }

  voltarParaOJogo(): void {

    /*
     * Make sure a held purchase cannot continue
     * after leaving the shop.
     */
    this.pararAcaoContinua();

    this.router.navigate(['/game']);
  }


  /* ============================================================
     LOCAL STORAGE
     ============================================================ */

  private salvarEstado(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const quantities: Record<string, number> = {};

    for (const item of this.boosts) {
      quantities[item.id] = item.quantidade;
    }

    const state: ShopSaveData = {
      credits: this.credits,
      xp: this.xp,
      quantities,
      selectedCategory: this.selectedCategory,
    };

    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.warn(
        'Não foi possível salvar o estado da loja.',
        error
      );
    }
  }


  private carregarEstado(): void {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {

      const raw = localStorage.getItem(
        this.STORAGE_KEY
      );

      if (!raw) {
        return;
      }

      const state = JSON.parse(
        raw
      ) as Partial<ShopSaveData>;
      /*
       * Currency
       */

      if (typeof state.credits === 'number') {
        this.credits = state.credits;
      }

      if (typeof state.xp === 'number') {
        this.xp = state.xp;
      }


      /*
       * Selected category
       */

      if (this.isValidCategory(state.selectedCategory)) {
        this.selectedCategory =
          state.selectedCategory;
      }


      /*
       * Item quantities
       */

      if (state.quantities) {

        for (const item of this.boosts) {

          const quantity =
            state.quantities[item.id];

          if (typeof quantity === 'number') {
            item.quantidade = Math.max(
              0,
              Math.floor(quantity)
            );
          }
        }
      }

    } catch (error) {

      console.warn(
        'Não foi possível carregar o estado da loja.',
        error
      );

    }
  }


  private isValidCategory(
    value: unknown
  ): value is ShopCategory {

    return [
      'recommended',
      'characters',
      'weapons',
      'abilities',
      'materials',
      'consumables',
      'wishes',
    ].includes(value as ShopCategory);
  }
}