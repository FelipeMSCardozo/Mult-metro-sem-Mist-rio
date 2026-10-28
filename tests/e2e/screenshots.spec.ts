import { test } from '@playwright/test';

test('capture screenshots of main screens', async ({ page }, testInfo) => {
  const isMobile = testInfo.project.name.includes('Mobile');
  const folder = isMobile ? 'mobile' : 'desktop';

  // Home
  await page.goto('/Mult-metro-sem-Mist-rio/#/');
  await page.screenshot({ path: `screenshots/${folder}/01_home.png`, fullPage: false });

  // Diagnóstico
  await page.goto('/Mult-metro-sem-Mist-rio/#/diagnostico?sintoma=led-nao-acende');
  await page.screenshot({ path: `screenshots/${folder}/02_diagnostico.png`, fullPage: false });

  // Seletor
  await page.goto('/Mult-metro-sem-Mist-rio/#/seletor');
  await page.screenshot({ path: `screenshots/${folder}/03_seletor.png`, fullPage: false });

  // Lição
  await page.goto('/Mult-metro-sem-Mist-rio/#/licoes/medir-pinos-arduino');
  await page.screenshot({ path: `screenshots/${folder}/04_licao.png`, fullPage: false });

  // Checklist
  await page.goto('/Mult-metro-sem-Mist-rio/#/checklist');
  await page.screenshot({ path: `screenshots/${folder}/05_checklist.png`, fullPage: false });
});
