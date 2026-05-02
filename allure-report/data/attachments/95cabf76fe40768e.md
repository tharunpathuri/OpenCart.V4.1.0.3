# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> User login test @sanity @regression @master
- Location: tests\login.spec.ts:27:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Test source

```ts
  1  | import{test,expect}from'@playwright/test';
  2  | import { HomePage } from '../pages/HomePage';
  3  | import { LoginPage } from '../pages/LoginPage';
  4  | import { RandomDataUtil } from '../utilities/randomDataGenerator';
  5  | import { TestConfig } from '../test.config.ts';
  6  | import { MyAccountPage } from '../pages/MyAccountPage';
  7  | 
  8  | //define variables globally for object creation to use in all methods
  9  | let homePage: HomePage;
  10 | let loginPage: LoginPage;
  11 | let testConfig:TestConfig;
  12 | let myAccountPage:MyAccountPage;
  13 | 
  14 | 
  15 | test.beforeEach(async ({ page }) => {
  16 |     testConfig = new TestConfig();
  17 |     await page.goto(testConfig.appUrl); //navigate to app url
  18 |     homePage = new HomePage(page);
  19 |     loginPage = new LoginPage(page);
  20 |     myAccountPage=new MyAccountPage(page);
  21 | })
  22 | 
  23 | test.afterEach(async ({ page }) => {
  24 |     await page.close();
  25 | })
  26 | 
  27 | test('User login test @sanity @regression @master',async({page})=>{
  28 |     homePage.clickOnMyAccount();
  29 |     homePage.clickOnLogin();
  30 |     loginPage.setEmail(testConfig.email);
  31 |     loginPage.setPassword(testConfig.password);
  32 |     loginPage.clickLogin();
  33 | 
  34 |     const isLoginSuccess=await myAccountPage.isMyAccountPageExists();
> 35 |     expect(isLoginSuccess).toBe(true);
     |                            ^ Error: expect(received).toBe(expected) // Object.is equality
  36 | 
  37 | })
  38 | 
```