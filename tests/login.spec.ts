import{test,expect}from'@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config.ts';
import { MyAccountPage } from '../pages/MyAccountPage';

//define variables globally for object creation to use in all methods
let homePage: HomePage;
let loginPage: LoginPage;
let testConfig:TestConfig;
let myAccountPage:MyAccountPage;


test.beforeEach(async ({ page }) => {
    testConfig = new TestConfig();
    await page.goto(testConfig.appUrl); //navigate to app url
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage=new MyAccountPage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('User login test @sanity @regression @master',async({page})=>{
    homePage.clickOnMyAccount();
    homePage.clickOnLogin();

    await loginPage.setEmail(testConfig.email);
    await loginPage.setPassword(testConfig.password);
    await loginPage.clickLogin();

    const isLoginSuccess=await myAccountPage.isMyAccountPageExists();
    expect(isLoginSuccess).toBe(true);

})
