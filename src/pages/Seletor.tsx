import React, { useState } from 'react';
import {
  Gauge,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { Card } from '../components/ui';
import {
  MultimeterInteractiveSvg,
  MultimeterMode,
} from '../illustrations/HardwareSvgs';
import { POSICOES_SELETOR, PosicaoSeletor } from '../content/seletor';

export const Seletor: React.FC = () => {
  const [modoAtivo, setModoAtivo] = useState<MultimeterMode>('DCV_20');

  const infoAtual: PosicaoSeletor =
    POSICOES_SELETOR.find((p) => p.mode === modoAtivo) || POSICOES_SELETOR[0];

  const displayMap: Record<MultimeterMode, string> = {
    OFF: 'OFF',
    DCV_20: '5.01 V',
    ACV_200: '0.00 V',
    OHM_2K: '0.22 k',
    CONT: '0.00 Ω',
    DIODE: '1.85 V',
    DCA_200M: '14.2 mA',
    DCA_10A: '0.45 A',
  };

  const is10A = modoAtivo === 'DCA_10A';

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-5xl mx-auto">
      {/* CABEÇALHO */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            Simulador de Bancada
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
            <Gauge className="w-7 h-7 text-accent" />
            Conheça seu Multímetro
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Gire o seletor ou toque nos botões para aprender o que cada símbolo significa na prática.
          </p>
        </div>
      </div>

      {/* SELETOR RÁPIDO DE MODOS */}
      <div className="flex overflow-x-auto gap-2 pb-2 pt-1 no-scrollbar">
        {POSICOES_SELETOR.map((pos) => {
          const isSelected = pos.mode === modoAtivo;
          return (
            <button
              key={pos.mode}
              type="button"
              onClick={() => setModoAtivo(pos.mode)}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 min-h-[44px] shrink-0 border ${
                isSelected
                  ? 'bg-accent text-white dark:text-slate-950 border-accent font-bold shadow-sm'
                  : 'bg-bench-card text-ink-muted hover:text-ink border-bench-border hover:bg-bench-elevated'
              }`}
            >
              <span className="font-mono text-xs opacity-75">{pos.simbolo}</span>
              <span>{pos.nome}</span>
            </button>
          );
        })}
      </div>

      {/* GRID DE INTERAÇÃO: MULTÍMETRO + DETALHES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG DO MULTÍMETRO */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="flex flex-col items-center justify-center bg-[#0A0E14] border-bench-border p-4 sm:p-6">
            <p className="text-xs text-slate-400 font-mono mb-2">
              Toque no seletor para girar ou clique nos modos:
            </p>
            <MultimeterInteractiveSvg
              activeMode={modoAtivo}
              onSelectMode={setModoAtivo}
              displayText={displayMap[modoAtivo]}
              use10AJack={is10A}
            />
          </Card>

          {/* ONDE LIGAR AS PONTAS */}
          <Card>
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
              Conexão Correta das Pontas de Prova
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/10 border border-slate-700/30">
                <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-300 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-ink block">Ponta Preta (Negativa)</span>
                  <span className="text-ink-muted">{infoAtual.pontaPreta}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="w-4 h-4 rounded-full bg-red-500 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-red-500 block">Ponta Vermelha (Positiva)</span>
                  <span className="text-ink-muted">{infoAtual.pontaVermelha}</span>
                </div>
              </div>
            </div>
            {is10A && (
              <p className="text-xs font-bold text-amber-500 mt-3 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Atenção: A ponta vermelha precisa ser movida para o borne 10A!
              </p>
            )}
          </Card>
        </div>

        {/* DETALHAMENTO DIDÁTICO */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-bench-border pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-accent px-2 py-0.5 rounded bg-accent/15 border border-accent/20">
                  {infoAtual.escalaRecomendada}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink mt-2">
                  {infoAtual.nome} ({infoAtual.simbolo})
                </h2>
              </div>
            </div>

            {/* PARA QUE SERVE */}
            <div>
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-1">
                Para que serve
              </h3>
              <p className="text-sm text-ink leading-relaxed">
                {infoAtual.paraQueServe}
              </p>
            </div>

            {/* QUANDO USAR */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                Quando usar no Arduino
              </h3>
              <p className="text-sm text-ink leading-relaxed">
                {infoAtual.quandoUsar}
              </p>
            </div>

            {/* QUANDO NUNCA USAR */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <h3 className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <ShieldAlert className="w-4 h-4" />
                Quando NUNCA usar (Risco de queimar ou estragar)
              </h3>
              <p className="text-sm text-ink leading-relaxed">
                {infoAtual.quandoNaoUsar}
              </p>
            </div>

            {/* DICA DE BANCADA */}
            <div className="p-4 rounded-2xl bg-bench-elevated border border-bench-border">
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4" />
                Dica de Bancada
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {infoAtual.dicaDeBancada}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
