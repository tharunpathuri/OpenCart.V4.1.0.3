import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { MyAccountPage } from '../pages/MyAccountPage';

//define variables
let testConfig: TestConfig;
let homePage: HomePage;
let login: LoginPage;
let logout: LogoutPage;
let myAccountPage: MyAccountPage;

test.beforeEach(async ({ page }) => {
    testConfig = new TestConfig();
    await page.goto(testConfig.appUrl); //navigate to app url
    homePage = new HomePage(page);
    login = new LoginPage(page);
    logout = new LogoutPage(page);
    myAccountPage = new MyAccountPage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('User logout test @master @regression', async ({ page }) => {
    await homePage.clickOnMyAccount();
    await homePage.clickOnLogin();
    await login.setEmail(testConfig.email);
    await login.setPassword(testConfig.password);
    await login.clickLogin();

    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

    await myAccountPage.clickLogout();

    expect(await logout.isContinueButtonVisible()).toBe(true);
    await logout.clickContinue();

    expect(await homePage.isHomePageExist()).toBe(true);
})


