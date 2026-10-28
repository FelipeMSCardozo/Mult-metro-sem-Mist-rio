import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Wrench,
  Gauge,
  BookOpen,
  CheckSquare,
  ShieldAlert,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  X,
  Activity,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { LedIndicator } from './ui';

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Início', icon: <Activity className="w-5 h-5" />, end: true },
    { to: '/diagnostico', label: 'Diagnóstico', icon: <Wrench className="w-5 h-5" /> },
    { to: '/seletor', label: 'Seletor', icon: <Gauge className="w-5 h-5" /> },
    { to: '/licoes', label: 'Lições', icon: <BookOpen className="w-5 h-5" /> },
    { to: '/checklist', label: 'Checklist', icon: <CheckSquare className="w-5 h-5" /> },
    { to: '/seguranca', label: 'Segurança', icon: <ShieldAlert className="w-5 h-5" /> },
    { to: '/glossario', label: 'Glossário', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* DESKTOP & TABLET HEADER */}
      <header className="sticky top-0 z-40 bg-bench-card/90 backdrop-blur-md border-b border-bench-border px-4 lg:px-8 py-3 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-slate-950 font-bold shadow-sm shadow-accent/20 group-hover:scale-105 transition-transform">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg text-ink tracking-tight">
                  Multímetro sem Mistério
                </span>
                <LedIndicator on={true} size="sm" />
              </div>
              <p className="text-[11px] text-ink-muted leading-none hidden sm:block">
                Descubra onde seu circuito parou
              </p>
            </div>
          </NavLink>

          {/* Links Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 min-h-[44px] ${
                    isActive
                      ? 'bg-accent/15 text-accent-text dark:text-accent font-bold'
                      : 'text-ink-muted hover:text-ink hover:bg-bench-elevated'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Ações Direita */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Alternar modo claro e escuro"
              className="p-2.5 rounded-xl border border-bench-border bg-bench-elevated text-ink hover:border-accent transition-all min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Menu Hambúrguer Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
              className="md:hidden p-2.5 rounded-xl border border-bench-border bg-bench-elevated text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Menu Dropdown Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-bench-border mt-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold min-h-[48px] ${
                    isActive
                      ? 'bg-accent text-white dark:text-slate-950 font-bold'
                      : 'text-ink hover:bg-bench-elevated'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (FIXO NA PARTE INFERIOR) */}
      <nav
        aria-label="Navegação móvel"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-bench-card/95 backdrop-blur-lg border-t border-bench-border px-2 py-1.5 flex items-center justify-around shadow-lg"
      >
        {[
          { to: '/', label: 'Início', icon: <Activity className="w-5 h-5" />, end: true },
          { to: '/diagnostico', label: 'Diagnóstico', icon: <Wrench className="w-5 h-5" /> },
          { to: '/seletor', label: 'Seletor', icon: <Gauge className="w-5 h-5" /> },
          { to: '/licoes', label: 'Lições', icon: <BookOpen className="w-5 h-5" /> },
          { to: '/checklist', label: 'Checklist', icon: <CheckSquare className="w-5 h-5" /> },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[11px] font-semibold transition-all min-h-[48px] min-w-[56px] ${
                isActive
                  ? 'text-accent font-bold scale-105'
                  : 'text-ink-muted hover:text-ink'
              }`
            }
          >
            {link.icon}
            <span className="mt-0.5">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};
