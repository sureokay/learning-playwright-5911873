import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login/loginPage";

test("login without page object", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("customer@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await page.locator('[data-test="nav-profile"]').click();
  // await expect(page.locator('[data-test="nav-menu"]')).toContainText(
  //   "Jane Doe"
  // );
  const navMenuLocator = page.locator('[data-test="nav-menu"]');

  await navMenuLocator.waitFor({ state: "visible", timeout: 10000 }); // Wait for visibility

  await expect(navMenuLocator).toContainText("Jane Doe"); // Assert after the wait
  // OR, you could add a timeout to the expect as well, though not strictly necessary here:
  // await expect(navMenuLocator).toContainText("Jane Doe", { timeout: 10000 });
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "Profile"
  );
});

test("Login with page object", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.emailInput.fill("customer@practicesoftwaretesting.com");
  await loginPage.passwordInput.fill("welcome01");
  await loginPage.loginButton.click();
  await loginPage.profileButton.click();
  await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
});
