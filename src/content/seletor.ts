import { MultimeterMode } from '../illustrations/HardwareSvgs';

export interface PosicaoSeletor {
  mode: MultimeterMode;
  nome: string;
  simbolo: string;
  escalaRecomendada: string;
  paraQueServe: string;
  quandoUsar: string;
  quandoNaoUsar: string;
  pontaPreta: string;
  pontaVermelha: string;
  dicaDeBancada: string;
}

export const POSICOES_SELETOR: PosicaoSeletor[] = [
  {
    mode: 'DCV_20',
    nome: 'Tensão Contínua (DC)',
    simbolo: 'V⎓ (20V)',
    escalaRecomendada: 'Escala de 20V (DCV ou V=)',
    paraQueServe: 'Mede a voltagem de fontes de corrente contínua, pilhas, baterias e dos pinos de alimentação ou sinal do Arduino.',
    quandoUsar: 'Sempre que você quiser saber se o Arduino está recebendo 5V, se a porta USB está alimentando o circuito, se um sensor está gerando sinal ou se a bateria ainda tem carga.',
    quandoNaoUsar: 'Não use para tomadas de parede (elas usam corrente alternada AC, perigosa) nem para tentar medir continuidade.',
    pontaPreta: 'Entrada COM (comum / terra)',
    pontaVermelha: 'Entrada VΩmA (tensão, resistência, miliamperes)',
    dicaDeBancada: 'No Arduino, a escala de 20V é a sua casa de repouso: como a placa opera com 5V e 3.3V, a escala de 20V tem resolução de centésimos de volt e suporta qualquer tensão comum da bancada.',
  },
  {
    mode: 'CONT',
    nome: 'Continuidade / Apito',
    simbolo: '))) / Diodo',
    escalaRecomendada: 'Símbolo de ondas sonoras ou diodo',
    paraQueServe: 'Emite um apito sonoro alto quando existe um caminho elétrico direto (quase 0 Ω) entre as duas pontas de teste.',
    quandoUsar: 'Para descobrir se um jumper está com o fio quebrado por dentro, se duas trilhas da protoboard estão em curto-circuito ou se o botão tátil fecha contato ao ser pressionado.',
    quandoNaoUsar: 'NUNCA use com o circuito ligado! A alimentação externa altera o circuito do buzzer interno e pode danificar a proteção.',
    pontaPreta: 'Entrada COM',
    pontaVermelha: 'Entrada VΩmA',
    dicaDeBancada: 'Antes de testar qualquer fio, encoste as pontas preta e vermelha uma na outra: o multímetro deve apitar imediatamente. Isso comprova que a bateria interna e os cabos de teste estão perfeitos.',
  },
  {
    mode: 'DIODE',
    nome: 'Teste de Diodo e LED',
    simbolo: '->|- (Diodo)',
    escalaRecomendada: 'Símbolo da seta com barra',
    paraQueServe: 'Mede a queda de tensão direta (tensão de condução) de junções semicondutoras e acende LEDs de teste na bancada.',
    quandoUsar: 'Para descobrir qual perna do LED é o ânodo (+) e qual é o cátodo (-), e se o LED está queimado. Ao encostar certo, o LED dá um brilho fraco e o visor mostra entre 1.6V e 2.8V.',
    quandoNaoUsar: 'Não use com o circuito ligado no computador.',
    pontaPreta: 'Entrada COM (vai no cátodo / perna menor ou chanfro)',
    pontaVermelha: 'Entrada VΩmA (vai no ânodo / perna maior)',
    dicaDeBancada: 'Se você inverter as pontas, o visor deve exibir "1" ou "OL" (circuito aberto). Se o LED não acender em nenhuma posição, ele queimou.',
  },
  {
    mode: 'OHM_2K',
    nome: 'Resistência Elétrica',
    simbolo: 'Ω (200Ω a 200kΩ)',
    escalaRecomendada: 'Escala 2kΩ ou 20kΩ',
    paraQueServe: 'Mede o valor exato em ohms de resistores, potenciômetros, termistores NTC e LDRs.',
    quandoUsar: 'Quando você está em dúvida sobre o código de cores de um resistor (por exemplo, diferenciar 220 Ω de 2.2 kΩ) ou para testar o curso de um potenciômetro.',
    quandoNaoUsar: 'NUNCA meça resistência com o resistor espetado em uma placa energizada. Desligue tudo e, de preferência, retire pelo menos uma das pernas do componente da protoboard.',
    pontaPreta: 'Entrada COM',
    pontaVermelha: 'Entrada VΩmA',
    dicaDeBancada: 'Nunca segure as duas pernas do resistor com os dedos apertados durante a medição: a resistência elétrica da sua pele humana altera a leitura em escalas altas.',
  },
  {
    mode: 'DCA_200M',
    nome: 'Corrente Contínua (mA)',
    simbolo: 'A⎓ (até 200mA)',
    escalaRecomendada: 'Escala 200mA DC',
    paraQueServe: 'Mede o consumo elétrico em corrente de módulos, LEDs e sensores.',
    quandoUsar: 'Quando quiser saber quantos miliamperes um circuito consome da porta do Arduino ou da bateria.',
    quandoNaoUsar: 'NUNCA encoste nos pinos 5V e GND ao mesmo tempo nessa escala! Corrente precisa ser ligada em série, abrindo o circuito.',
    pontaPreta: 'Entrada COM',
    pontaVermelha: 'Entrada VΩmA (para até 200mA)',
    dicaDeBancada: 'Para iniciantes, recomendamos usar essa escala apenas sob supervisão. Se você errar a ligação e ligar em paralelo, o fusível interno queima na hora.',
  },
  {
    mode: 'DCA_10A',
    nome: 'Alta Corrente (10A)',
    simbolo: '10A DC',
    escalaRecomendada: 'Escala 10A (sem fusível em modelos simples)',
    paraQueServe: 'Mede correntes maiores que 200mA, como motores DC e múltiplos servomotores acionados juntos.',
    quandoUsar: 'Apenas quando seu projeto tem motores puxando mais de meio ampère.',
    quandoNaoUsar: 'Evite no dia a dia com Arduino Uno básico.',
    pontaPreta: 'Entrada COM',
    pontaVermelha: 'Entrada dedicada 10A (deslocar a ponta vermelha)',
    dicaDeBancada: 'Em quase todos os multímetros comuns, o borne de 10A não possui proteção por fusível. Meça por no máximo 10 segundos para não superaquecer os cabos.',
  },
  {
    mode: 'ACV_200',
    nome: 'Tensão Alternada (AC)',
    simbolo: 'V~ (200V / 750V)',
    escalaRecomendada: 'Escala 200V AC',
    paraQueServe: 'Mede tensão alternada de transformadores de bancada.',
    quandoUsar: 'Apenas na saída secundária de transformadores seguros de baixa tensão (ex: 9V AC ou 12V AC).',
    quandoNaoUsar: 'NÃO use na tomada de casa (127V / 220V).',
    pontaPreta: 'Entrada COM',
    pontaVermelha: 'Entrada VΩmA',
    dicaDeBancada: 'O Arduino trabalha puramente com Corrente Contínua (DC). Você praticamente não usará a escala de tensão alternada nos 80 projetos.',
  },
];
