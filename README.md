# Multímetro sem Mistério: descubra onde seu circuito parou

> **Bônus Exclusivo — 80 Projetos Arduino**  
> Aplicação Web estática (PWA) de bancada, desenvolvida em React + TypeScript + Tailwind CSS, com funcionamento 100% offline e deploy automatizado no GitHub Pages.

---

## 🎯 Promessa do Aplicativo

Montou o projeto e não funcionou? Em vez de desmontar tudo na frustração ou ficar trocando fios às cegas, aprenda a usar o multímetro em passos simples e descubra em menos de 3 minutos se o defeito é no **fio**, na **peça**, na **ligação**, na **alimentação** ou no **código**.

---

## 🚀 Funcionalidades

1. **"Meu projeto não funciona" — Diagnóstico Guiado:**
   - 7 sintomas práticos de bancada (nada liga, LED não acende, LEDs acendem juntos, motor não gira, sensor lê valor estranho, porta USB sumiu, botão falha).
   - Testes em ordem lógica com diagramas SVG, indicação de ponta vermelha e preta, escala exata do seletor e valor esperado.
   - Bifurcação de diagnóstico com veredito direto e passos acionáveis de correção.
2. **Conheça seu Multímetro:**
   - Seletor rotativo vetorial interativo em SVG. Toque nas escalas (V⎓, V~, Ω, continuidade, mA/A, diodo) para ver onde conectar os bornes COM e VΩmA e quando NUNCA usar.
3. **7 Lições Práticas de Bancada:**
   - Medir tensão DC nos pinos 5V, 3.3V e GND do Arduino;
   - Medir a bateria de 9V e fontes;
   - Testar continuidade de jumper e trilha da protoboard;
   - Medir resistor e conferir pelo código de cores;
   - Testar LED (modo diodo) e identificar o polo;
   - Achar mau contato em conexões;
   - Medir corrente com segurança (em série, risco de queimar fusível).
4. **Regras de Segurança Inegociáveis:**
   - Proibição estrita de medição em tomadas de 127V/220V;
   - Circuito desligado para resistência e continuidade;
   - Tensão em paralelo e corrente em série.
5. **Checklist "Antes de pedir ajuda":**
   - 8 itens essenciais com marcação interativa salva em `localStorage`.
6. **Glossário com Analogias Práticas:**
   - Conceitos fundamentais explicados com linguagem simples e clara.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** React 18 + TypeScript (Strict Mode)
- **Estilos:** Tailwind CSS (Design System "Bancada de Eletrônica Premium")
- **Roteador:** React Router (HashRouter para suporte total ao GitHub Pages)
- **PWA:** `vite-plugin-pwa` com precache de assets e funcionamento offline
- **Ícones:** Lucide React
- **Tipografia:** `@fontsource/inter` e `@fontsource/jetbrains-mono` (fontes empacotadas localmente)
- **Qualidade & Testes:** Vitest (testes unitários), Playwright (testes E2E em mobile e desktop), ESLint e verificação de textos proibidos.

---

## 💻 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Rodar testes unitários
npm run test

# Rodar testes E2E (Playwright)
npm run test:e2e

# Verificar qualidade e ausência de termos proibidos
npm run check:forbidden

# Gerar build de produção
npm run build
```

---

## 🌐 Deploy no GitHub Pages

O deploy é executado automaticamente pelo GitHub Actions a cada commit na branch `main`. A URL publicada oficial é:
`https://felipemscardozo.github.io/Mult-metro-sem-Mist-rio/`
