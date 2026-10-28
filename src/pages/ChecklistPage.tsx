import React, { useState } from 'react';
import {
  CheckSquare,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import { Card, Button, Checklist, ProgressBar, LedIndicator } from '../components/ui';
import { ITENS_CHECKLIST } from '../content/checklist';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ChecklistPage: React.FC = () => {
  const [checkedIds, setCheckedIds] = useLocalStorage<string[]>(
    'multimetro_checklist_checked',
    []
  );
  const [copied, setCopied] = useState(false);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const resetar = () => {
    setCheckedIds([]);
  };

  const copiarRelatorio = () => {
    const texto = ITENS_CHECKLIST.map((item) => {
      const marcado = checkedIds.includes(item.id) ? '[X]' : '[ ]';
      return `${marcado} ${item.titulo}\n    -> ${item.comoTestar}`;
    }).join('\n\n');

    navigator.clipboard.writeText(
      `CHECKLIST DE BANCADA — ANTES DE PEDIR AJUDA\n\n${texto}\n\nConferido em: ${new Date().toLocaleDateString('pt-BR')}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const total = ITENS_CHECKLIST.length;
  const count = checkedIds.length;
  const porcentagem = Math.round((count / total) * 100);

  const itemsFormatted = ITENS_CHECKLIST.map((item) => ({
    id: item.id,
    label: `${item.titulo} — ${item.comoTestar}`,
  }));

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-4xl mx-auto">
      {/* CABEÇALHO */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider">
            Revisão de Bancada
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
            <CheckSquare className="w-7 h-7 text-accent" />
            Checklist "Antes de Pedir Ajuda"
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Marque na tela ou copie para o bloco de notas. 90% dos problemas são resolvidos nestes 8 itens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={copiarRelatorio} icon={copied ? <Check className="w-4 h-4 text-led" /> : <Copy className="w-4 h-4" />}>
            {copied ? 'Copiado!' : 'Copiar Lista'}
          </Button>
          <Button variant="ghost" size="sm" onClick={resetar} icon={<RotateCcw className="w-4 h-4" />}>
            Limpar
          </Button>
        </div>
      </div>

      {/* BARRA DE PROGRESSO */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-accent/5 border-accent/30">
        <div className="w-full sm:max-w-md">
          <ProgressBar
            value={count}
            max={total}
            label={`${count} de ${total} verificações aprovadas (${porcentagem}%)`}
          />
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-ink-muted shrink-0">
          <LedIndicator on={count === total} size="sm" />
          <span>{count === total ? 'Tudo conferido! Circuito pronto para ligar!' : 'Marque os itens conferidos'}</span>
        </div>
      </Card>

      {/* LISTA DE ITENS INTERATIVOS */}
      <Card>
        <Checklist
          items={itemsFormatted}
          checkedIds={checkedIds}
          onToggle={toggleItem}
        />
      </Card>

      {/* DICA DE APOIO */}
      <div className="p-4 rounded-2xl bg-bench-elevated border border-bench-border flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          Se todos os 8 itens estiverem marcados e seu projeto ainda apresentar comportamento estranho, o hardware está 100% perfeito: o detalhe está na lógica do sketch. Abra o aplicativo <strong>Código Explicado</strong> para entender a linha exata que comanda sua placa.
        </p>
      </div>
    </div>
  );
};
