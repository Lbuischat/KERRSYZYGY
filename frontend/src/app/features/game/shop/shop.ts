
import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { Router } from '@angular/router';

import { ShopCbb } from './shop-cbb';
import { PlayerService } from '../../../services/player.service';

type ShopCategory =
  | 'recommended'
  | 'characters'
  | 'weapons'
  | 'abilities'
  | 'materials'
  | 'consumables'
  | 'wishes';

type ShopCurrency = 'credits' | 'xp';
type MessageType = 'sucesso' | 'erro';

interface ShopItem {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  preco: number;
  quantidade: number;
  categoria: ShopCategory;
  moeda: ShopCurrency;
  subcategoria?: string;
}

interface PurchaseHistoryEntry {
  id: string;
  itemId: string;
  nome: string;
  icone: string;
  quantidade: number;
  precoUnitario: number;
  total: number;
  moeda: ShopCurrency;
  data: string;
}

interface ShopSaveData {
  credits: number;
  xp: number;
  quantities: Record<string, number>;
  selectedCategory: ShopCategory;
  wishlistIds?: string[];
  history?: PurchaseHistoryEntry[];
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ShopCbb],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly playerService = inject(PlayerService);

  private readonly STORAGE_KEY = 'game-shop-state';
  private readonly MAX_HISTORY = 100;

  private purchaseInterval:
    ReturnType<typeof setInterval> | null = null;

  private purchaseTimeout:
    ReturnType<typeof setTimeout> | null = null;

  private readonly INITIAL_REPEAT_DELAY = 350;
  private readonly REPEAT_INTERVAL = 90;

  selectedCategory: ShopCategory = 'recommended';

  wishlistIds: string[] = [];

  historico: PurchaseHistoryEntry[] = [];
  historicoAberto = false;

  mensagem = '';
  tipoMensagem: MessageType = 'sucesso';

  // ==========================================
  // CARTEIRA DO JOGADOR
  // ==========================================

  get credits(): number {
    return this.playerService.credits();
  }

  set credits(value: number) {
    this.playerService.setCredits(value);
  }

  // XP da Loja, separado do XP do nível.
  get xp(): number {
    return this.playerService.shopXp();
  }

  set xp(value: number) {
    this.playerService.setShopXp(value);
  }

  // ==========================================
  // CATÁLOGO ORIGINAL
  // ==========================================

  boosts: ShopItem[] = [
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
      subcategoria: 'character-exp'
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
      subcategoria: 'weapon-enhancement'
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
      subcategoria: 'ability'
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
      subcategoria: 'ascension'
    },
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
      subcategoria: 'character-exp'
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
      subcategoria: 'ascension'
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
      subcategoria: 'talent'
    },
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
      subcategoria: 'weapon-exp'
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
      subcategoria: 'weapon-ascension'
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
      subcategoria: 'refinement'
    },
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
      subcategoria: 'ability-exp'
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
      subcategoria: 'ability-core'
    },
    {
      id: 'basic-material',
      nome: 'Structural Alloy',
      descricao:
        'Versatile material used in the fabrication and maintenance of various types of equipment.',
      icone: '◆',
      preco: 250,
      quantidade: 56,
      categoria: 'materials',
      moeda: 'credits'
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
      moeda: 'credits'
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
      moeda: 'credits'
    },
    {
      id: 'energy-food',
      nome: 'High-Density Ration',
      descricao:
        'Compact food developed to provide energy during extended periods of exploration.',
      icone: '○',
      preco: 180,
      quantidade: 8,
      categoria: 'consumables',
      moeda: 'credits'
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
      moeda: 'credits'
    },
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
      subcategoria: 'wish'
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
      subcategoria: 'wish-pack'
    }
  ];

  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================

  ngOnInit(): void {
    this.carregarEstado();
  }

  ngOnDestroy(): void {
    this.pararAcaoContinua();
  }

  // ==========================================
  // CATEGORIAS
  // ==========================================

  selecionarCategoria(category: ShopCategory): void {
    this.selectedCategory = category;
    this.limparMensagem();
    this.salvarEstado();
  }

  // ==========================================
  // ITENS VISÍVEIS
  // ==========================================

  get itensVisiveis(): ShopItem[] {

    // CORREÇÃO:
    // WISHES mostra SOMENTE os itens que
    // o jogador marcou com a estrela dourada.
    //
    // Não mostra automaticamente os produtos
    // que possuem categoria "wishes".
    if (this.selectedCategory === 'wishes') {
      return this.boosts.filter(item =>
        this.wishlistIds.includes(item.id)
      );
    }

    return this.boosts.filter(item =>
      item.categoria === this.selectedCategory
    );
  }

  // ==========================================
  // LISTA DE DESEJOS
  // ==========================================

  isWishlisted(item: ShopItem): boolean {
    return this.wishlistIds.includes(item.id);
  }

  toggleWishlist(item: ShopItem): void {

    if (this.isWishlisted(item)) {

      this.wishlistIds = this.wishlistIds.filter(
        id => id !== item.id
      );

      this.mostrarMensagem(
        `${item.nome} removido dos Wishes.`,
        'sucesso'
      );

    } else {

      this.wishlistIds = [
        ...this.wishlistIds,
        item.id
      ];

      this.mostrarMensagem(
        `✦ ${item.nome} adicionado aos Wishes!`,
        'sucesso'
      );
    }

    this.salvarEstado();
  }

  get totalWishes(): number {
    return this.wishlistIds.length;
  }

  // ==========================================
  // HISTÓRICO DE COMPRAS
  // ==========================================

  alternarHistorico(): void {
    this.historicoAberto = !this.historicoAberto;
  }

  get totalCompras(): number {
    return this.historico.reduce(
      (total, compra) =>
        total + compra.quantidade,
      0
    );
  }

  get totalCreditosGastos(): number {
    return this.historico
      .filter(compra => compra.moeda === 'credits')
      .reduce(
        (total, compra) => total + compra.total,
        0
      );
  }

  formatarData(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return 'Data desconhecida';
    }

    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private registrarCompra(item: ShopItem): void {
    const agora = new Date();
    const anterior = this.historico[0];

    // Agrupa compras seguidas do mesmo produto.
    if (
      anterior &&
      anterior.itemId === item.id &&
      anterior.moeda === item.moeda &&
      agora.getTime() -
        new Date(anterior.data).getTime() < 1500
    ) {

      this.historico = [
        {
          ...anterior,
          quantidade: anterior.quantidade + 1,
          total: anterior.total + item.preco,
          data: agora.toISOString()
        },
        ...this.historico.slice(1)
      ];

      return;
    }

    const compra: PurchaseHistoryEntry = {
      id: `${agora.getTime()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      itemId: item.id,
      nome: item.nome,
      icone: item.icone,
      quantidade: 1,
      precoUnitario: item.preco,
      total: item.preco,
      moeda: item.moeda,
      data: agora.toISOString()
    };

    this.historico = [
      compra,
      ...this.historico
    ].slice(0, this.MAX_HISTORY);
  }

  // ==========================================
  // COMPRAR PRODUTOS
  // ==========================================

  comprar(item: ShopItem): boolean {
    return this.executarCompra(item, true);
  }

  private executarCompra(
    item: ShopItem,
    mostrarFeedback: boolean
  ): boolean {

    const saldo = this.obterSaldo(item);

    if (saldo < item.preco) {
      if (mostrarFeedback) {
        this.mostrarMensagem(
          `Saldo insuficiente para comprar ${item.nome}.`,
          'erro'
        );
      }

      return false;
    }

    // Desconta da carteira do jogador.
    this.definirSaldo(item, saldo - item.preco);

    // Atualiza o item comprado.
    item.quantidade += 1;

    // Registra a transação.
    this.registrarCompra(item);

    // Salva o estado.
    this.salvarEstado();

    if (mostrarFeedback) {
      this.mostrarMensagem(
        `${item.nome} adquirido.`,
        'sucesso'
      );
    }

    return true;
  }

  // ==========================================
  // COMPRA CONTÍNUA
  // ==========================================

  iniciarCompraContinua(item: ShopItem): void {
    this.pararAcaoContinua();

    // Primeira compra imediata.
    if (!this.comprar(item)) {
      return;
    }

    this.purchaseTimeout = setTimeout(() => {
      this.purchaseInterval = setInterval(() => {

        if (this.obterSaldo(item) < item.preco) {
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

    if (!this.executarCompra(item, false)) {
      this.pararAcaoContinua();
    }
  }

  // ==========================================
  // CONTROLE DOS SALDOS
  // ==========================================

  private obterSaldo(item: ShopItem): number {
    return item.moeda === 'xp'
      ? this.xp
      : this.credits;
  }

  private definirSaldo(
    item: ShopItem,
    valor: number
  ): void {

    if (item.moeda === 'xp') {
      this.xp = valor;
    } else {
      this.credits = valor;
    }
  }

  // ==========================================
  // FEEDBACK DAS AÇÕES
  // ==========================================

  private mostrarMensagem(
    mensagem: string,
    tipo: MessageType
  ): void {

    this.mensagem = mensagem;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      if (this.mensagem === mensagem) {
        this.limparMensagem();
      }
    }, 2500);
  }

  private limparMensagem(): void {
    this.mensagem = '';
  }

  // ==========================================
  // VOLTAR AO JOGO
  // ==========================================

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {

    if (
      event.key !== 'Escape' &&
      event.key !== 'Esc'
    ) {
      return;
    }

    event.preventDefault();

    if (this.historicoAberto) {
      this.historicoAberto = false;
    } else {
      this.voltarParaOJogo();
    }
  }

  voltarParaOJogo(): void {
    this.pararAcaoContinua();

    void this.router.navigate(['/game']);
  }

  // ==========================================
  // SALVAR ESTADO DA LOJA
  // ==========================================

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
      wishlistIds: this.wishlistIds,
      history: this.historico
    };

    try {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(state)
      );
    } catch (error) {
      console.warn(
        'Não foi possível salvar a loja.',
        error
      );
    }
  }

  // ==========================================
  // CARREGAR ESTADO DA LOJA
  // ==========================================

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

      const state = JSON.parse(raw) as
        Partial<ShopSaveData>;

      // IMPORTANTE:
      // Não carregamos credits nem xp do estado.
      // O PlayerService controla os dois saldos.

      // CARREGAR WISHES
      if (Array.isArray(state.wishlistIds)) {

        this.wishlistIds = [
          ...new Set(
            state.wishlistIds.filter(
              (id): id is string =>
                typeof id === 'string' &&
                this.boosts.some(
                  item => item.id === id
                )
            )
          )
        ];
      }

      // CARREGAR HISTÓRICO
      if (Array.isArray(state.history)) {

        this.historico = state.history
          .filter(
            (entry): entry is PurchaseHistoryEntry =>
              !!entry &&
              typeof entry.id === 'string' &&
              typeof entry.itemId === 'string' &&
              typeof entry.nome === 'string' &&
              typeof entry.icone === 'string' &&
              typeof entry.quantidade === 'number' &&
              entry.quantidade > 0 &&
              typeof entry.precoUnitario === 'number' &&
              typeof entry.total === 'number' &&
              entry.total >= 0 &&
              (
                entry.moeda === 'credits' ||
                entry.moeda === 'xp'
              ) &&
              typeof entry.data === 'string'
          )
          .slice(0, this.MAX_HISTORY);
      }

      // CARREGAR CATEGORIA
      if (
        this.isValidCategory(state.selectedCategory)
      ) {
        this.selectedCategory =
          state.selectedCategory;
      }

      // CARREGAR QUANTIDADES
      if (state.quantities) {

        for (const item of this.boosts) {

          const quantity =
            state.quantities[item.id];

          if (
            typeof quantity === 'number' &&
            Number.isFinite(quantity)
          ) {

            item.quantidade = Math.max(
              0,
              Math.floor(quantity)
            );
          }
        }
      }

    } catch (error) {

      console.warn(
        'Não foi possível carregar a loja.',
        error
      );
    }
  }

  // ==========================================
  // VALIDAR CATEGORIA
  // ==========================================

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
      'wishes'
    ].includes(value as ShopCategory);
  }
}
