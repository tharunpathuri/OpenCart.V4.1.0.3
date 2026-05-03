import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utilities/randomDataGenerator';
import { TestConfig } from '../test.config.ts';

//define variables globally for object creation to use in all methods
let homePage: HomePage;
let register: RegistrationPage;

test.beforeEach(async ({ page }) => {
    const testConfig = new TestConfig();
    await page.goto(testConfig.appUrl); //navigate to app url
    homePage = new HomePage(page);
    register = new RegistrationPage(page);
})

test.afterEach(async ({ page }) => {
    await page.close();
})

test('User registration test @sanity @regression @main', async ({ page }) => {

    await homePage.clickOnMyAccount();
    await homePage.clickOnRegister();

    //register with valid random account details

    await register.setFirstName(RandomDataUtil.getFirstName());
    await register.setLastName(RandomDataUtil.getlastName());
    await register.setEmail(RandomDataUtil.getEmail());

    const password = RandomDataUtil.getPassword();

    await register.setPassword(password);
    await register.setConfirmPassword(password);
    await register.setTelephone(RandomDataUtil.getPhoneNumber());
    await register.setPrivacyPolicy();
    await register.clickContinue();
    await register.getConfirmationMsg();

    //assertions
    expect(await register.getConfirmationMsg()).toContain('Your Account Has Been Created!');
    await page.waitForTimeout(3000);
});