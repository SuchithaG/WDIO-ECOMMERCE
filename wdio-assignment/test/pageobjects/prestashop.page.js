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

    async searchForItem(value, keys) {
        await browser.switchToFrame(await this.iframe);
        await (await this.myShopLogo).waitForDisplayed();
        await (await this.searchBox).waitForExist();
        await (await this.searchBox).waitForDisplayed();
        await (await this.searchBox).click();
        await (await this.searchBox).setValue(value);
        await browser.keys(keys);
    }

    async verifyTheSearchResults(searchedText) {
        await (await this.availableProducts)[0].scrollIntoView();
        const searchResultsText = await (await this.availableProducts).map(element => element.getText());
        console.log("search results are : " + searchResultsText);
        // for (let i = 1; i < searchResultsText.length; i++) {
        //     await expect(searchResultsText[i].toLowerCase()).toContain(searchedText);
        // }
         searchResultsText.forEach(element=>expect(element.toLowerCase()).toContain(searchedText));

    }

    async addItemToCartAndValidateItems() {
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

    async enterTheDetails(firsname, lastname, emailId) {
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

    async waitForPageLoad(timeout = 60000, timeoutMsg = 'Page did not load within 40 seconds') {
        await browser.waitUntil(() => {
            return browser.execute(() => {
                return document.readyState === 'complete';
            });
        }, { timeout, timeoutMsg });
    }

    async validateTheInputValues(firstname, lastname) {
        const firstnamefield = await (await this.firstNameValue).getAttribute('value');
        const lastnamefield = await (await this.lastNameValue).getAttribute('value');
        await expect(firstnamefield).toEqual(firstname);
        await expect(lastnamefield).toEqual(lastname);

    }

}

module.exports = new prestashop();
