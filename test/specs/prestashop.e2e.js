const { expect } = require('@wdio/globals')
const prestashop = require('../pageobjects/prestashop.page')
const firstname = "presta";
const secondname = "shop";
const email = "prestashop@email.com";
const itemname = "mug";

describe('Open application and search for product', () => {
    it('search for a product and validate the search results', async () => {
        await browser.url('/');
        await prestashop.waitForPageLoad();
        await prestashop.searchForItem(itemname, "Enter");
        await prestashop.verifyTheSearchResults(itemname);
    })

    it('add the product to the cart and click on proceed and then enter personal details and validate them', async()=>{
        await prestashop.addItemToCartAndClickCheckOut();
        await prestashop.enterThePersonalDetails(firstname,secondname,email);
        await prestashop.validatePersonalDetails(firstname,secondname);
    })
})
