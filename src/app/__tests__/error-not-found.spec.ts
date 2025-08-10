import { test, expect } from "playwright/test";

test("SSR missing route renders NotFoundWrapper", async ({ page }) => {
  await page.goto("/non-existent");
  await expect(page.getByText("Page not found")).toBeVisible();
  await expect(page.getByRole("link", { name: "Return to home" })).toBeVisible();
});

test("client navigation to missing route uses NotFoundWrapper", async ({ page }) => {
  await page.goto("/test");
  await page.click("text=Broken Link");
  await expect(page.getByText("Page not found")).toBeVisible();
});

test("client-side error shows global error boundary", async ({ page }) => {
  await page.goto("/test");
  await page.click("#trigger-error");
  await expect(page.getByText("Something went wrong")).toBeVisible();
  const retry = page.getByRole("button", { name: "Try again" });
  await expect(retry).toBeVisible();
  await expect(page.getByRole("link", { name: "Go home" })).toBeVisible();

  await retry.click();
  await expect(page.locator("#trigger-error")).toBeVisible();

  await page.click("#trigger-error");
  await page.click("text=Go home");
  await expect(page).toHaveURL("/");
});