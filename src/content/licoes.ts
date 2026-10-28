import { MultimeterMode } from '../illustrations/HardwareSvgs';

export interface PassoPratico {
  titulo: string;
  detalhe: string;
}

export interface LicaoPratica {
  id: string;
  numero: number;
  titulo: string;
  subtitulo: string;
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  duracaoMinutos: number;
  modoSeletor: MultimeterMode;
  posicaoEscala: string;
  pontaPreta: string;
  pontaVermelha: string;
  circuitoLigado: boolean;
  passos: PassoPratico[];
  oQueVoceDeveVer: string;
  dicaMestre: string;
  alertaSeguranca?: string;
  opcionalParaIniciantes?: boolean;
}

export const LICOES_PRATICAS: LicaoPratica[] = [
  {
    id: 'medir-pinos-arduino',
    numero: 1,
    titulo: 'Medir Tensão DC nos Pinos 5V, 3.3V e GND do Arduino',
    subtitulo: 'Aprenda a conferir a saúde da sua placa e se o computador está fornecendo energia estável.',
    nivel: 'Iniciante',
    duracaoMinutos: 5,
    modoSeletor: 'DCV_20',
    posicaoEscala: 'V⎓ na escala 20V',
    pontaPreta: 'Pino GND (terra) do Arduino',
    pontaVermelha: 'Pino 5V e depois pino 3.3V',
    circuitoLigado: true,
    passos: [
      {
        titulo: 'Conecte o Arduino ao USB',
        detalhe: 'Plugue o cabo USB no computador. O LED verde "ON" da placa deve acender.',
      },
      {
        titulo: 'Prepare o multímetro',
        detalhe: 'Ponta preta no borne COM, ponta vermelha no borne VΩmA. Gire o seletor para 20V DC (V=).',
      },
      {
        titulo: 'Meça o pino 5V',
        detalhe: 'Firme a ponta preta em qualquer pino GND. Com a ponta vermelha, toque no furo do pino 5V.',
      },
      {
        titulo: 'Meça o pino 3.3V',
        detalhe: 'Mantendo a ponta preta no GND, desloque a ponta vermelha para o pino 3.3V ao lado.',
      },
    ],
    oQueVoceDeveVer: 'No pino 5V, o visor deve exibir entre 4.80V e 5.20V. No pino 3.3V, deve exibir entre 3.25V e 3.35V.',
    dicaMestre: 'Se no pino 5V marcar menos de 4.5V, a porta USB do seu computador ou hub USB está sobrecarregada.',
  },
  {
    id: 'medir-bateria-fonte',
    numero: 2,
    titulo: 'Medir a Bateria de 9V ou Fonte de Bancada',
    subtitulo: 'Descubra se aquela bateria da gaveta ainda tem carga real ou vai travar seu projeto.',
    nivel: 'Iniciante',
    duracaoMinutos: 5,
    modoSeletor: 'DCV_20',
    posicaoEscala: 'V⎓ na escala 20V',
    pontaPreta: 'Polo negativo (-) da bateria (conector maior sextavado)',
    pontaVermelha: 'Polo positivo (+) da bateria (conector menor circular)',
    circuitoLigado: false,
    passos: [
      {
        titulo: 'Ajuste o seletor',
        detalhe: 'Deixe o seletor em 20V DC. Como uma bateria de 9V tem menos de 20V, essa escala oferece ótima precisão.',
      },
      {
        titulo: 'Identifique os polos',
        detalhe: 'Baterias de 9V têm a indicação clara de + e - gravada na carcaça.',
      },
      {
        titulo: 'Encoste as pontas firmemente',
        detalhe: 'Ponta preta no negativo (-), ponta vermelha no positivo (+).',
      },
    ],
    oQueVoceDeveVer: 'Bateria nova: 9.3V a 9.6V. Bateria boa: 8.5V a 9.0V. Bateria fraca (substituir): abaixo de 7.5V.',
    dicaMestre: 'Se você inverter as pontas sem querer, nada explode! O visor apenas exibirá um sinal de menos (-9.2V), indicando inversão.',
  },
  {
    id: 'testar-jumpers-protoboard',
    numero: 3,
    titulo: 'Testar Continuidade de Jumper e Trilhas da Protoboard',
    subtitulo: 'O teste mais valioso de todos: encontre fios rompidos por dentro da borracha colorida.',
    nivel: 'Iniciante',
    duracaoMinutos: 7,
    modoSeletor: 'CONT',
    posicaoEscala: 'Continuidade / Apito sonoro (ícone de diodo/buzzer)',
    pontaPreta: 'Uma ponta metálica do jumper',
    pontaVermelha: 'A outra ponta metálica do mesmo jumper',
    circuitoLigado: false,
    passos: [
      {
        titulo: 'Desligue toda a energia',
        detalhe: 'Tire o cabo USB do Arduino e desconecte qualquer bateria.',
      },
      {
        titulo: 'Gire para o modo apito',
        detalhe: 'Encoste as duas pontas do multímetro uma na outra: ele deve apitar na hora. Isso confirma o teste.',
      },
      {
        titulo: 'Encoste nas duas pontas do jumper',
        detalhe: 'Uma ponta de prova em cada extremidade metálica do fio.',
      },
      {
        titulo: 'Dobre o fio levemente',
        detalhe: 'Com as pontas encostadas, flexione suavemente o fio. Se o apito falhar ou chiar, o fio interno de cobre está quebrado.',
      },
    ],
    oQueVoceDeveVer: 'Apito contínuo e visor marcando de 0.00 a 0.02 Ω. Se ficar mudo e marcar "1" ou "OL", o fio está quebrado.',
    dicaMestre: 'Jogue fora imediatamente qualquer jumper que falhar nesse teste. Deixar jumper defeituoso na gaveta é a maior armadilha para o seu próximo projeto!',
  },
  {
    id: 'medir-resistor-cores',
    numero: 4,
    titulo: 'Medir Resistor e Conferir pelo Código de Cores',
    subtitulo: 'Nunca mais monte 2.2k no lugar de 220 ohms. Tire a prova real na bancada.',
    nivel: 'Iniciante',
    duracaoMinutos: 8,
    modoSeletor: 'OHM_2K',
    posicaoEscala: 'Escala de 2kΩ (ou 200Ω / 20kΩ conforme o valor)',
    pontaPreta: 'Uma perna do resistor',
    pontaVermelha: 'A outra perna do resistor (resistor não tem lado nem polaridade)',
    circuitoLigado: false,
    passos: [
      {
        titulo: 'Circuito 100% desligado',
        detalhe: 'Desconecte o resistor da placa ou levante pelo menos uma das pernas fora da protoboard.',
      },
      {
        titulo: 'Escolha a escala correta',
        detalhe: 'Se for um resistor de 220 Ω, use a escala de 2kΩ ou 2000Ω. Se for de 10kΩ, use a escala de 20kΩ.',
      },
      {
        titulo: 'Encoste as pontas',
        detalhe: 'Apoie o resistor sobre a mesa limpa e pressione as pontas metálicas nas pernas de arame.',
      },
    ],
    oQueVoceDeveVer: 'Para um resistor de 220 Ω (Vermelho-Vermelho-Marrom-Ouro com tolerância de 5%), o multímetro exibirá entre 210 Ω e 230 Ω (ou ~0.22k).',
    dicaMestre: 'Não segure as duas pernas de arame apertando com os dedos! A resistência do seu corpo entra em paralelo e altera o valor medido.',
  },
  {
    id: 'testar-led-diodo',
    numero: 5,
    titulo: 'Testar LED (Modo Diodo) e Identificar o Polo',
    subtitulo: 'Descubra na hora se o LED está queimado e qual perna é o ânodo (+) e o cátodo (-).',
    nivel: 'Iniciante',
    duracaoMinutos: 6,
    modoSeletor: 'DIODE',
    posicaoEscala: 'Símbolo do diodo semicondutor',
    pontaPreta: 'Cátodo (-) perna menor ou lado chanfrado',
    pontaVermelha: 'Ânodo (+) perna maior',
    circuitoLigado: false,
    passos: [
      {
        titulo: 'Tire o LED da protoboard',
        detalhe: 'O teste deve ser feito com o LED solto na sua mão ou apoiado na bancada.',
      },
      {
        titulo: 'Coloque no modo Diodo',
        detalhe: 'Gire o seletor para o símbolo de diodo (seta com traço vertical).',
      },
      {
        titulo: 'Encoste a ponta vermelha na perna maior',
        detalhe: 'Ponta vermelha no ânodo (+), ponta preta no cátodo (-).',
      },
    ],
    oQueVoceDeveVer: 'O LED acende com um brilho suave e o visor mostra a queda de tensão direta: ~1.8V para LED vermelho, ~2.0V para amarelo, ~2.8V para verde ou azul.',
    dicaMestre: 'Se inverter as pontas, o visor deve exibir "1" ou "OL". Se o LED não acender em nenhuma posição, ele está queimado.',
  },
  {
    id: 'achar-mau-contato',
    numero: 6,
    titulo: 'Achar Mau Contato em Trilhas e Conexões',
    subtitulo: 'O projeto funcionava, você bateu o dedo na mesa e parou? Saiba caçar o ponto frouxo.',
    nivel: 'Intermediário',
    duracaoMinutos: 10,
    modoSeletor: 'CONT',
    posicaoEscala: 'Continuidade / Apito sonoro',
    pontaPreta: 'Início da trilha suspeita',
    pontaVermelha: 'Final da trilha ou no terminal do componente espetado',
    circuitoLigado: false,
    passos: [
      {
        titulo: 'Desligue o USB',
        detalhe: 'O teste de continuidade sempre exige bancada desenergizada.',
      },
      {
        titulo: 'Toque na perna do componente',
        detalhe: 'Em vez de tocar no buraco da protoboard, toque diretamente no metal da perna do resistor ou LED.',
      },
      {
        titulo: 'Mexa suavemente na peça',
        detalhe: 'Com as pontas de teste encostadas e o aparelho apitando, dê leves batidinhas no componente com a ponta do dedo.',
      },
    ],
    oQueVoceDeveVer: 'O apito deve ser contínuo e firme. Se o som engasgar, cortar ou chiar ao mexer, o orifício metálico da protoboard está folgado ou oxidado.',
    dicaMestre: 'Protoboards baratas perdem a pressão das lâminas internas quando usamos componentes com pernas grossas (como diodos 1N4007). Mude para outro furo!',
  },
  {
    id: 'medir-corrente-seguranca',
    numero: 7,
    titulo: 'Medir Corrente com Segurança (Em Série)',
    subtitulo: 'Entenda como medir o consumo elétrico em miliamperes sem queimar o fusível do aparelho.',
    nivel: 'Avançado',
    duracaoMinutos: 12,
    modoSeletor: 'DCA_200M',
    posicaoEscala: 'mA DC (até 200mA)',
    pontaPreta: 'Entrada COM do multímetro',
    pontaVermelha: 'Entrada VΩmA (atenção: NÃO use a entrada de 10A a menos que exceda 200mA)',
    circuitoLigado: true,
    opcionalParaIniciantes: true,
    alertaSeguranca: 'CUIDADO: Corrente NUNCA se mede em paralelo! Nunca encoste as pontas no 5V e GND ao mesmo tempo nesta escala. Isso causará um curto-circuito e queimará o fusível interno do multímetro.',
    passos: [
      {
        titulo: 'Entenda a regra da série',
        detalhe: 'Para medir corrente, o multímetro precisa se tornar parte do caminho do fio. A corrente tem que entrar pela ponta vermelha e sair pela preta.',
      },
      {
        titulo: 'Abra o circuito',
        detalhe: 'Desconecte um dos lados do fio do LED da protoboard, deixando o circuito interrompido.',
      },
      {
        titulo: 'Feche o circuito com o multímetro',
        detalhe: 'Encoste a ponta vermelha no pino do Arduino e a ponta preta na perna do resistor onde o fio estava.',
      },
      {
        titulo: 'Ligue a placa e leia os miliamperes',
        detalhe: 'O LED acenderá e a corrente que passa por ele será exibida no visor.',
      },
    ],
    oQueVoceDeveVer: 'Para um LED comum com resistor de 220 Ω ligado em 5V, você lerá aproximadamente entre 12.0 mA e 16.0 mA.',
    dicaMestre: 'Se você é iniciante absoluto, não se preocupe em fazer esta medição agora. Foque em dominar Voltagem e Continuidade primeiro.',
  },
];
