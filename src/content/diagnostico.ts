import { MultimeterMode } from '../illustrations/HardwareSvgs';

export type CategoriaDiagnostico = 'fio' | 'peca' | 'ligacao' | 'alimentacao' | 'codigo';

export interface VereditoFinal {
  categoria: CategoriaDiagnostico;
  titulo: string;
  explicacao: string;
  passosCorrecao: string[];
}

export interface PassoDiagnostico {
  numero: number;
  titulo: string;
  instrucao: string;
  ondePontaPreta: string;
  ondePontaVermelha: string;
  seletorModo: MultimeterMode;
  posicaoSeletor: string;
  valorEsperado: string;
  explicacaoValor: string;
  seNormal: string;
  seDiferente: {
    valorLido: string;
    significado: string;
    veredito: VereditoFinal;
  };
}

export interface DiagnosticoSintoma {
  id: string;
  titulo: string;
  descricaoCurta: string;
  icone: string;
  passos: PassoDiagnostico[];
  resumoFinal: string;
}

export const SINTOMAS_DIAGNOSTICO: DiagnosticoSintoma[] = [
  {
    id: 'nada-liga',
    titulo: 'Nada liga: a placa parece morta',
    descricaoCurta: 'O LED "ON" do Arduino não acende e nenhum componente dá sinal de vida.',
    icone: 'PowerOff',
    resumoFinal: 'O circuito não está recebendo os 5V estáveis necessários para inicializar o microcontrolador.',
    passos: [
      {
        numero: 1,
        titulo: 'Teste de Tensão no Barramento 5V do Arduino',
        instrucao: 'Mantenha o cabo USB conectado ao computador ou fonte. Vamos verificar se a porta USB realmente está entregando energia para a placa.',
        ondePontaPreta: 'Pino GND do Arduino (ao lado do 5V)',
        ondePontaVermelha: 'Pino 5V do Arduino',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ na escala de 20V',
        valorEsperado: 'Entre 4.75 V e 5.25 V',
        explicacaoValor: 'Essa é a voltagem padrão fornecida por portas USB padrão de computador.',
        seNormal: 'A placa está sendo alimentada corretamente pela USB. Avance para o passo 2 para verificar curto no circuito externo.',
        seDiferente: {
          valorLido: '0.00 V ou menos de 4.00 V',
          significado: 'O cabo USB está quebrado, a porta USB do computador desarmou por sobrecorrente ou há um curto-circuito na protoboard derrubando a linha 5V.',
          veredito: {
            categoria: 'alimentacao',
            titulo: 'Falha grave de alimentação ou cabo USB rompido',
            explicacao: 'O Arduino não está recebendo tensão pela porta USB. Isso costuma acontecer quando o cabo é apenas de carga (sem vias de energia reforçadas), quando a porta do computador desarmou ou quando algum fio na protoboard ligou 5V direto no GND.',
            passosCorrecao: [
              'Desconecte o Arduino da protoboard e plugue somente a placa pura no USB.',
              'Se o LED "ON" acender sozinho, o curto está na sua protoboard (fio de 5V tocando no GND).',
              'Troque o cabo USB por outro comprovadamente funcional.',
              'Conecte em uma porta USB traseira do computador ou use uma fonte de celular de boa qualidade.',
            ],
          },
        },
      },
      {
        numero: 2,
        titulo: 'Verificar se há Curto-Circuito na Protoboard (Circuito Desligado)',
        instrucao: 'DESCONECTE o cabo USB agora! Vamos testar se o barramento positivo vermelho está encostando no barramento negativo azul.',
        ondePontaPreta: 'Linha azul da protoboard (GND)',
        ondePontaVermelha: 'Linha vermelha da protoboard (5V)',
        seletorModo: 'CONT',
        posicaoSeletor: 'Continuidade / Apito (ícone sonoro)',
        valorEsperado: 'Silêncio total (visor em 1 ou OL). NÃO PODE APITAR!',
        explicacaoValor: '5V e GND nunca podem ter caminho elétrico direto sem carga no meio.',
        seNormal: 'Não há curto-circuito franco entre as linhas de alimentação da protoboard.',
        seDiferente: {
          valorLido: 'Apito sonoro contínuo com valor próximo de 0.00 Ω',
          significado: 'Existe um curto-circuito direto entre o 5V e o terra na protoboard.',
          veredito: {
            categoria: 'ligacao',
            titulo: 'Curto-circuito na protoboard derrubando o Arduino',
            explicacao: 'Um jumper ou perna de componente está ligando a linha positiva diretamente na linha negativa. O chip de proteção da porta USB do computador percebe o curto e corta a energia imediatamente para proteger sua máquina.',
            passosCorrecao: [
              'Examine as duas linhas laterais (azul e vermelha) de ponta a ponta da protoboard.',
              'Confira se nenhum jumper de alimentação está invertido ou se pernas de resistores estão encostando descalças.',
              'Retire os componentes um por um até o multímetro parar de apitar.',
            ],
          },
        },
      },
      {
        numero: 3,
        titulo: 'Verificar Tensão Regulada de 3.3V',
        instrucao: 'Reconecte o cabo USB. Vamos medir o pino 3.3V alimentado pelo regulador interno da placa.',
        ondePontaPreta: 'Pino GND do Arduino',
        ondePontaVermelha: 'Pino 3.3V do Arduino',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ na escala de 20V',
        valorEsperado: 'Entre 3.20 V e 3.40 V',
        explicacaoValor: 'O regulador de 3.3V interno alimenta módulos de rádio, cartões e sensores sensíveis.',
        seNormal: 'O regulador interno da placa está 100% íntegro.',
        seDiferente: {
          valorLido: '0V ou aquecimento excessivo no regulador',
          significado: 'O regulador interno de 3.3V foi danificado por inversão de polaridade ou curto acidental.',
          veredito: {
            categoria: 'peca',
            titulo: 'Regulador interno do Arduino comprometido',
            explicacao: 'A placa não está gerando a tensão secundária de 3.3V, indicando que o chip regulador sofreu sobretensão ou curto anterior.',
            passosCorrecao: [
              'Verifique se algum sensor ligado no 3.3V aquece ao toque (se aquecer, remova-o imediatamente).',
              'Use fontes externas reguladas ou alimente módulos de 3.3V com divisor de tensão a partir do 5V.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'led-nao-acende',
    titulo: 'O LED não acende',
    descricaoCurta: 'Você subiu o código, ligou os fios, mas o LED continua apagado.',
    icone: 'LightbulbOff',
    resumoFinal: 'Geralmente causado por LED invertido (polaridade), pino de código incorreto ou resistor de valor muito alto.',
    passos: [
      {
        numero: 1,
        titulo: 'Testar se o Pino do Arduino está Enviando Tensão (HIGH)',
        instrucao: 'Com a placa ligada e o código rodando (ex: Blink), vamos medir a saída do pino digital onde o LED está conectado.',
        ondePontaPreta: 'Pino GND do Arduino',
        ondePontaVermelha: 'Pino digital do sinal (ex: D8, D13)',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ escala 20V',
        valorEsperado: 'Alternando entre ~5.00 V e 0.00 V (ou ~5V fixo se estiver ligado direto)',
        explicacaoValor: 'Mostra que o microcontrolador está realmente executando o comando digitalWrite(pino, HIGH).',
        seNormal: 'O pino do Arduino está funcionando perfeitamente e enviando 5V.',
        seDiferente: {
          valorLido: '0.00 V cravado o tempo todo',
          significado: 'O pino não está enviando sinal. O problema está no código ou o fio está espetado no pino errado.',
          veredito: {
            categoria: 'codigo',
            titulo: 'Pino não configurado no código ou porta errada',
            explicacao: 'O multímetro mediu 0V no pino digital, o que significa que o código não configurou o pino com pinMode(..., OUTPUT) ou está mandando sinal para outro número de pino diferente do que você ligou na bancada.',
            passosCorrecao: [
              'Abra o código e confira a linha pinMode(PINO, OUTPUT) dentro de void setup().',
              'Verifique se o número no código (ex: D8) é exatamente o orifício físico onde o fio está espetado na barra preta do Arduino.',
              'Suba o exemplo básico "Blink" da IDE no pino D13 para confirmar que o upload do sketch conclui sem erro.',
            ],
          },
        },
      },
      {
        numero: 2,
        titulo: 'Testar a Polaridade e Saúde do LED com o Multímetro',
        instrucao: 'DESLIGUE o cabo USB. Retire o LED da protoboard. Vamos usar o modo diodo para testá-lo diretamente.',
        ondePontaPreta: 'Terminal mais curto do LED (Cátodo / lado chanfrado)',
        ondePontaVermelha: 'Terminal mais longo do LED (Ânodo / perna positiva)',
        seletorModo: 'DIODE',
        posicaoSeletor: 'Modo Diodo / Teste de Junção',
        valorEsperado: 'O LED dá um brilho visível suave e o visor mostra entre 1.6V e 2.8V.',
        explicacaoValor: 'A pequena corrente do multímetro vence a barreira do semicondutor e ilumina o chip interno.',
        seNormal: 'O LED está perfeito e você acabou de confirmar qual perna é a positiva (+).',
        seDiferente: {
          valorLido: 'Visor mostra 1 ou OL em ambos os sentidos e o LED nunca acende',
          significado: 'O filamento interno do LED abriu ou sofreu sobrecorrente por falta de resistor.',
          veredito: {
            categoria: 'peca',
            titulo: 'LED queimado por sobretensão ou filamento quebrado',
            explicacao: 'Mesmo com as pontas do multímetro no sentido correto, o semicondutor interno não conduziu corrente nem acendeu, comprovando que o LED está queimado.',
            passosCorrecao: [
              'Substitua o LED por uma peça nova.',
              'NUNCA ligue o novo LED direto no 5V sem um resistor limitador (mínimo 220 Ω).',
              'Lembre-se: o lado chanfrado na carcaça plástica é sempre o polo negativo (Cátodo), que vai para o GND.',
            ],
          },
        },
      },
      {
        numero: 3,
        titulo: 'Conferir o Valor do Resistor Limitador',
        instrucao: 'Mantenha o circuito desligado. Encoste as pontas nas duas pernas do resistor que acompanha o LED.',
        ondePontaPreta: 'Uma perna do resistor',
        ondePontaVermelha: 'A outra perna do resistor',
        seletorModo: 'OHM_2K',
        posicaoSeletor: 'Ω na escala de 2kΩ ou 200kΩ',
        valorEsperado: 'Em torno de 220 Ω a 1000 Ω (1kΩ)',
        explicacaoValor: 'Resistores entre 220 Ω e 1 kΩ limitam a corrente entre 15mA e 3mA, garantindo bom brilho com segurança.',
        seNormal: 'O resistor tem o valor correto para acender o LED com brilho nítido.',
        seDiferente: {
          valorLido: 'Mais de 100 kΩ ou valor infinito (OL)',
          significado: 'Você pode ter pego por engano um resistor de 100kΩ ou 1MΩ, que reduz a corrente a quase zero.',
          veredito: {
            categoria: 'peca',
            titulo: 'Resistor com valor excessivamente alto',
            explicacao: 'Com um resistor de 100kΩ ou 1MΩ, a corrente que passa pelo LED é de microamperes, insuficiente para produzir luz visível ao olho humano.',
            passosCorrecao: [
              'Troque o resistor por um de 220 Ω (Vermelho, Vermelho, Marrom, Ouro) ou 330 Ω (Laranja, Laranja, Marrom, Ouro).',
              'Confira na nossa calculadora de resistor o valor exato para a cor do seu LED.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'motor-nao-gira',
    titulo: 'O motor não gira ou só faz zumbido/treme',
    descricaoCurta: 'O motor DC, servo ou de passo não tem força para se mover ou reinicia a placa ao ligar.',
    icone: 'Cog',
    resumoFinal: 'Alimentação insuficiente de corrente ou queda de tensão induzida pelo consumo dos enrolamentos do motor.',
    passos: [
      {
        numero: 1,
        titulo: 'Medir a Tensão nos Terminais de Alimentação do Driver de Motor',
        instrucao: 'Com o projeto ligado e o motor comandado para girar, meça a tensão nos bornes VCC e GND do driver (ex: L298N ou L9110S).',
        ondePontaPreta: 'GND do módulo driver de motor',
        ondePontaVermelha: 'Borne VCC / 12V / 5V do módulo driver',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ na escala de 20V',
        valorEsperado: 'Entre 5.0 V e 9.0 V estáveis sem despencar mais de 0.5V ao ligar o motor',
        explicacaoValor: 'Motores exigem corrente elevada no pico de partida. A tensão da fonte não pode colapsar.',
        seNormal: 'A fonte externa tem voltagem suficiente e não está caindo durante o acionamento.',
        seDiferente: {
          valorLido: 'Tensão cai para menos de 3.5 V no instante em que o motor tenta girar',
          significado: 'A fonte ou bateria não tem capacidade de corrente (amperes) suficiente para vencer a inércia do motor.',
          veredito: {
            categoria: 'alimentacao',
            titulo: 'Fonte fraca ou bateria descarregada',
            explicacao: 'Baterias retangulares de 9V comuns não conseguem fornecer os 500mA a 1A exigidos por motores DC com carga. Quando o motor tenta girar, a bateria "arreia", a tensão despenca e o Arduino reinicia.',
            passosCorrecao: [
              'NUNCA tente alimentar motores ligando diretamente nos pinos digitais do Arduino (máximo seguro: 20mA).',
              'Use uma fonte de bancada dedicada ou um suporte com 4 ou 6 pilhas AA alcalinas para os motores.',
              'Una SEMPRE o GND da fonte de motores ao GND do Arduino para haver referência comum de controle.',
            ],
          },
        },
      },
      {
        numero: 2,
        titulo: 'Verificar a Continuidade do GND Comum entre Placa e Módulo',
        instrucao: 'Desligue a alimentação. Vamos checar se o fio terra (GND) do Arduino está de fato ligado ao GND do driver.',
        ondePontaPreta: 'Pino GND da placa Arduino',
        ondePontaVermelha: 'Borne GND do driver de motor',
        seletorModo: 'CONT',
        posicaoSeletor: 'Continuidade / Apito',
        valorEsperado: 'Apito sonoro contínuo (< 1 Ω)',
        explicacaoValor: 'Sem terra compartilhado, os sinais digitais de comando não encontram caminho de retorno e o driver não interpreta os pulsos.',
        seNormal: 'O referencial de terra comum está perfeito.',
        seDiferente: {
          valorLido: 'Silêncio / valor infinito',
          significado: 'Falta o fio de GND compartilhado entre a alimentação do motor e o Arduino.',
          veredito: {
            categoria: 'ligacao',
            titulo: 'GND do motor isolado do GND do Arduino',
            explicacao: 'O sinal digital de PWM ou sentido que sai do Arduino precisa de uma referência de tensão (0V) compartilhada com o circuito do driver.',
            passosCorrecao: [
              'Conecte um jumper preto entre o pino GND do Arduino e o borne GND da ponte H / módulo driver.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'sensor-estranho',
    titulo: 'O sensor lê valores malucos (0, 1023, NaN ou fixos)',
    descricaoCurta: 'O Monitor Serial exibe dados congelados, leituras flutuantes ou erros constantes.',
    icone: 'Activity',
    resumoFinal: 'Pino analógico flutuando sem sinal ou falta de resistor de pull-up/pull-down obrigatório.',
    passos: [
      {
        numero: 1,
        titulo: 'Medir a Alimentação nos Pinos VCC e GND do Módulo Sensor',
        instrucao: 'Com a placa ligada na USB, meça se a energia está chegando diretamente nas pernas do próprio sensor (não nos pinos da placa).',
        ondePontaPreta: 'Terminal GND do próprio sensor na protoboard',
        ondePontaVermelha: 'Terminal VCC do sensor na protoboard',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ escala 20V',
        valorEsperado: '4.8V a 5.2V (ou 3.3V para módulos específicos)',
        explicacaoValor: 'Comprova que os jumpers de alimentação e os contatos das trilhas estão entregando tensão.',
        seNormal: 'O sensor está corretamente alimentado.',
        seDiferente: {
          valorLido: '0.00 V ou tensão intermitente ao mexer na protoboard',
          significado: 'Mau contato na trilha da protoboard ou jumper quebrado internamente.',
          veredito: {
            categoria: 'fio',
            titulo: 'Jumpers de alimentação do sensor partidos ou trilha com mau contato',
            explicacao: 'A placa Arduino está ligada, mas a tensão de 5V ou o GND não estão chegando nas pernas do módulo sensor.',
            passosCorrecao: [
              'Troque os jumpers que alimentam o sensor por jumpers novos.',
              'Mude os componentes para outra fileira da protoboard para descartar trilha oxidada ou frouxa.',
            ],
          },
        },
      },
      {
        numero: 2,
        titulo: 'Medir a Tensão de Saída Analógica / Sinal',
        instrucao: 'Encoste a ponta vermelha no pino OUT / SIG do sensor e provoque uma alteração no ambiente (tampar o LDR com a mão, aproximar a mão do sensor de distância, etc.).',
        ondePontaPreta: 'Pino GND do circuito',
        ondePontaVermelha: 'Pino de Sinal (OUT) do sensor',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ escala 20V',
        valorEsperado: 'A voltagem deve variar suavemente entre 0.2V e 4.8V ao alterar o estímulo físico.',
        explicacaoValor: 'Sensores analógicos convertem grandezas físicas em variação proporcional de voltagem.',
        seNormal: 'O sensor físico está funcionando. Se o Arduino lê errado, o problema é na linha de código analogRead() ou mapeamento.',
        seDiferente: {
          valorLido: 'Voltagem cravada exatamente em 0.00V ou 5.00V sem nenhuma reação física',
          significado: 'Sensor defeituoso, montado invertido ou sem o resistor divisor de tensão (ex: LDR sem resistor de 10k).',
          veredito: {
            categoria: 'ligacao',
            titulo: 'Falta do divisor de tensão ou sensor desconectado',
            explicacao: 'Sensores resistivos puros como LDR e NTC não funcionam sozinhos: eles precisam de um resistor fixo de 10kΩ ligado ao GND para formar um divisor de tensão mensurável pelo pino A0.',
            passosCorrecao: [
              'Confira o esquema de ligação: um terminal do LDR vai no 5V, o outro vai no A0 e no resistor de 10k que desce para o GND.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'porta-sumiu',
    titulo: 'A placa não aparece no computador (Porta USB sumiu)',
    descricaoCurta: 'A IDE do Arduino não lista a porta COM ou /dev/cu.usb... e o upload falha.',
    icone: 'Usb',
    resumoFinal: 'Cabo USB defeituoso (somente para recarga de celular) ou falta do driver serial CH340.',
    passos: [
      {
        numero: 1,
        titulo: 'Teste de Linhas de Dados do Cabo USB (Continuidade com Circuito Desligado)',
        instrucao: 'Retire o cabo USB do computador e do Arduino. Vamos testar se o cabo possui os fios de dados (D+ e D-) além dos fios de energia.',
        ondePontaPreta: 'Pino metálico da ponta USB tipo A',
        ondePontaVermelha: 'Pino correspondente na ponta USB tipo B / C',
        seletorModo: 'CONT',
        posicaoSeletor: 'Continuidade / Apito',
        valorEsperado: 'Deve apitar em todas as 4 vias internas (VBUS, D-, D+, GND)',
        explicacaoValor: 'Cabos baratos de brinde possuem apenas 2 fios internos para carregar bateria, sem os fios de dados exigidos para programar o microcontrolador.',
        seNormal: 'O cabo USB possui todas as linhas de dados intactas.',
        seDiferente: {
          valorLido: 'Apenas 2 vias apitam ou nenhuma apita',
          significado: 'Você está usando um cabo de celular do tipo "somente carga" (charge-only).',
          veredito: {
            categoria: 'fio',
            titulo: 'Cabo USB "somente carga" sem vias de comunicação de dados',
            explicacao: 'Cabos feitos exclusivamente para carregar fones de ouvido ou celulares não conectam os pinos centrais de dados. A placa acende o LED de energia, mas o computador nunca reconhecerá o dispositivo serial.',
            passosCorrecao: [
              'Troque o cabo USB por um cabo completo de dados (geralmente mais grosso, que transfere arquivos para o celular).',
              'Em placas Arduino Uno compatíveis (com chip retangular CH340), certifique-se de ter instalado o driver CH340 no seu computador.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'botao-falha',
    titulo: 'O botão não responde ou dispara sozinho',
    descricaoCurta: 'Você aperta e nada acontece, ou o semáforo/contador dispara sem ninguém encostar no botão.',
    icone: 'ToggleLeft',
    resumoFinal: 'Pino digital em estado flutuante (floating) por falta de pull-up ou botão rotacionado 90 graus na protoboard.',
    passos: [
      {
        numero: 1,
        titulo: 'Medir a Tensão no Pino do Botão (Solto e Pressionado)',
        instrucao: 'Com a placa ligada e o botão na protoboard, meça a tensão no terminal do botão conectado ao pino digital do Arduino.',
        ondePontaPreta: 'Pino GND do Arduino',
        ondePontaVermelha: 'Terminal do botão que liga no pino digital (ex: D2)',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ escala 20V',
        valorEsperado: '5.00 V estável quando solto, e 0.00 V limpo no instante em que você pressiona o botão (ao usar INPUT_PULLUP)',
        explicacaoValor: 'Com pull-up, a tensão deve ficar firme nos 5V. Quando você aperta, ela cai a 0V.',
        seNormal: 'O botão e o circuito de chaveamento estão operando perfeitamente.',
        seDiferente: {
          valorLido: 'Tensão flutuando (ex: 1.2V, 2.8V, 0.5V oscilando aleatoriamente sem apertar)',
          significado: 'O pino digital está "flutuando" (antena captando ruído eletromagnético ambiente).',
          veredito: {
            categoria: 'codigo',
            titulo: 'Falta do resistor de pull-up (pino digital flutuando)',
            explicacao: 'Sem um resistor que puxe o pino para 5V ou GND, o circuito funciona como uma antena e lê 0 e 1 de forma caótica.',
            passosCorrecao: [
              'No código Arduino, mude a linha de pinMode para: pinMode(pino, INPUT_PULLUP);',
              'O comando INPUT_PULLUP ativa um resistor interno do próprio microcontrolador, eliminando qualquer necessidade de resistor externo no botão!',
            ],
          },
        },
      },
      {
        numero: 2,
        titulo: 'Testar os Terminais do Botão Tátil de 4 Pernas (Circuito Desligado)',
        instrucao: 'Desligue a placa e retire o botão da protoboard. Botões push-button de 4 pernas possuem 2 pares de pernas já interligados internamente por lâminas de metal.',
        ondePontaPreta: 'Uma perna do botão',
        ondePontaVermelha: 'A perna oposta do botão',
        seletorModo: 'CONT',
        posicaoSeletor: 'Continuidade / Apito',
        valorEsperado: 'Silêncio quando solto, e apito nítido somente quando o botão estiver apertado com o dedo.',
        explicacaoValor: 'Garante que você está usando os dois lados que realmente comutam com o clique.',
        seNormal: 'Você identificou os dois pinos corretos de comutação.',
        seDiferente: {
          valorLido: 'Apita direto mesmo com o botão solto',
          significado: 'Você conectou o circuito nos dois pinos do mesmo par interno.',
          veredito: {
            categoria: 'ligacao',
            titulo: 'Botão girado 90 graus na protoboard',
            explicacao: 'Nos botões táteis quadrados, duas pernas já são unidas por chapas de cobre internas. Se o botão for encaixado girado na protoboard, o circuito fica em curto permanente.',
            passosCorrecao: [
              'Gire o botão em 90 graus na protoboard ou use terminais em diagonal oposta.',
              'Monte o botão montado sobre o vão central da protoboard.',
            ],
          },
        },
      },
    ],
  },
  {
    id: 'leds-todos-acesos',
    titulo: 'Todos os LEDs acendem juntos ou invertidos',
    descricaoCurta: 'Em semáforos ou sequenciais, os LEDs ligam invertidos ou ficam todos acesos simultaneamente.',
    icone: 'Layers',
    resumoFinal: 'GND dos LEDs ligado acidentalmente no 5V ou lógica invertida no código.',
    passos: [
      {
        numero: 1,
        titulo: 'Verificar a Tensão do Barramento de Retorno dos LEDs',
        instrucao: 'Com a placa ligada, meça a voltagem da linha onde os cátodos (pernas curtas) de todos os LEDs estão encaixados.',
        ondePontaPreta: 'GND da placa Arduino',
        ondePontaVermelha: 'Linha azul da protoboard onde estão as pernas curtas dos LEDs',
        seletorModo: 'DCV_20',
        posicaoSeletor: 'V⎓ escala 20V',
        valorEsperado: '0.00 V cravado',
        explicacaoValor: 'A linha de retorno comum dos LEDs precisa estar ligada ao terra (GND, 0V).',
        seNormal: 'A linha comum é um terra verdadeiro.',
        seDiferente: {
          valorLido: '5.00 V no barramento azul',
          significado: 'O barramento foi ligado no pino 5V em vez do GND do Arduino.',
          veredito: {
            categoria: 'ligacao',
            titulo: 'Barramento de retorno conectado aos 5V por engano',
            explicacao: 'Ao ligar a linha azul no 5V, todos os LEDs recebem polarização cruzada ou invertida.',
            passosCorrecao: [
              'Mude o fio que alimenta o barramento azul do pino 5V para qualquer pino identificado como GND no Arduino.',
            ],
          },
        },
      },
    ],
  },
];
