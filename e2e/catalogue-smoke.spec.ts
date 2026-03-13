import { test, expect } from '@playwright/test'

test.describe('Catalogue to dataset detail', () => {
  test('catalogue page renders dataset cards and navigates to detail', async ({
    page,
  }) => {
    await page.goto('/data')

    // Catalogue heading is visible
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toBeVisible()

    // At least 3 dataset cards (links to /data/<slug>) are visible
    const datasetLinks = page.locator('a[href^="/data/"]')
    await expect(datasetLinks.first()).toBeVisible()
    expect(await datasetLinks.count()).toBeGreaterThanOrEqual(3)

    // Click the first dataset card and verify detail page renders
    const firstLink = datasetLinks.first()
    const href = await firstLink.getAttribute('href')
    await firstLink.click()

    // URL should now be /data/<slug>
    await expect(page).toHaveURL(href!)

    // Dataset detail heading should be visible
    await expect(
      page.getByRole('heading', { level: 1 })
    ).toBeVisible()

    // Detail page should contain section navigation
    await expect(page.getByLabel('Page navigation')).toBeVisible()
  })

  test('dataset detail page shows overview and schema sections', async ({
    page,
  }) => {
    await page.goto('/data/global-satellite-foot-traffic')

    // Dataset name in heading
    await expect(
      page.getByRole('heading', { level: 1, name: /Global Satellite Foot Traffic/i })
    ).toBeVisible()

    // Overview section is present
    await expect(page.locator('#overview')).toBeVisible()

    // Schema section is present
    await expect(page.locator('#schema')).toBeVisible()
  })
})
