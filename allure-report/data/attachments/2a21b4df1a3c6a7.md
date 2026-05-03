# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginddt.spec.ts >> Login Test for Valid login1 @datadriven
- Location: tests\loginddt.spec.ts:18:9

# Error details

```
Error: page.goto: net::ERR_ABORTED at https://tutorialsninja.com/demo/
Call log:
  - navigating to "https://tutorialsninja.com/demo/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { HomePage } from '../pages/HomePage';
  3  | import { LoginPage } from '../pages/LoginPage';
  4  | import { MyAccountPage } from '../pages/MyAccountPage';
  5  | import { DataProvider } from '../utilities/dataProvider';
  6  | import { TestConfig } from '../test.config.ts';
  7  | 
  8  | //define variables globally for object creation to use in all methods
  9  | let homePage: HomePage;
  10 | let loginPage: LoginPage;
  11 | let myAccountPage: MyAccountPage;
  12 | let testConfig:TestConfig;
  13 | 
  14 | //load json file
  15 | const jsonData = DataProvider.getTestDataFromJson('test-data/logindata.json');
  16 | 
  17 | for (const data of jsonData) {
  18 |     test(`Login Test for ${data.testName} @datadriven`, async ({ page }) => {
  19 | 
  20 |         testConfig = new TestConfig();
> 21 |         await page.goto(testConfig.appUrl); //navigate to app url
     |                    ^ Error: page.goto: net::ERR_ABORTED at https://tutorialsninja.com/demo/
  22 | 
  23 |         homePage = new HomePage(page);
  24 |         homePage.clickOnMyAccount();
  25 |         homePage.clickOnLogin();
  26 | 
  27 |         loginPage = new LoginPage(page);
  28 |         await loginPage.setEmail(data.email);
  29 |         await loginPage.setPassword(data.password);
  30 |         await loginPage.clickLogin();
  31 | 
  32 |         
  33 |         myAccountPage = new MyAccountPage(page);
  34 |         if(data.expected==='success')
  35 |         {
  36 |             expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
  37 |         }
  38 |         else
  39 |         {
  40 |            expect(await loginPage.getloginErrorMessage()).toContain('Warning: No match for E-Mail Address and/or Password.');
  41 |         }
  42 | 
  43 |     })
  44 | }
```