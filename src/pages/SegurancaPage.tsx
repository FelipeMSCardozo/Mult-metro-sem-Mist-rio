import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, AlertBox } from '../components/ui';
import { REGRAS_SEGURANCA } from '../content/seguranca';

export const SegurancaPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-4xl mx-auto">
      {/* CABEÇALHO */}
      <div>
        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
          Diretrizes Inegociáveis
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <ShieldAlert className="w-7 h-7 text-rose-500" />
          Regras de Segurança na Bancada
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Aprenda a proteger sua integridade física, seu computador e seu multímetro.
        </p>
      </div>

      {/* ALERTA DESTAQUE: TOMADAS */}
      <AlertBox type="danger" title="PROIBIDO MEDIR TOMADAS DOMÉSTICAS (127V / 220V)">
        Este treinamento é voltado estritamente para eletrônica de baixa tensão em corrente contínua (5V a 12V DC). NUNCA insira as pontas de prova em tomadas de parede, disjuntores ou redes de alta potência.
      </AlertBox>

      {/* CARDS DAS 3 REGRAS DE OURO */}
      <div className="space-y-4">
        {REGRAS_SEGURANCA.map((regra, idx) => (
          <Card key={regra.id} className="space-y-3 border-l-4 border-l-accent">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-xl bg-accent text-slate-950 font-bold text-sm flex items-center justify-center shrink-0">
                #{idx + 1}
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink">{regra.titulo}</h2>
                <p className="text-xs font-bold text-accent mt-0.5">{regra.resumo}</p>
              </div>
            </div>

            <p className="text-sm text-ink leading-relaxed pl-10">
              {regra.explicacao}
            </p>

            <div className="pl-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                <span className="font-bold text-rose-500 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Risco ao errar:
                </span>
                <span className="text-ink-muted">{regra.perigo}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <span className="font-bold text-emerald-500 flex items-center gap-1 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Como fazer do jeito certo:
                </span>
                <span className="text-ink-muted">{regra.comoFazerCerto}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
