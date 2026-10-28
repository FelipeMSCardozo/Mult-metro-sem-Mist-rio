import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Card, LevelBadge, LedIndicator, ProgressBar } from '../components/ui';
import { LICOES_PRATICAS } from '../content/licoes';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Licoes: React.FC = () => {
  const [concluidas] = useLocalStorage<string[]>('multimetro_licoes_concluidas', []);
  const [filtroNivel, setFiltroNivel] = useState<'Todos' | 'Iniciante' | 'Intermediário' | 'Avançado'>('Todos');

  const licoesFiltradas = LICOES_PRATICAS.filter((l) => {
    if (filtroNivel === 'Todos') return true;
    return l.nivel === filtroNivel;
  });

  const total = LICOES_PRATICAS.length;
  const concluidasCount = concluidas.length;
  const porcentagem = Math.round((concluidasCount / total) * 100);

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-5xl mx-auto">
      {/* CABEÇALHO */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            Trilha Prática de Bancada
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
            <BookOpen className="w-7 h-7 text-accent" />
            7 Lições Práticas com Multímetro
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Passo a passo com fotos esquemáticas e "o que você deve ver" no visor.
          </p>
        </div>
      </div>

      {/* BARRA DE PROGRESSO */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-accent/5 border-accent/30">
        <div className="w-full sm:max-w-md">
          <ProgressBar
            value={concluidasCount}
            max={total}
            label={`Progresso: ${concluidasCount} de ${total} lições dominadas (${porcentagem}%)`}
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted shrink-0">
          <LedIndicator on={concluidasCount > 0} size="sm" />
          <span>{concluidasCount === total ? 'Parabéns! Trilha 100% concluída!' : 'Pratique na sua bancada real'}</span>
        </div>
      </Card>

      {/* FILTROS DE NÍVEL */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Filter className="w-4 h-4 text-ink-muted shrink-0 mr-1" />
        {(['Todos', 'Iniciante', 'Intermediário', 'Avançado'] as const).map((nivel) => (
          <button
            key={nivel}
            type="button"
            onClick={() => setFiltroNivel(nivel)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border min-h-[38px] ${
              filtroNivel === nivel
                ? 'bg-accent text-white dark:text-slate-950 border-accent font-bold'
                : 'bg-bench-card text-ink-muted hover:text-ink border-bench-border'
            }`}
          >
            {nivel}
          </button>
        ))}
      </div>

      {/* LISTA DE CARDS DAS LIÇÕES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {licoesFiltradas.map((licao) => {
          const isDone = concluidas.includes(licao.id);
          return (
            <Link key={licao.id} to={`/licoes/${licao.id}`}>
              <Card interactive className={`h-full flex flex-col justify-between ${isDone ? 'border-led/40 bg-led/5' : ''}`}>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-accent/20 text-accent font-mono text-xs font-bold flex items-center justify-center">
                        #{licao.numero}
                      </span>
                      <LevelBadge level={licao.nivel} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-ink-muted font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {licao.duracaoMinutos} min
                      </span>
                      <LedIndicator on={isDone} size="sm" />
                    </div>
                  </div>

                  <h3 className="font-bold text-ink text-base mb-1.5 leading-snug">
                    {licao.titulo}
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {licao.subtitulo}
                  </p>
                </div>

                <div className="pt-4 border-t border-bench-border mt-4 flex items-center justify-between text-xs font-bold">
                  <span className="font-mono text-accent">
                    Escala: {licao.posicaoEscala}
                  </span>
                  <span className="text-accent flex items-center gap-1">
                    {isDone ? 'Rever Lição' : 'Abrir Lição'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
