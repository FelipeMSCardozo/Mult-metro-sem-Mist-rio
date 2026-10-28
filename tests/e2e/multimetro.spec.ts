import { test, expect } from '@playwright/test';

test.describe('App 1: Multímetro sem Mistério E2E', () => {
  test('navigates routes, completes diagnostic flow, and checks 0 errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Visitar Home
    await page.goto('/Mult-metro-sem-Mist-rio/#/');
    await expect(page.locator('h1')).toContainText('Descubra onde seu circuito parou');

    // 2. Fluxo Principal de Diagnóstico
    await page.getByRole('button', { name: 'Meu Projeto Não Funciona: Iniciar Diagnóstico' }).click();
    await expect(page).toHaveURL(/#\/diagnostico/);
    await expect(page.locator('h1')).toContainText('Diagnóstico Guiado');

    // Selecionar sintoma "O LED não acende"
    await page.getByRole('button', { name: 'O LED não acende' }).click();
    await expect(page.getByText('Passo 1 de 3')).toBeVisible();

    // Passo 1: Sucesso
    await page.getByRole('button', { name: 'O valor está normal' }).click();
    await expect(page.getByText('Passo 2 de 3')).toBeVisible();

    // Passo 2: Testar bifurcação de falha
    await page.getByRole('button', { name: 'O valor deu diferente' }).click();
    await expect(page.getByText('Problema Localizado')).toBeVisible();
    await expect(page.getByText('LED queimado por sobretensão')).toBeVisible();

    // 3. Conheça seu Multímetro (Seletor)
    await page.goto('/Mult-metro-sem-Mist-rio/#/seletor');
    await expect(page.locator('h1')).toContainText('Conheça seu Multímetro');
    await page.getByRole('button', { name: /Continuidade/ }).click();
    await expect(page.getByText('Emite um apito sonoro alto')).toBeVisible();

    // 4. Trilha de Lições
    await page.goto('/Mult-metro-sem-Mist-rio/#/licoes');
    await expect(page.locator('h1')).toContainText('7 Lições Práticas');
    await page.getByText('Medir Tensão DC nos Pinos').click();
    await expect(page.locator('h1')).toContainText('Medir Tensão DC nos Pinos 5V');

    // Marcar lição como concluída
    const concluirBtn = page.getByRole('button', { name: /Marcar como Concluída/ });
    await concluirBtn.click();
    await expect(page.getByRole('button', { name: /Concluída/ })).toBeVisible();

    // 5. Checklist
    await page.goto('/Mult-metro-sem-Mist-rio/#/checklist');
    await expect(page.locator('h1')).toContainText('Checklist');
    const checkBtn = page.locator('ul button').first();
    await checkBtn.click();
    await page.waitForTimeout(100);
    await expect(checkBtn).toHaveAttribute('aria-pressed', 'true');

    // 6. Segurança
    await page.goto('/Mult-metro-sem-Mist-rio/#/seguranca');
    await expect(page.getByText('PROIBIDO MEDIR TOMADAS DOMÉSTICAS')).toBeVisible();

    // 7. Glossário
    await page.goto('/Mult-metro-sem-Mist-rio/#/glossario');
    await expect(page.locator('h1')).toContainText('Glossário');

    // 8. Sobre
    await page.goto('/Mult-metro-sem-Mist-rio/#/sobre');
    await expect(page.locator('h1')).toContainText('Sobre o Multímetro sem Mistério');

    // Zero console errors
    const realErrors = consoleErrors.filter((e) => !e.includes('favicon'));
    expect(realErrors).toEqual([]);
  });
});

test('PWA manifest and service worker are served properly', async ({ request }) => {
  const manifest = await request.get('/Mult-metro-sem-Mist-rio/manifest.webmanifest');
  expect(manifest.status()).toBe(200);
  const json = await manifest.json();
  expect(json.name).toBe('Multímetro sem Mistério');

  const sw = await request.get('/Mult-metro-sem-Mist-rio/sw.js');
  expect(sw.status()).toBe(200);
});
