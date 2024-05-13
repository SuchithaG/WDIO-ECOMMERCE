const { $ } = require('@wdio/globals')

class addtocart {

    get btnSubmit() {
        return $('input[type="submit"]');
    }

    get inputUsername() {
        return $('#user-name');
    }

    get inputPassword() {
        return $('#password');
    }

    get sortDropdown() {
        return $('.product_sort_container');
    }

    get sortedItems() {
        return $$('.inventory_item_label a');
    }

    get addToCart() {
        return $$('//button[text()="Add to cart"]');
    }

    get cartIcon() {
        return $('.shopping_cart_badge');
    }

    get itemNameInCart() {
        return $('.inventory_item_name');
    }

    get checkOut() {
        return $('#checkout');
    }

    get firstName() {
        return $('#first-name');
    }

    get lastName() {
        return $('#last-name');
    }

    get zipCode() {
        return $('#postal-code');
    }

    get continueBtn() {
        return $('#continue');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(username, password) {
        await (await this.inputUsername).waitForDisplayed();
        await (await this.inputUsername).setValue(username);
        await (await this.inputPassword).waitForDisplayed();
        await (await this.inputPassword).setValue(password);
        await (await this.btnSubmit).click();
    }

    async sortTheDropdown() {
        await (await this.sortDropdown).selectByVisibleText('Name (Z to A)');
    }

    async checkTheSortingOrder() {
        const texts = await (await this.sortedItems).map(element => element.getText());
        console.log(texts);
        for (let i = 1; i < texts.length; i++) {
            expect(texts[i].localeCompare(texts[i - 1])).toBeLessThanOrEqual(0);
        }
    }

    async clickOnAddtoCart() {
        const nameOfTheItem = await (await this.sortedItems)[1].getText();
        console.log("before adding to cart: " + nameOfTheItem);
        await (await this.addToCart)[1].waitForDisplayed();
        await (await this.addToCart)[1].click();
        await (await this.cartIcon).click();
        const itemInCart = await (await this.itemNameInCart).getText();
        console.log("after adding to the cart: " + itemInCart);
        expect(nameOfTheItem).toEqual(itemInCart);

    }

    async checkOutProcessPage() {

    }



}

module.exports = new addtocart();
