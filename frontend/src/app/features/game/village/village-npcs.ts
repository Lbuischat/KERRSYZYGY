export interface Point { x: number; y: number; }
export interface Stop extends Point { activity: string; seconds: number; }
export interface Resident {
  id: string; name: string; role: string; route: readonly Stop[]; lines: readonly string[];
}
const at = (x: number, y: number, activity: string, seconds = 3): Stop => ({ x, y, activity, seconds });

export const RESIDENTS: readonly Resident[] = [
  { id: 'orion', name: 'Orion', role: 'Prefeito', route: [at(1090, 325, 'Consultando anotações', 4), at(970, 325, 'Observando a rua'), at(865, 410, 'Inspecionando a vila', 4)], lines: [
    'Bem-vindo a Aster. Aqui, cada pequena conquista acende uma estrela.', 'Uma vila não se constrói em um dia. Nem uma constelação.', 'Os slimes foram para o sul. Finalmente posso ouvir meus próprios pensamentos.', 'A praça precisa de uma reforma. O orçamento também.', 'Se encontrar uma estrela caída, não a coloque no bolso. Aprendi isso da pior maneira.'
  ] },
  { id: 'brann', name: 'Brann', role: 'Ferreiro', route: [at(195, 866, 'Martelando metal', 6), at(385, 866, 'Organizando ferramentas', 4), at(385, 940, 'Procurando minério')], lines: [
    'O segredo de uma boa lâmina é paciência. E um martelo que não caia no seu pé.', 'Posso consertar sua espada. A preguiça é outro departamento.', 'Já tentei forjar um fragmento de estrela. Minha barba brilhou por três dias.', 'A guilda me deve três espadas e um pedido de desculpas.', 'Não precisa de uma arma lendária para começar. Só precisa começar.'
  ] },
  { id: 'lyra', name: 'Lyra', role: 'Líder da guilda', route: [at(1070, 925, 'Organizando missões', 5), at(865, 925, 'Vigiando a praça'), at(865, 575, 'Verificando a trilha', 4), at(1050, 575, 'Anotando recados'), at(865, 575, 'Conferindo a rua', 1), at(865, 925, 'Voltando à guilda', 1)], lines: [
    'Nem toda batalha precisa de uma espada. Algumas precisam de concentração.', 'Uma missão pequena concluída vale mais que dez abandonadas.', 'O salão está aberto! Vá até a porta da guilda e pressione E.', 'O sul anda cheio de slimes. Se for explorar, vá preparado.', 'Heróis também descansam. Não confunda descanso com desistência.'
  ] },
  { id: 'mira', name: 'Mira', role: 'Jardineira', route: [at(140, 270, 'Regando flores', 5), at(70, 310, 'Cuidando das sementes', 4), at(215, 310, 'Observando o jardim')], lines: [
    'Até as estrelas precisam de tempo para crescer.', 'Essas flores gostam de luz. Eu gosto de silêncio. Chegamos a um acordo.', 'Sirius diz que fala com as estrelas. Eu falo com as plantas. Estamos empatados.', 'Uma semente por dia já muda um jardim inteiro.', 'Se colher uma fruta, deixe a planta em paz. Ela tem trabalho amanhã.'
  ] },
  { id: 'sirius', name: 'Sirius', role: 'Astrônomo', route: [at(360, 275, 'Anotando constelações', 5), at(430, 315, 'Lendo mapas estelares', 4), at(315, 315, 'Fazendo cálculos')], lines: [
    'O universo é infinito. Minha paciência, infelizmente, não.', 'Você já viu duas estrelas se alinharem? É como o céu lembrando de uma promessa.', 'Hoje contei vinte e sete estrelas. Nova disse que contei a mesma duas vezes.', 'O nome Aster vem das estrelas. O da minha gata vem de um miado.', 'Se estiver perdido, escolha uma direção e dê o primeiro passo.'
  ] },
  { id: 'nova', name: 'Nova', role: 'Exploradora', route: [at(815, 275, 'Conferindo a mochila', 4), at(800, 465, 'Passeando pela rua'), at(695, 465, 'Procurando pistas', 4)], lines: [
    'Vi um slime ontem. Acho que ele estava me julgando.', 'Já atravessei o rio uma vez. Não recomendo repetir meu método.', 'O melhor mapa é aquele que tem espaço para uma descoberta.', 'Não conte ao prefeito, mas eu gosto quando as coisas saem do roteiro.', 'Se achar algo brilhante, me avise. Não prometo devolver.'
  ] },
  { id: 'dorian', name: 'Dorian', role: 'Carpinteiro', route: [at(165, 1200, 'Trabalhando na madeira', 5), at(72, 1200, 'Medindo tábuas', 4), at(250, 1200, 'Separando ferramentas')], lines: [
    'Medi duas vezes, cortei uma e errei mesmo assim.', 'Madeira boa e cabeça tranquila. É tudo de que preciso.', 'Construí a primeira porta desta vila. Brann tentou abrir para o lado errado.', 'O telhado é azul porque Lyra insistiu. Acabou ficando bonito.', 'Não subestime um trabalho pequeno bem-feito.'
  ] },
  { id: 'elara', name: 'Elara', role: 'Moradora', route: [at(380, 1200, 'Varrendo a entrada', 5), at(535, 1200, 'Passeando'), at(535, 930, 'Descansando', 4), at(535, 1200, 'Voltando para casa', 1)], lines: [
    'Já fez suas tarefas hoje? Não tente me enganar!', 'Orion fala de constelações, mas ninguém fala de quem limpa a praça.', 'Sente um pouco. Até os viajantes mais apressados merecem uma pausa.', 'Se ouvir um estrondo, provavelmente é Brann sendo Brann.', 'Aster é pequena, mas tem espaço para quem quer recomeçar.'
  ] }
];
