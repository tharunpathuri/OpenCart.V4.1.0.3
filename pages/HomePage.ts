import { Page, Locator } from '@playwright/test';

export class HomePage {

    //define variables - private and readonly\
    private readonly page: Page;
    private readonly myaccountLink: Locator;
    private readonly registerLink: Locator;
    private readonly loginLink: Locator;
    private readonly searchBox: Locator;
    private readonly searchBtn: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.myaccountLink = page.locator('span:has-text("My Account")');
        this.registerLink = page.locator('a:has-text("Register")');
        this.loginLink = page.locator('a:has-text("Login")');
        this.searchBox = page.locator('input[placeholder="Search"]');
        this.searchBtn = page.locator('#search button[type="button"]');
    }

    //action methods
    async isHomePageExist(): Promise<boolean> {
        const pageTitle: string = await this.page.title();
        if (pageTitle) {
            return true;
        }
        else {
            return false;
        }
    }

    async clickOnMyAccount() {
        try {
            await this.myaccountLink.click();
        } catch (error) {
            console.log("Exception occurred while clicking on my account:", error);
            throw error;
        }
    }

    async clickOnRegister() {
        try {
            await this.registerLink.click();
        } catch (error) {
            console.log("Exception occurred while clicking on register:", error);
            throw error;
        }
    }

    async clickOnLogin() {
        try {
            await this.loginLink.click();
        } catch (error) {
            console.log("Exception occurred while clicking on login:", error);
            throw error;
        }
    }

    async enterInfoIntoSearch(productName: string) {
        try {
            await this.searchBox.fill(productName);
        } catch (error) {
            console.log("Exception occurred while entering info in search:", error);
            throw error;
        }
    }

    async clickOnSearch() {
        try {
            await this.searchBtn.click();
        } catch (error) {
            console.log("Exception occurred while clicking on search button:", error);
            throw error;
        }
    }

     // Enter product name in the search box
    async enterProductName(pName: string){
        try {
            await this.searchBox.fill(pName);
        } catch (error) {
            console.log(`Exception occurred while entering product name: ${error}`);
            throw error;
        }
    }

    // Click the search button
    async clickSearch(){
        try {
            await this.searchBtn.click();
        } catch (error) {
            console.log(`Exception occurred while clicking 'Search': ${error}`);
            throw error;
        }
    }


}