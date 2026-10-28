import { Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Diagnostico } from './pages/Diagnostico';
import { Seletor } from './pages/Seletor';
import { Licoes } from './pages/Licoes';
import { LicaoDetalhe } from './pages/LicaoDetalhe';
import { ChecklistPage } from './pages/ChecklistPage';
import { SegurancaPage } from './pages/SegurancaPage';
import { GlossarioPage } from './pages/GlossarioPage';
import { SobrePage } from './pages/SobrePage';

export default function App() {
  return (
    <div data-app="multimetro" className="min-h-screen bg-bench text-ink flex flex-col transition-colors selection:bg-accent/20">
      <Navigation />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
          <Route path="/seletor" element={<Seletor />} />
          <Route path="/licoes" element={<Licoes />} />
          <Route path="/licoes/:id" element={<LicaoDetalhe />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/seguranca" element={<SegurancaPage />} />
          <Route path="/glossario" element={<GlossarioPage />} />
          <Route path="/sobre" element={<SobrePage />} />
        </Routes>
      </main>
      <footer className="hidden md:block py-6 border-t border-bench-border text-center text-xs text-ink-muted">
        Multímetro sem Mistério • Bônus Exclusivo 80 Projetos Arduino
      </footer>
    </div>
  );
}
