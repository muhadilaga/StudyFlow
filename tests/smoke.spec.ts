import { test, expect } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1";

test.describe("StudyFlow public smoke", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto(baseURL, { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", {
        name: /bikin kuliahmu lebih tertata, fokus, dan tidak keteteran deadline/i,
      }),
    ).toBeVisible();
  });

  test("login page loads", async ({ page }) => {
    await page.goto(`${baseURL}/login`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /masuk ke akunmu/i })).toBeVisible();
  });

  test("register page loads", async ({ page }) => {
    await page.goto(`${baseURL}/register`, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /buat akun studyflow/i })).toBeVisible();
  });
});
