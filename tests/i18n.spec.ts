import { test, expect } from "@playwright/test";

const LOCALES: Array<{ code: string; path: string; bcp47: string; og: string }> = [
  { code: "en", path: "/", bcp47: "en-ZA", og: "en_ZA" },
  { code: "af", path: "/af", bcp47: "af-ZA", og: "af_ZA" },
  { code: "de", path: "/de", bcp47: "de-DE", og: "de_DE" },
  { code: "fr", path: "/fr", bcp47: "fr-FR", og: "fr_FR" },
  { code: "da", path: "/da", bcp47: "da-DK", og: "da_DK" },
];

for (const { code, path, bcp47, og } of LOCALES) {
  test(`${code}: home page renders with correct lang/OG/hreflang`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page.locator("html")).toHaveAttribute("lang", bcp47);

    const ogLocale = page.locator('meta[property="og:locale"]');
    await expect(ogLocale).toHaveAttribute("content", og);

    for (const other of LOCALES.filter((l) => l.code !== code)) {
      const link = page.locator(`link[rel="alternate"][hreflang="${other.code}"]`);
      await expect(link).toHaveCount(1);
    }
    const xDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(xDefault).toHaveCount(1);
  });

  test(`${code}: deep page (property detail) renders 200`, async ({ page }) => {
    const slug = "the-rose";
    const url = code === "en" ? `/properties/${slug}` : `/${code}/properties/${slug}`;
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", bcp47);
  });

  test(`${code}: property-application page renders 200 with form`, async ({ page }) => {
    const url = code === "en" ? "/property-application" : `/${code}/property-application`;
    const response = await page.goto(url);
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", bcp47);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("#apply form")).toBeVisible();
  });
}

test("sitemap.xml lists all five hreflang variants for home", async ({ page }) => {
  const response = await page.goto("/sitemap.xml");
  expect(response?.status()).toBe(200);
  const body = await response!.text();
  for (const { code } of LOCALES) {
    expect(body).toContain(`hreflang="${code}"`);
  }
});
