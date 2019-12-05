class CartPage {

    get productName() {
        return $('div.product-title span.product--title')
    }

    get totalPriceOfProduct() {
        return $("span.totalprice")
    }

    get voucherInvalid(){
        return $('//p[@class=\'error font-red\']')
    }
    
    get closeVoucherInvalidBtn(){
        return $('a.close.close-reveal-modal')
    }

    get redeemVoucherTextField(){
        return $('input.vouchercode')
    }

    get redeemBtn(){
        return $('button[title=\'Redeem\']')
    }

    get goToCheckoutBtn(){
        return $('div.checkout--bar button[title=\'Go to checkout\']')
    }

    waitForProductToAppear(){
        this.productName.waitForVisible(120000)
    }

    getProdName(){
        return this.productName.getText()
    }

    waitForPriceToAppear(){
        this.totalPriceOfProduct.waitForVisible(120000)
    }

    getTotalPrice(){
        return this.totalPriceOfProduct.getText()
    }

    waitForVoucherInvalidMsg(){
        this.voucherInvalid.waitForVisible(120000)
    }

    getVoucherInvalidText(){
        return this.voucherInvalid.getText()
    }

    waitForCloseVoucherInvalidBtn(){
        this.closeVoucherInvalidBtn.waitForVisible(120000)
    }

    clickVoucherInvalidCloseBtn(){
        this.closeVoucherInvalidBtn.click()
    }

    setRedeemVoucherValue(text){
        this.redeemVoucherTextField.setValue(text)
    }

    clickRedeemBtn(){
        this.redeemBtn.click()
    }

    waitForGoToCheckoutToBeEnabled(){
        this.goToCheckoutBtn.waitForEnabled(120000)
        browser.pause(3000)
    }

    clickGoToCheckoutBtn(){
        this.goToCheckoutBtn.click()
    }
}

module.exports = new CartPage()