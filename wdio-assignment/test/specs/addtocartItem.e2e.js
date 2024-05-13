const { expect } = require('@wdio/globals')
const SecurePage = require('../pageobjects/secure.page')
const addtocart = require('../pageobjects/addtocart.page')

describe('Open application and search for product', () => {
    it('search for a product', async () => {

        await browser.url('https://www.saucedemo.com');
        await browser.maximizeWindow();
       await addtocart.login('standard_user','secret_sauce');
       (await addtocart.sortDropdown).waitForDisplayed();
       await addtocart.sortTheDropdown();
       await addtocart.checkTheSortingOrder();

    })
})
