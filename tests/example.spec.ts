import { test, expect } from '@playwright/test';

test.describe('HUB Consumer Finance - Command Center', () => {

  test('should load home page with title and welcome message', async ({ page }) => {
    await page.goto('/');

    // Validate main heading
    await expect(page.getByRole('heading', { name: /Command Center/i })).toBeVisible();

    // Validate the welcome text
    await expect(page.getByText('Bem-vindo ao HUB Consumer Finance')).toBeVisible();
  });

  test('should display sidebar navigation', async ({ page }) => {
    await page.goto('/');

    // The sidebar should be visible
    const sidebar = page.locator('aside, nav, [role="complementary"]').first();
    await expect(sidebar).toBeVisible();
  });

  test('should navigate to service detail page', async ({ page }) => {
    await page.goto('/service/core-billing');

    // The service name should appear as heading
    await expect(page.getByRole('heading', { name: /core-billing/i })).toBeVisible();

    // Squad and domain badges should be visible
    await expect(page.getByText('Squad: Finanças')).toBeVisible();
  });

});

test.describe('HUB Consumer Finance - Service Detail: Overview Tático', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/service/core-billing');
  });

  test('should display FinOps card with cloud costs', async ({ page }) => {
    // FinOps card title
    await expect(page.getByText('Cloud Costs & Waste')).toBeVisible();

    // Mocked projected cost should be rendered
    await expect(page.getByText('Projeção do Mês')).toBeVisible();
  });

  test('should display AppSec Security Scorecard', async ({ page }) => {
    // Security card title
    await expect(page.getByText('Security Scorecard')).toBeVisible();

    // Vulnerability section
    await expect(page.getByText('Vulnerabilidades Abertas')).toBeVisible();
  });

  test('should display GitHub Actions CI/CD card', async ({ page }) => {
    // CI/CD card title
    await expect(page.getByText('GitHub Actions')).toBeVisible();

    // Should show pipeline runs
    await expect(page.getByText('Últimas 5 runs do pipeline')).toBeVisible();
  });

  test('should display Jira & ServiceNow ITSM card', async ({ page }) => {
    // ITSM section
    await expect(page.getByText('Jira & ServiceNow')).toBeVisible();

    // Jira sprint section
    await expect(page.getByText('Jira - Active Sprint')).toBeVisible();

    // ServiceNow incidents section
    await expect(page.getByText('ServiceNow - Incidentes Abertos')).toBeVisible();
  });

});

test.describe('HUB Consumer Finance - Service Detail: Cadeia de Valor', () => {

  test('should switch to Cadeia de Valor tab', async ({ page }) => {
    await page.goto('/service/core-billing');

    // Click on the "Cadeia de Valor" tab
    await page.getByRole('tab', { name: /Cadeia de Valor/i }).click();

    // The graph placeholder should show the domain
    const valueChainTab = page.getByRole('tabpanel');
    await expect(valueChainTab.getByText('Payment Gateway')).toBeVisible();
  });

  test('should display React Flow placeholder message', async ({ page }) => {
    await page.goto('/service/core-billing');

    await page.getByRole('tab', { name: /Cadeia de Valor/i }).click();

    // The explanation about React Flow
    await expect(page.getByText(/React Flow/)).toBeVisible();
  });

});

test.describe('HUB Consumer Finance - Command Palette (Cmd+K)', () => {

  test('should open command palette via button click', async ({ page }) => {
    await page.goto('/');

    // Click on the search trigger button
    const searchButton = page.locator('button').filter({ hasText: /Pesquisar/i });
    await searchButton.click();

    // Should open the command dialog
    const dialog = page.locator('[cmdk-dialog], [role="dialog"]');
    await expect(dialog).toBeVisible();
  });

  test('should close command palette with Escape', async ({ page }) => {
    await page.goto('/');

    // Open the dialog
    const searchButton = page.locator('button').filter({ hasText: /Pesquisar/i });
    await searchButton.click();

    const dialog = page.locator('[cmdk-dialog], [role="dialog"]');
    await expect(dialog).toBeVisible();

    // Close it
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });

  test('should show services and incidents in command palette', async ({ page }) => {
    await page.goto('/');

    // Open the dialog
    const searchButton = page.locator('button').filter({ hasText: /Pesquisar/i });
    await searchButton.click();

    // Verify service entries exist
    await expect(page.getByText('Core Billing Service')).toBeVisible();
    await expect(page.getByText('Payment Gateway')).toBeVisible();

    // Verify incident entries exist
    await expect(page.getByText(/INC-10924/)).toBeVisible();
  });

});

test.describe('HUB Consumer Finance - Theme Toggle', () => {

  test('should have a theme toggle button', async ({ page }) => {
    await page.goto('/');

    // The header should contain a theme toggle button
    const themeButton = page.locator('header button').filter({ has: page.locator('svg') }).last();
    await expect(themeButton).toBeVisible();

    // Click it to toggle
    await themeButton.click();
  });

});
