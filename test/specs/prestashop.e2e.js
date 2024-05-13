const { expect } = require('@wdio/globals')
const SecurePage = require('../pageobjects/secure.page')
const addtocart = require('../pageobjects/addtocart.page')
const prestashop = require('../pageobjects/prestashop.page')

describe('Open application and search for product', () => {
    it('search for a product', async () => {

        const firstname = "presta";
        const secondname = "shop";
        const email = "prestashop@email.com";
         
        await browser.url('/');
        await prestashop.waitForPageLoad();
        await prestashop.searchForItem("mug", "Enter");
        await prestashop.verifyTheSearchResults("mug");
        await prestashop.addItemToCartAndValidateItems();
        await prestashop.enterTheDetails(firstname,secondname,email);
        await prestashop.validateTheInputValues(firstname,secondname);
    })
})
