import React from 'react';
import { Gauge, Smartphone, WifiOff, ShieldCheck } from 'lucide-react';
import { Card } from '../components/ui';

export const SobrePage: React.FC = () => {
  return (
    <div className="space-y-6 pb-20 md:pb-8 max-w-4xl mx-auto">
      <div>
        <span className="text-xs font-bold text-accent uppercase tracking-wider">
          Guia do Usuário
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink flex items-center gap-2 mt-0.5">
          <Gauge className="w-7 h-7 text-accent" />
          Sobre o Multímetro sem Mistério
        </h1>
        <p className="text-sm text-ink-muted mt-1">
          Feito sob medida para iniciantes, estudantes e hobbistas da bancada Arduino.
        </p>
      </div>

      <Card className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Por que este aplicativo existe?</h2>
        <p className="text-sm text-ink-muted leading-relaxed">
          Quase todo mundo que começa no Arduino compra um kit com multímetro digital amarelo, mas o aparelho passa meses guardado na gaveta porque ninguém ensina como usar de verdade.
        </p>
        <p className="text-sm text-ink-muted leading-relaxed">
          Este aplicativo não é um manual chato de física teórica. Ele foi desenvolvido com foco em resolução rápida de problemas reais de bancada: fios soltos, LEDs invertidos, baterias fracas e erros de montagem na protoboard.
        </p>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="space-y-2">
          <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold">
            <WifiOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink text-sm">Funciona 100% Offline</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Depois de carregar pela primeira vez, você pode usar este app na sua bancada sem depender de internet.
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink text-sm">Instalável no Celular</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Adicione à tela inicial do seu celular (PWA) para ter um assistente tátil sempre ao lado da protoboard.
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-500 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-ink text-sm">Privacidade Total</h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Sem cadastros, sem rastreadores e sem envio de dados. Seu progresso fica 100% gravado no seu próprio navegador.
          </p>
        </Card>
      </div>

      <footer className="pt-8 border-t border-bench-border text-center text-xs text-ink-muted">
        Multímetro sem Mistério • Bônus Exclusivo do treinamento "80 Projetos Arduino"
      </footer>
    </div>
  );
};
