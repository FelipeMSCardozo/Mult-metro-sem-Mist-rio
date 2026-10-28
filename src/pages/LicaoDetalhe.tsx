import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  ArrowLeft,
  ArrowRight,
  Info,
  Sparkles,
} from 'lucide-react';
import { Card, Button, LevelBadge, AlertBox, LedIndicator } from '../components/ui';
import { MultimeterInteractiveSvg } from '../illustrations/HardwareSvgs';
import { LICOES_PRATICAS, LicaoPratica } from '../content/licoes';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const LicaoDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [concluidas, setConcluidas] = useLocalStorage<string[]>(
    'multimetro_licoes_concluidas',
    []
  );

  const licaoIndex = LICOES_PRATICAS.findIndex((l) => l.id === id);
  const licao: LicaoPratica | undefined = LICOES_PRATICAS[licaoIndex];

  if (!licao) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-4">
        <h2 className="text-xl font-bold">Lição não encontrada</h2>
        <Link to="/licoes">
          <Button variant="primary">Voltar para todas as lições</Button>
        </Link>
      </div>
    );
  }

  const isDone = concluidas.includes(licao.id);

  const toggleConcluir = () => {
    if (isDone) {
      setConcluidas(concluidas.filter((item) => item !== licao.id));
    } else {
      setConcluidas([...concluidas, licao.id]);
    }
  };

  const proximaLicao = LICOES_PRATICAS[licaoIndex + 1];
  const licaoAnterior = LICOES_PRATICAS[licaoIndex - 1];

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-4xl mx-auto">
      {/* NAVEGAÇÃO DE VOLTA */}
      <div className="flex items-center justify-between">
        <Link to="/licoes">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
            Voltar para a Trilha
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink-muted">
            Lição {licao.numero} de {LICOES_PRATICAS.length}
          </span>
          <LedIndicator on={isDone} size="sm" />
        </div>
      </div>

      {/* HEADER DA LIÇÃO */}
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <LevelBadge level={licao.nivel} />
          <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-bench-elevated text-ink-muted border border-bench-border flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {licao.duracaoMinutos} minutos
          </span>
          {licao.circuitoLigado ? (
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Circuito Ligado (USB)
            </span>
          ) : (
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
              Circuito Desligado
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
          {licao.titulo}
        </h1>
        <p className="text-base text-ink-muted leading-relaxed">
          {licao.subtitulo}
        </p>
      </Card>

      {/* ALERTA DE SEGURANÇA (SE HOUVER) */}
      {licao.alertaSeguranca && (
        <AlertBox type="danger" title="Cuidado Obrigatório">
          {licao.alertaSeguranca}
        </AlertBox>
      )}

      {/* GUIA DE CONFIGURAÇÃO DO MULTÍMETRO */}
      <Card className="space-y-4">
        <h2 className="text-sm font-bold text-ink uppercase tracking-wider">
          1. Como preparar o Multímetro
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/5">
            <span className="text-xs font-bold text-red-500 uppercase block">Ponta Vermelha (+)</span>
            <span className="text-sm font-semibold text-ink mt-0.5 block">{licao.pontaVermelha}</span>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-700/30 bg-slate-800/10">
            <span className="text-xs font-bold text-ink-muted uppercase block">Ponta Preta (-)</span>
            <span className="text-sm font-semibold text-ink mt-0.5 block">{licao.pontaPreta}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0A0E14] border border-bench-border flex flex-col items-center justify-center">
          <p className="text-xs text-slate-400 mb-2 font-mono">
            Posição da chave: {licao.posicaoEscala}
          </p>
          <MultimeterInteractiveSvg
            activeMode={licao.modoSeletor}
            displayText={licao.posicaoEscala.includes('20V') ? '5.01 V' : '0.00'}
          />
        </div>
      </Card>

      {/* PASSO A PASSO */}
      <Card className="space-y-4">
        <h2 className="text-sm font-bold text-ink uppercase tracking-wider">
          2. Passo a Passo na Bancada
        </h2>
        <ol className="space-y-3">
          {licao.passos.map((passo, idx) => (
            <li
              key={idx}
              className="p-3.5 rounded-xl bg-bench-elevated border border-bench-border flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-accent text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <h3 className="font-bold text-ink text-sm">{passo.titulo}</h3>
                <p className="text-sm text-ink-muted mt-0.5 leading-relaxed">
                  {passo.detalhe}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* O QUE VOCÊ DEVE VER */}
      <Card className="space-y-3 border-accent/40 bg-accent/5">
        <h2 className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" />
          3. O que você deve ver no visor
        </h2>
        <p className="text-base font-semibold text-ink leading-relaxed">
          {licao.oQueVoceDeveVer}
        </p>
      </Card>

      {/* DICA DE MESTRE */}
      <div className="p-4 rounded-2xl bg-bench-elevated border border-bench-border">
        <h3 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 mb-1">
          <Info className="w-4 h-4 text-accent" />
          Dica de Mestre
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed">
          {licao.dicaMestre}
        </p>
      </div>

      {/* BOTÃO DE CONCLUSÃO */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-ink text-base">Fez na sua bancada e deu certo?</h3>
          <p className="text-xs text-ink-muted">Marque como concluída para acender o LED no seu progresso.</p>
        </div>
        <Button
          variant={isDone ? 'secondary' : 'primary'}
          onClick={toggleConcluir}
          icon={isDone ? <CheckCircle2 className="w-5 h-5 text-led" /> : <Sparkles className="w-5 h-5" />}
        >
          {isDone ? 'Concluída (LED Aceso!)' : 'Marcar como Concluída'}
        </Button>
      </Card>

      {/* NAVEGAÇÃO PRÓXIMA / ANTERIOR */}
      <div className="flex items-center justify-between pt-4">
        {licaoAnterior ? (
          <Link to={`/licoes/${licaoAnterior.id}`}>
            <Button variant="secondary" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Lição #{licaoAnterior.numero}
            </Button>
          </Link>
        ) : <div />}

        {proximaLicao && (
          <Link to={`/licoes/${proximaLicao.id}`}>
            <Button variant="primary" size="sm">
              Próxima: Lição #{proximaLicao.numero}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
