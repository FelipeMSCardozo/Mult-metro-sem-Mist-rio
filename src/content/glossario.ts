export interface TermoGlossario {
  termo: string;
  definicaoSimples: string;
  analogia: string;
  comoMede: string;
  unidade: string;
}

export const TERMOS_GLOSSARIO: TermoGlossario[] = [
  {
    termo: 'Tensão (Voltagem)',
    definicaoSimples: 'A "pressão" elétrica que empurra os elétrons através dos fios.',
    analogia: 'Pense em uma caixa d\'água alta: quanto mais alta a caixa, maior a pressão na torneira do térreo.',
    comoMede: 'Em paralelo, com o circuito ligado, na escala V⎓ (20V DC).',
    unidade: 'Volt (V)',
  },
  {
    termo: 'Corrente Elétrica (Amperagem)',
    definicaoSimples: 'A quantidade de elétrons que passa por um ponto do circuito a cada segundo.',
    analogia: 'É a vazão de água que sai da mangueira: quantos litros por minuto estão correndo.',
    comoMede: 'Em série (abrindo o circuito), na escala mA ou A. Exige cuidado para não queimar o fusível.',
    unidade: 'Ampère (A) ou Miliampère (mA)',
  },
  {
    termo: 'Resistência Elétrica',
    definicaoSimples: 'A dificuldade ou oposição que um material oferece à passagem da corrente elétrica.',
    analogia: 'É como pisar na mangueira de água: você aperta e a água passa com mais dificuldade e menos vazão.',
    comoMede: 'Com o circuito DESLIGADO, na escala de Ohms (Ω).',
    unidade: 'Ohm (Ω), Quilohm (kΩ = 1.000 Ω) ou Megaohm (MΩ = 1.000.000 Ω)',
  },
  {
    termo: 'Terra / GND (Ground)',
    definicaoSimples: 'O ponto de referência zero volts (0V) de todo o circuito.',
    analogia: 'É o ralo da pia: para a água descer pelo cano, precisa existir um ralo aberto em nível inferior.',
    comoMede: 'A ponta de prova PRETA do multímetro quase sempre fica conectada no GND como referência.',
    unidade: '0 Volts (referência)',
  },
  {
    termo: 'Curto-Circuito',
    definicaoSimples: 'Quando o polo positivo (5V) toca diretamente no terra (GND) sem nenhuma peça no caminho.',
    analogia: 'É como arrombar o fundo da caixa d\'água: toda a água escapa instantaneamente com força violenta.',
    comoMede: 'No modo de continuidade/apito (com circuito desligado): se apitar direto entre 5V e GND, há curto.',
    unidade: 'Resistência próxima de 0 Ω',
  },
  {
    termo: 'Queda de Tensão',
    definicaoSimples: 'A quantidade de voltagem que um componente consome para realizar seu trabalho.',
    analogia: 'É como um moinho de água no meio do rio: a água perde pressão ao girar a roda do moinho.',
    comoMede: 'Colocando uma ponta antes do componente e a outra ponta depois dele na escala de V DC.',
    unidade: 'Volt (V)',
  },
  {
    termo: 'Polaridade',
    definicaoSimples: 'A orientação correta dos terminais positivo (+) e negativo (-).',
    analogia: 'É como uma pilha comum de controle remoto: se colocar virada ao contrário, o controle não liga.',
    comoMede: 'No modo diodo ou tensão: se o multímetro mostrar um sinal negativo (-), as pontas estão invertidas.',
    unidade: '+ e -',
  },
];
