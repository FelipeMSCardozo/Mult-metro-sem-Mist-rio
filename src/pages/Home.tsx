import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Gauge,
  CheckSquare,
  ShieldAlert,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Card, Button, ProgressBar, LedIndicator } from '../components/ui';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LICOES_PRATICAS } from '../content/licoes';
import { SINTOMAS_DIAGNOSTICO } from '../content/diagnostico';

export const Home: React.FC = () => {
  const [licoesConcluidas] = useLocalStorage<string[]>('multimetro_licoes_concluidas', []);
  const [ultimoSintoma] = useLocalStorage<string | null>('multimetro_ultimo_sintoma', null);

  const totalLicoes = LICOES_PRATICAS.length;
  const concluídasCount = licoesConcluidas.length;
  const porcentagem = Math.round((concluídasCount / totalLicoes) * 100);

  const sintomaRecente = ultimoSintoma
    ? SINTOMAS_DIAGNOSTICO.find((s) => s.id === ultimoSintoma)
    : null;

  return (
    <div className="space-y-8 pb-20 md:pb-8">
      {/* HERO BANNER DE BANCADA */}
      <section className="relative overflow-hidden rounded-3xl border border-bench-border bg-gradient-to-br from-bench-card via-bench-card to-amber-950/20 p-6 sm:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-bold text-accent-text dark:text-accent">
            <Zap className="w-3.5 h-3.5" />
            <span>Guia Oficial de Bancada • 80 Projetos Arduino</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
            Montou e não funcionou? <br className="hidden sm:inline" />
            <span className="text-accent underline decoration-accent/40 decoration-wavy">
              Descubra onde seu circuito parou.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Em vez de desmontar tudo na frustração ou ficar trocando fios às cegas, aprenda a usar o multímetro em passos simples para descobrir em menos de 3 minutos se a falha é no <strong>fio</strong>, na <strong>peça</strong>, na <strong>ligação</strong> ou no <strong>código</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/diagnostico">
              <Button size="lg" variant="primary" icon={<Wrench className="w-5 h-5" />}>
                Meu Projeto Não Funciona: Iniciar Diagnóstico
              </Button>
            </Link>

            <Link to="/seletor">
              <Button size="lg" variant="secondary" icon={<Gauge className="w-5 h-5" />}>
                Conheça o Seletor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTINUAR DE ONDE PAREI (SE HOUVER HISTÓRICO) */}
      {sintomaRecente && (
        <Card className="border-accent/40 bg-accent/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent text-slate-950 font-bold shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-wider">
                  Continuar de onde parei
                </p>
                <h3 className="font-bold text-ink text-base">
                  Diagnóstico: {sintomaRecente.titulo}
                </h3>
              </div>
            </div>
            <Link to={`/diagnostico?sintoma=${sintomaRecente.id}`}>
              <Button size="sm" variant="accent" icon={<ArrowRight className="w-4 h-4" />}>
                Retomar Teste
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {/* SEÇÃO PRINCIPAL: MEU PROJETO NÃO FUNCIONA (DIAGNÓSTICO GUIADO) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink flex items-center gap-2">
              <Wrench className="w-6 h-6 text-accent" />
              Diagnóstico Rápido por Sintoma
            </h2>
            <p className="text-sm text-ink-muted">
              Selecione exatamente o que está acontecendo na sua bancada:
            </p>
          </div>
          <Link
            to="/diagnostico"
            className="text-xs font-bold text-accent hover:underline hidden sm:inline"
          >
            Ver todos os 7 sintomas →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SINTOMAS_DIAGNOSTICO.slice(0, 6).map((sintoma) => (
            <Link key={sintoma.id} to={`/diagnostico?sintoma=${sintoma.id}`}>
              <Card interactive className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-bench-elevated text-ink-muted">
                      {sintoma.passos.length} passos
                    </span>
                    <LedIndicator on={false} size="sm" />
                  </div>
                  <h3 className="font-bold text-ink text-base mb-1.5">{sintoma.titulo}</h3>
                  <p className="text-sm text-ink-muted leading-snug">
                    {sintoma.descricaoCurta}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-xs font-bold text-accent">
                  <span>Iniciar teste</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* PROGRESSO E LIÇÕES PRÁTICAS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Progresso */}
        <Card className="lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-ink text-lg">Seu Progresso de Bancada</h3>
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <p className="text-sm text-ink-muted mb-4">
              Cada lição prática concluída acende um LED de recompensa na sua bancada virtual.
            </p>
            <ProgressBar
              value={concluídasCount}
              max={totalLicoes}
              label={`${concluídasCount} de ${totalLicoes} lições dominadas (${porcentagem}%)`}
            />
          </div>

          <div className="pt-6 border-t border-bench-border mt-6">
            <Link to="/licoes">
              <Button variant="secondary" className="w-full">
                Abrir Trilha de Lições
              </Button>
            </Link>
          </div>
        </Card>

        {/* Atalhos Rápidos */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/seletor">
            <Card interactive className="h-full">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-500 font-bold shrink-0">
                  <Gauge className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink">Conheça seu Multímetro</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Seletor rotativo interativo: toque em cada escala (V⎓, Ω, continuidade, diodo) e saiba onde ligar as pontas.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/checklist">
            <Card interactive className="h-full">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-500 font-bold shrink-0">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink">Checklist Antes de Pedir Ajuda</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    8 perguntas de ouro para marcar na tela ou imprimir. Resolva 90% das dúvidas comuns de primeira.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/seguranca">
            <Card interactive className="h-full">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/15 text-rose-500 font-bold shrink-0">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink">Regras de Segurança</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Nunca meça tomadas 127/220V. Aprenda as 3 regras inegociáveis para não queimar seu multímetro.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link to="/glossario">
            <Card interactive className="h-full">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-sky-500/15 text-sky-500 font-bold shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink">Glossário de Bancada</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Tensão, corrente, GND e curto explicados com analogias de água simples para iniciantes.
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
};
