export interface ItemChecklist {
  id: string;
  categoria: 'energia' | 'ligacao' | 'componentes' | 'codigo';
  titulo: string;
  descricao: string;
  comoTestar: string;
}

export const ITENS_CHECKLIST: ItemChecklist[] = [
  {
    id: 'check-led-on',
    categoria: 'energia',
    titulo: 'O LED verde "ON" do Arduino está aceso e brilhante?',
    descricao: 'Se o LED "ON" estiver fraco ou apagado, a placa não está recebendo energia ou há um curto derrubando os 5V.',
    comoTestar: 'Meça a voltagem entre o pino 5V e GND com o multímetro em 20V DC. Deve marcar ~5.0V.',
  },
  {
    id: 'check-gnd-comum',
    categoria: 'ligacao',
    titulo: 'O GND do Arduino está ligado à linha azul da protoboard?',
    descricao: 'Todos os componentes precisam de um caminho de volta para o terra da placa.',
    comoTestar: 'Use o modo apito do multímetro (com USB desligado) entre o pino GND da placa e a perna negativa do componente.',
  },
  {
    id: 'check-va-central',
    categoria: 'ligacao',
    titulo: 'Os circuitos respeitam o vão central da protoboard?',
    descricao: 'As duas metades da protoboard são separadas pelo canalete central.',
    comoTestar: 'Chips integrados e botões push-button devem ser espetados sobre o vão central para evitar curto entre seus dois lados.',
  },
  {
    id: 'check-polaridade-led',
    categoria: 'componentes',
    titulo: 'Os LEDs estão na polaridade correta (ânodo no sinal, cátodo no GND)?',
    descricao: 'LED invertido não queima, mas não acende nem conduz eletricidade.',
    comoTestar: 'No modo Diodo do multímetro, teste o LED solto: ele deve dar um leve brilho quando a ponta vermelha toca a perna longa.',
  },
  {
    id: 'check-resistores-valor',
    categoria: 'componentes',
    titulo: 'Você conferiu o valor dos resistores na escala de Ohms?',
    descricao: 'Resistor de 220 Ω tem anéis Vermelho-Vermelho-Marrom; resistor de 10k tem Marrom-Preto-Laranja.',
    comoTestar: 'Meça na escala de 2kΩ ou 20kΩ antes de espetar no circuito.',
  },
  {
    id: 'check-pinos-codigo',
    categoria: 'codigo',
    titulo: 'O número do pino no código bate exatamente com o pino físico?',
    descricao: 'Erro de um número (ex: código em D8 e jumper em D9) é responsável por 40% das dúvidas de bancada.',
    comoTestar: 'Aponte o dedo para o furo da barra do Arduino e acompanhe a trilha do fio até a protoboard.',
  },
  {
    id: 'check-cabo-dados',
    categoria: 'energia',
    titulo: 'O cabo USB é de transferência de dados e não apenas de recarga?',
    descricao: 'Cabos simples de celular só passam energia e não deixam a porta serial aparecer.',
    comoTestar: 'Veja se a IDE do Arduino lista a porta COM ou /dev/cu.usb... no menu Ferramentas -> Porta.',
  },
  {
    id: 'check-input-pullup',
    categoria: 'codigo',
    titulo: 'Se usar botão tátil, o código declara pinMode(pino, INPUT_PULLUP)?',
    descricao: 'Sem pull-up, o pino digital fica flutuando e lê 0 e 1 de forma maluca.',
    comoTestar: 'Meça a tensão no pino com o botão solto: deve marcar 5.0V estáveis.',
  },
];
