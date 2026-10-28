import React, { useState } from 'react';
import { HelpCircle, Waves } from 'lucide-react';
import { Card, SearchBar } from '../components/ui';
import { TERMOS_GLOSSARIO } from '../content/glossario';

export const GlossarioPage: React.FC = () => {
  const [busca, setBusca] = useState('');

  const termosFiltrados = TERMOS_GLOSSARIO.filter((item) => {
    const query = busca.toLowerCase();
    return (
      item.termo.toLowerCase().includes(query) ||
      item.definicaoSimples.toLowerCase().includes(query) ||
      item.analogia.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-4xl mx-auto">
      {/* CABEÇALHO */}
      <div>
        <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">
          Conceitos em Português Claro
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <HelpCircle className="w-7 h-7 text-sky-500" />
          Glossário Descomplicado de Eletrônica
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Sem fórmulas intimidadoras: entenda cada grandeza com analogias do dia a dia.
        </p>
      </div>

      {/* CAMPO DE BUSCA */}
      <SearchBar
        value={busca}
        onChange={setBusca}
        placeholder="Buscar por tensão, terra, corrente, curto..."
      />

      {/* LISTA DE TERMOS */}
      <div className="space-y-4">
        {termosFiltrados.map((item) => (
          <Card key={item.termo} className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-bench-border pb-2.5">
              <h2 className="text-lg font-bold text-ink">{item.termo}</h2>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Unidade: {item.unidade}
              </span>
            </div>

            <p className="text-base text-ink leading-relaxed">
              {item.definicaoSimples}
            </p>

            <div className="p-3.5 rounded-xl bg-bench-elevated border border-bench-border space-y-1">
              <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5" />
                Analogia da Bancada:
              </span>
              <p className="text-sm text-ink-muted leading-relaxed">
                {item.analogia}
              </p>
            </div>

            <div className="text-xs text-ink-muted font-medium pt-1">
              <strong>Como medir no multímetro:</strong> {item.comoMede}
            </div>
          </Card>
        ))}

        {termosFiltrados.length === 0 && (
          <div className="p-8 text-center text-ink-muted">
            Nenhum termo encontrado para "{busca}". Tente buscar por "tensão", "corrente" ou "curto".
          </div>
        )}
      </div>
    </div>
  );
};
