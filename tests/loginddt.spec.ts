import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utilities/dataProvider';
import { TestConfig } from '../test.config.ts';

//define variables globally for object creation to use in all methods
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;
let testConfig:TestConfig;

//load json file
const jsonData = DataProvider.getTestDataFromJson('test-data/logindata.json');

for (const data of jsonData) {
    test(`Login Test for ${data.testName}`, async ({ page }) => {

        testConfig = new TestConfig();
        await page.goto(testConfig.appUrl); //navigate to app url

        homePage = new HomePage(page);
        homePage.clickOnMyAccount();
        homePage.clickOnLogin();

        loginPage = new LoginPage(page);
        await loginPage.setEmail(data.email);
        await loginPage.setPassword(data.password);
        await loginPage.clickLogin();

        
        myAccountPage = new MyAccountPage(page);
        if(data.expected==='success')
        {
            expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
        }
        else
        {
           expect(await loginPage.getloginErrorMessage()).toContain('Warning: No match for E-Mail Address and/or Password.');
        }

    })
}

//load csv file
const csvData = DataProvider.getTestDataFromCsv('test-data/logindata.csv');

for (const data of csvData) {
    test(`Login Test for ${data.testName} @datadriven`, async ({ page }) => {

        testConfig = new TestConfig();
        await page.goto(testConfig.appUrl); //navigate to app url

        homePage = new HomePage(page);
        homePage.clickOnMyAccount();
        homePage.clickOnLogin();

        loginPage = new LoginPage(page);
        await loginPage.setEmail(data.email);
        await loginPage.setPassword(data.password);
        await loginPage.clickLogin();

        
        myAccountPage = new MyAccountPage(page);
        if(data.expected==='success')
        {
            expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
        }
        else
        {
           expect(await loginPage.getloginErrorMessage()).toContain('Warning: No match for E-Mail Address and/or Password.');
        }

    })
}