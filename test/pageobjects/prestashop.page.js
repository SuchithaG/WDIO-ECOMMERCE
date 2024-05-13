const { $ } = require('@wdio/globals')

class prestashop {

    get searchBox() {
        return $('input.ui-autocomplete-input');
    }

    get myShopLogo() {
        return $('.logo.img-fluid');
    }

    get availableProducts() {
        return $$('.h3.product-title');
    }

    get productTitles() {
        return $$('.h3.product-title');
    }

    get quickView() {
        return $$('.quick-view');
    }

    get productName() {
        return $('.col-md-6.col-sm-6 h1');
    }

    get addToCart() {
        return $('.add-to-cart');
    }

    get cartProductName() {
        return $('.col-md-6.col-sm-6 h1');
    }

    get proceedToCheckOut() {
        return $('//a[text()="Proceed to checkout"]');
    }

    get productInCart() {
        return $('.product-line-info a');
    }

    get gender() {
        return $('#field-id_gender-2');
    }

    get firstName() {
        return $('#field-firstname');
    }

    get lastName() {
        return $('#field-lastname');
    }

    get email() {
        return $('#field-email');
    }

    get birthDate() {
        return $('#field-birthday');
    }

    get checkBoxes() {
        return $$('.custom-checkbox');
    }

    get continue() {
        return $('//button[@data-link-action="register-new-customer"]');
    }

    get iframe() {
        return $('#framelive');
    }
    get totalProducts() {
        return $('.total-products');
    }

    get homeLink() {
        return $('//span[text()="Home"]');
    }

    get firstNameValue() {
        return $('#field-firstname');
    }

    get lastNameValue() {
        return $('#field-lastname')
    }

     /**
     * Method to wait for the page load by checking the readyness of the page
     * @param {*} timeout 
     * @param {*} timeoutMsg 
     */
     async waitForPageLoad(timeout = 80000, timeoutMsg = 'Page did not load within 80 seconds') {
        await browser.waitUntil(() => {
            return browser.execute(() => {
                return document.readyState === 'complete';
            });
        }, { timeout, timeoutMsg });
    }

    /**
     * This method will search for the Item
     * @param {*} value 
     * @param {*} keys 
     */
    async searchForItem(value, keys) {
        await browser.switchToFrame(await this.iframe);
        await (await this.myShopLogo).waitForDisplayed();
        await (await this.searchBox).waitForDisplayed();
        await (await this.searchBox).click();
        await (await this.searchBox).setValue(value);
        await browser.keys(keys);
    }

    /**
     * In this method verifying the search results if all the search resulted items contain the searched item text
     * @param {*} searchedText 
     */
    async verifyTheSearchResults(searchedItem) {
        await (await this.availableProducts)[0].scrollIntoView();
        const searchResults = await (await this.availableProducts).map(element => element.getText());
        console.log("search results are : " + searchResults);
        searchResults.forEach(item => expect(item.toLowerCase()).toContain(searchedItem));
    }

    /**
     * Adding Item to cart and verifying the name of the cart item vs name of the item before adding it to the cart
     */
    async addItemToCartAndClickCheckOut() {
        (await this.homeLink).click();
        await browser.scroll(0, 1000);
        await (await this.productTitles)[0].moveTo();
        await (await this.quickView)[0].click();
        const productNameBeforeCart = await (await this.cartProductName).getText();
        await (await this.addToCart).scrollIntoView();
        await (await this.addToCart).click();
        await (await this.proceedToCheckOut).waitForDisplayed();
        await (await this.proceedToCheckOut).click();
        await (await this.productInCart).waitForDisplayed();
        const productNameInCart = await (await this.productInCart).getText();
        await expect(productNameBeforeCart.toLowerCase()).toEqual(productNameInCart.toLowerCase());
        await (await this.proceedToCheckOut).click();
    }

    /**
     * In this method entering the required details on checkout page
     * @param {*} firsname 
     * @param {*} lastname 
     * @param {*} emailId 
     */
    async enterThePersonalDetails(firsname, lastname, emailId) { 
        await (await this.gender).click();
        await (await this.firstName).setValue(firsname);
        await (await this.lastName).setValue(lastname);
        await (await this.email).scrollIntoView();
        await (await this.email).setValue(emailId);
        await (await this.birthDate).scrollIntoView();
        await (await this.checkBoxes).forEach(async checkbox => {
            await checkbox.click();
        });
        await (await this.continue).click();
    }

    /**
     * Validating the input values in the checkout page are same as the confirmation page details
     * @param {*} firstname 
     * @param {*} lastname 
     */
    async validatePersonalDetails(firstname, lastname) {
        const firstnamefield = await (await this.firstNameValue).getAttribute('value');
        const lastnamefield = await (await this.lastNameValue).getAttribute('value');
        await expect(firstnamefield).toEqual(firstname);
        await expect(lastnamefield).toEqual(lastname);

    }

}

module.exports = new prestashop();
