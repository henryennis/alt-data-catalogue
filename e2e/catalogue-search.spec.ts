import { test, expect } from '@playwright/test'

test.describe('Catalogue search and filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/data')
    // Wait for catalogue to fully render
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('search filters datasets and clearing restores all', async ({
    page,
  }) => {
    const datasetCards = page.locator('a[href^="/data/"]')

    // All 3 datasets visible initially
    await expect(datasetCards).toHaveCount(3)

    // Type a search query that matches only one dataset
    const searchInput = page.getByLabel('Search datasets')
    await searchInput.first().fill('satellite')

    // Wait for debounced search to filter results
    await expect(datasetCards).toHaveCount(1)
    await expect(
      page.getByText('Global Satellite Foot Traffic')
    ).toBeVisible()

    // Clear search and verify all datasets return
    await searchInput.first().fill('')
    await expect(datasetCards).toHaveCount(3)
  })

  test('category filter shows only matching datasets', async ({ page }) => {
    const datasetCards = page.locator('a[href^="/data/"]')

    // Click the "Sentiment & NLP" category (desktop sidebar button)
    await page.getByRole('button', { name: /Sentiment/i }).click()

    // Only sentiment datasets should appear (1 out of 3)
    await expect(datasetCards).toHaveCount(1)
    await expect(
      page.getByText('Twitter Financial Sentiment')
    ).toBeVisible()

    // Click "All Datasets" to reset
    await page.getByRole('button', { name: /All Datasets/i }).click()

    // All datasets return
    await expect(datasetCards).toHaveCount(3)
  })

  test('sort dropdown reorders datasets', async ({ page }) => {
    const sortSelect = page.getByLabel('Sort datasets')

    // Change sort to "Vendor"
    await sortSelect.selectOption('vendor')

    // Get the card texts in order - first card should be by alphabetically first vendor
    const firstCard = page.locator('a[href^="/data/"]').first()
    // Orbital Insight comes first alphabetically among: Orbital Insight, SEC EDGAR, SocialSentiment
    await expect(firstCard).toContainText('Orbital Insight')

    // Change sort to "Credits"
    await sortSelect.selectOption('credits')

    // Credits are: 0.8, 1.2, 0.5 — sorted numerically: 0.5 first
    const firstCardAfterCredits = page.locator('a[href^="/data/"]').first()
    await expect(firstCardAfterCredits).toContainText('SEC 13F Holdings')
  })
})
