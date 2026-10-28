export interface RegraSeguranca {
  id: string;
  titulo: string;
  resumo: string;
  explicacao: string;
  perigo: string;
  comoFazerCerto: string;
}

export const REGRAS_SEGURANCA: RegraSeguranca[] = [
  {
    id: 'sem-tomada',
    titulo: 'Nunca meça a tomada de parede (127V / 220V)',
    resumo: 'Este material ensina apenas circuitos de baixa tensão em corrente contínua (5V a 12V).',
    explicacao: 'A rede elétrica doméstica tem tensão suficiente para provocar choque grave, queimaduras e arcos elétricos se as pontas do multímetro tocarem em posições erradas ou se o seletor estiver em ohms.',
    perigo: 'Risco de choque elétrico letal, queima imediata do aparelho e princípio de incêndio.',
    comoFazerCerto: 'Trabalhe exclusivamente com a alimentação do cabo USB (5V), pilhas ou fontes seguras de bancada de até 12V DC.',
  },
  {
    id: 'circuito-desligado-resistencia',
    titulo: 'Resistência e Continuidade exigem circuito DESLIGADO',
    resumo: 'Tire o cabo USB da placa antes de medir ohms (Ω) ou usar o apito de continuidade.',
    explicacao: 'O multímetro mede resistência injetando uma voltagem minúscula da sua própria bateria interna de 9V. Se a sua placa estiver ligada na USB, a tensão externa de 5V entra no circuito interno do multímetro e altera o valor ou queima a proteção.',
    perigo: 'Leitura completamente falsa e risco de danificar a escala de resistência do multímetro.',
    comoFazerCerto: 'Desconecte o cabo USB do computador, encoste as pontas no componente e só religue o cabo depois que terminar de medir.',
  },
  {
    id: 'tensao-paralelo-corrente-serie',
    titulo: 'Tensão se mede em paralelo; Corrente se mede em série',
    resumo: 'Tensão é a diferença entre dois pontos. Corrente é o fluxo que precisa atravessar o multímetro.',
    explicacao: 'Para medir voltagem (V), você apenas encosta as duas pontas por fora sem mexer nos fios. Para medir corrente (mA ou A), você precisa abrir o circuito e fazer a corrente entrar pela ponta vermelha e sair pela ponta preta.',
    perigo: 'Se você tentar medir corrente colocando as pontas em paralelo nos pinos 5V e GND, você cria um curto-circuito direto e queima o fusível interno do multímetro instantaneamente.',
    comoFazerCerto: 'Na dúvida, mantenha o seletor sempre em Voltagem DC (20V) e nunca mude a ponta vermelha de borne sem ter certeza absoluta.',
  },
];
