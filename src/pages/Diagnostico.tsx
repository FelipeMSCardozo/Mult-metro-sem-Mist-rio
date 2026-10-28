import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import {
  Card,
  Button,
  Stepper,
  LedIndicator,
} from '../components/ui';
import {
  MultimeterInteractiveSvg,
} from '../illustrations/HardwareSvgs';
import {
  SINTOMAS_DIAGNOSTICO,
  DiagnosticoSintoma,
  PassoDiagnostico,
  VereditoFinal,
} from '../content/diagnostico';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Diagnostico: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sintomaParam = searchParams.get('sintoma');

  const [sintomaAtivo, setSintomaAtivo] = useState<DiagnosticoSintoma>(() => {
    const found = SINTOMAS_DIAGNOSTICO.find((s) => s.id === sintomaParam);
    return found || SINTOMAS_DIAGNOSTICO[0];
  });

  const [passoAtual, setPassoAtual] = useState(0);
  const [vereditoFalha, setVereditoFalha] = useState<VereditoFinal | null>(null);
  const [concluidoSucesso, setConcluidoSucesso] = useState(false);

  const [, setUltimoSintoma] = useLocalStorage<string | null>(
    'multimetro_ultimo_sintoma',
    sintomaAtivo.id
  );

  useEffect(() => {
    if (sintomaParam) {
      const found = SINTOMAS_DIAGNOSTICO.find((s) => s.id === sintomaParam);
      if (found) {
        setSintomaAtivo(found);
        setPassoAtual(0);
        setVereditoFalha(null);
        setConcluidoSucesso(false);
        setUltimoSintoma(found.id);
      }
    }
  }, [sintomaParam, setUltimoSintoma]);

  const selecionarSintoma = (sintoma: DiagnosticoSintoma) => {
    setSintomaAtivo(sintoma);
    setSearchParams({ sintoma: sintoma.id });
    setPassoAtual(0);
    setVereditoFalha(null);
    setConcluidoSucesso(false);
    setUltimoSintoma(sintoma.id);
  };

  const passo: PassoDiagnostico | undefined = sintomaAtivo.passos[passoAtual];

  const handleValorNormal = () => {
    if (passoAtual + 1 < sintomaAtivo.passos.length) {
      setPassoAtual((p) => p + 1);
      setVereditoFalha(null);
    } else {
      setConcluidoSucesso(true);
      setVereditoFalha(null);
    }
  };

  const handleValorDiferente = () => {
    if (passo) {
      setVereditoFalha(passo.seDiferente.veredito);
    }
  };

  const reiniciar = () => {
    setPassoAtual(0);
    setVereditoFalha(null);
    setConcluidoSucesso(false);
  };

  const stepperSteps = sintomaAtivo.passos.map((p) => ({
    title: p.titulo,
    description: p.valorEsperado,
  }));

  const completedSteps = Array.from({ length: passoAtual }, (_, i) => i);
  if (concluidoSucesso) {
    completedSteps.push(sintomaAtivo.passos.length - 1);
  }

  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-5xl mx-auto">
      {/* CABEÇALHO */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">
              Assistente de Bancada
            </span>
            <LedIndicator on={concluidoSucesso} size="sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
            <Wrench className="w-7 h-7 text-accent" />
            Diagnóstico Guiado com Multímetro
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            Siga os testes em ordem lógica. Não chute: deixe o multímetro apontar a causa exata.
          </p>
        </div>

        <Link to="/">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
            Voltar para o Início
          </Button>
        </Link>
      </div>

      {/* SELETOR DE SINTOMA (CHIPS HORIZONTAIS) */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
          Qual sintoma você quer diagnosticar agora?
        </label>
        <div className="flex overflow-x-auto gap-2 pb-2 pt-1 no-scrollbar">
          {SINTOMAS_DIAGNOSTICO.map((s) => {
            const isSelected = s.id === sintomaAtivo.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selecionarSintoma(s)}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 min-h-[44px] shrink-0 border ${
                  isSelected
                    ? 'bg-accent text-white dark:text-slate-950 border-accent font-bold shadow-sm'
                    : 'bg-bench-card text-ink-muted hover:text-ink border-bench-border hover:bg-bench-elevated'
                }`}
              >
                <span>{s.titulo}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PAINEL PRINCIPAL DO TESTE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* COLUNA ESQUERDA: STEPPER & ESTADO */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <h2 className="text-sm font-bold text-ink uppercase tracking-wider mb-3">
              Roteiro de Testes ({sintomaAtivo.passos.length} etapas)
            </h2>
            <Stepper steps={stepperSteps} completedSteps={completedSteps} />
          </Card>

          <Card className="bg-bench-elevated/50">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">
              Regra de Ouro desta Etapa
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Encoste sempre as pontas de prova firmemente nas partes metálicas dos fios ou pernas dos componentes. Mau contato com as mãos trementes causa leituras falsas no display.
            </p>
          </Card>
        </div>

        {/* COLUNA DIREITA: INSTRUÇÃO DO PASSO ATUAL OU VEREDITO */}
        <div className="lg:col-span-8 space-y-6">
          {/* SE CONCLUIU COM SUCESSO */}
          {concluidoSucesso && (
            <Card className="border-led/50 bg-led/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-led text-slate-950 font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-led-dark dark:text-led uppercase tracking-wider">
                    Diagnóstico Elétrico Concluído
                  </span>
                  <h3 className="text-xl font-extrabold text-ink">
                    Circuito elétrico 100% íntegro e alimentado!
                  </h3>
                </div>
              </div>

              <p className="text-sm text-ink-muted leading-relaxed">
                Todas as medições de tensão, continuidade e polaridade bateram com os valores corretos de bancada. Como o hardware físico está perfeito, a razão de não funcionar está no <strong>código</strong> ou na configuração da porta serial.
              </p>

              <div className="p-4 rounded-xl bg-bench-card border border-bench-border space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-ink">
                  Próximos passos recomendados:
                </h4>
                <ul className="text-xs text-ink-muted space-y-1 list-disc list-inside">
                  <li>Abra o sketch no Arduino IDE e faça upload novamente.</li>
                  <li>Confira a velocidade do Monitor Serial (ex: 9600 ou 115200 baud).</li>
                  <li>Use o aplicativo bônus <strong>Código Explicado</strong> para ver a explicação linha a linha do seu projeto.</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="primary" onClick={reiniciar} icon={<RotateCcw className="w-4 h-4" />}>
                  Refazer Testes
                </Button>
                <Link to="/seletor">
                  <Button variant="secondary">Ir para o Seletor do Multímetro</Button>
                </Link>
              </div>
            </Card>
          )}

          {/* SE DEU FALHA E TEM VEREDITO */}
          {vereditoFalha && (
            <Card className="border-rose-500/50 bg-rose-500/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500 text-white font-bold">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                    Problema Localizado • Causa: {vereditoFalha.categoria.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-extrabold text-ink">
                    {vereditoFalha.titulo}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-ink leading-relaxed">
                {vereditoFalha.explicacao}
              </p>

              <div className="p-4 rounded-xl bg-bench-card border border-bench-border space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-ink flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-accent" />
                  Como corrigir agora na bancada:
                </h4>
                <ol className="text-sm text-ink-muted space-y-2 list-decimal list-inside">
                  {vereditoFalha.passosCorrecao.map((passoTxt, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {passoTxt}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="primary" onClick={() => setVereditoFalha(null)} icon={<CheckCircle2 className="w-4 h-4" />}>
                  Já corrigi! Testar Novamente
                </Button>
                <Button variant="secondary" onClick={reiniciar} icon={<RotateCcw className="w-4 h-4" />}>
                  Reiniciar Diagnóstico
                </Button>
              </div>
            </Card>
          )}

          {/* PASSO ATIVO DE TESTE */}
          {!concluidoSucesso && !vereditoFalha && passo && (
            <Card className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-bench-border">
                <div>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    Passo {passo.numero} de {sintomaAtivo.passos.length}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-ink mt-0.5">
                    {passo.titulo}
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-accent/15 text-accent-text dark:text-accent border border-accent/20">
                  {passo.posicaoSeletor}
                </span>
              </div>

              {/* INSTRUÇÃO DIDÁTICA */}
              <div className="p-4 rounded-2xl bg-bench-elevated border border-bench-border">
                <p className="text-base text-ink leading-relaxed">
                  {passo.instrucao}
                </p>
              </div>

              {/* DIAGRAMA INTERATIVO DO MULTÍMETRO E PONTAS */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/5 flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-red-500 uppercase tracking-wider">
                        Ponta Vermelha (+)
                      </p>
                      <p className="text-sm font-semibold text-ink mt-0.5">
                        {passo.ondePontaVermelha}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-700/30 bg-slate-800/10 flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-300 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                        Ponta Preta (-)
                      </p>
                      <p className="text-sm font-semibold text-ink mt-0.5">
                        {passo.ondePontaPreta}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SVG DO MULTÍMETRO NA ESCALA EXATA */}
                <div className="p-4 rounded-2xl bg-[#0A0E14] border border-bench-border flex flex-col items-center justify-center">
                  <p className="text-xs text-slate-400 mb-2 font-mono">
                    Posição automática do seletor para este teste:
                  </p>
                  <MultimeterInteractiveSvg
                    activeMode={passo.seletorModo}
                    displayText={passo.valorEsperado.split(' ')[0] || '5.01'}
                  />
                </div>
              </div>

              {/* VALOR ESPERADO */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <p className="text-xs font-bold text-accent uppercase tracking-wider">
                  O que o multímetro deve mostrar:
                </p>
                <p className="text-lg font-mono font-bold text-ink">
                  {passo.valorEsperado}
                </p>
                <p className="text-xs text-ink-muted">
                  {passo.explicacaoValor}
                </p>
              </div>

              {/* BIFURCAÇÃO DE DECISÃO */}
              <div className="pt-2 space-y-3">
                <p className="text-xs font-bold text-ink-muted uppercase tracking-wider text-center">
                  Qual foi o resultado da sua medição?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleValorNormal}
                    icon={<CheckCircle2 className="w-5 h-5 text-slate-950" />}
                  >
                    O valor está normal (deu certo)
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleValorDiferente}
                    className="border-rose-500/40 text-rose-500 hover:bg-rose-500/10"
                    icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
                  >
                    O valor deu diferente (falhou)
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
