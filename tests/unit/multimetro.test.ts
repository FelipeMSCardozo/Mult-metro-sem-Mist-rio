import { describe, it, expect } from 'vitest';
import { SINTOMAS_DIAGNOSTICO } from '../../src/content/diagnostico';
import { POSICOES_SELETOR } from '../../src/content/seletor';
import { LICOES_PRATICAS } from '../../src/content/licoes';
import { ITENS_CHECKLIST } from '../../src/content/checklist';
import { REGRAS_SEGURANCA } from '../../src/content/seguranca';

describe('App 1 - Multímetro sem Mistério Content Validation', () => {
  it('covers the 7 essential diagnostic symptoms', () => {
    expect(SINTOMAS_DIAGNOSTICO.length).toBeGreaterThanOrEqual(7);
    const ids = SINTOMAS_DIAGNOSTICO.map((s) => s.id);
    expect(ids).toContain('nada-liga');
    expect(ids).toContain('led-nao-acende');
    expect(ids).toContain('motor-nao-gira');
    expect(ids).toContain('sensor-estranho');
    expect(ids).toContain('porta-sumiu');
    expect(ids).toContain('botao-falha');
    expect(ids).toContain('leds-todos-acesos');
  });

  it('guarantees each diagnostic step has valid multimeter settings and bifurcation', () => {
    SINTOMAS_DIAGNOSTICO.forEach((sintoma) => {
      expect(sintoma.passos.length).toBeGreaterThan(0);
      sintoma.passos.forEach((passo) => {
        expect(passo.seletorModo).toBeDefined();
        expect(passo.valorEsperado).toBeTruthy();
        expect(passo.seDiferente.veredito.categoria).toMatch(/fio|peca|ligacao|alimentacao|codigo/);
        expect(passo.seDiferente.veredito.passosCorrecao.length).toBeGreaterThan(0);
      });
    });
  });

  it('has interactive selector positions covering V DC, AC, Ohms, Continuity, Diode, mA', () => {
    const modes = POSICOES_SELETOR.map((p) => p.mode);
    expect(modes).toContain('DCV_20');
    expect(modes).toContain('CONT');
    expect(modes).toContain('DIODE');
    expect(modes).toContain('OHM_2K');
    expect(modes).toContain('DCA_200M');
  });

  it('includes 7 complete practical lessons', () => {
    expect(LICOES_PRATICAS.length).toBe(7);
    LICOES_PRATICAS.forEach((licao) => {
      expect(licao.duracaoMinutos).toBeGreaterThan(0);
      expect(licao.passos.length).toBeGreaterThan(0);
      expect(licao.oQueVoceDeveVer).toBeTruthy();
      expect(licao.dicaMestre).toBeTruthy();
    });
  });

  it('enforces safety rules banning 127V/220V household mains testing', () => {
    const safetyIds = REGRAS_SEGURANCA.map((r) => r.id);
    expect(safetyIds).toContain('sem-tomada');
    expect(safetyIds).toContain('circuito-desligado-resistencia');
    expect(safetyIds).toContain('tensao-paralelo-corrente-serie');
  });

  it('has an 8-item checklist before asking for help', () => {
    expect(ITENS_CHECKLIST.length).toBe(8);
  });
});
