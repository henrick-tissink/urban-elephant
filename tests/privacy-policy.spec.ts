import { test, expect } from "@playwright/test";

// The footer links here from every page, and Meta needs the URL to publish
// the WhatsApp app. The text is English in every locale; the title is not.
for (const { path, title } of [
  { path: "/privacy-policy", title: "Privacy Policy" },
  { path: "/de/privacy-policy", title: "Datenschutzrichtlinie" },
]) {
  test(`${path} renders 200 with the policy`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(title);
    await expect(page.getByRole("heading", { name: "Your rights" })).toBeVisible();
  });
}
