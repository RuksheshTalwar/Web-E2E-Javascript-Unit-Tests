class ProductDetailsPage {

    get colorToBeChosen() {
        return $('//a[@title=\'Tea Green\']')
    }
    get sizeToBeSelected() {
        return $("//a[@title='D100 - Short / Wide']")
    }
    get productPriceCurrency() {
        return $('span.price.js-price.font-red span.prefix.js-prefix span')
    }
    get productPrice() {
        return $('span.price.js-price.font-red span.js-fprice span')
    }

    get productItem() {
        return $('//img[@alt=\'Lundhags - Authentic Pant - Walking trousers\']')
    }

    get productReturnLabel() {
        return $('//ul[@class=\'details-advantages-snippet\']/li[3]')
    }

    get weightInfo() {
        return $('//div[@id=\'datapool-description\']//dt[text()=\'Weight:\']/following-sibling::dd[1]')
    }

    get userReviewsCount(){
        return $('//span[@itemprop=\'reviewCount\']')
    }

    get quantityTextField(){
        return $('input.input-amount.js-input-amount')
    }

    get addToCartBtn(){
        return $('button.js-tobasket-trigger')
    }

    get backToProductBtn(){
        return $('//span[contains(text(),\'back to product\')]')
    }

    get goToCartBtn(){
        return $('//span[contains(text(),\'go to cart\')]')
    }

    get acceptCookieCloseBtn(){
        return $('a.cookiebanner-close.js-cookie-close')
    }

    get totalPriceOfProduct(){
        return $('div.total-price')
    }

    get productName(){
        return $('h1.product-title.left span.product-title')
    }

    // open() {
    //     super.open('/')
    // }

    waitForSizeToLoad() {
        this.sizeToBeSelected.waitForVisible(120000)
    }

    clickProductSize() {
        this.sizeToBeSelected.click()
    }

    waitForColorToLoad() {
        this.colorToBeChosen.waitForVisible(120000)
    }

    clickSelectedColor() {
        this.colorToBeChosen.click()
    }

    waitForPriceToAppear() {
        this.productPrice.waitForText(7000)
        this.productPrice.waitForVisible(120000)
    }

    getProductPrice() {
        return this.productPrice.getText()
    }

    getProductCurrency() {
        this.productPriceCurrency.getText()
    }

    getReturnsPolicy() {
        this.productReturnLabel.moveToObject()
        browser.pause(4000)
        return this.productReturnLabel.getText()
        // console.log(ret)
    }

    waitForWeightToAppear() {
        this.weightInfo.waitForVisible(120000)
    }

    getProductWeight() {
        return this.weightInfo.getText()
    }

    getUserReviews(){
        return this.userReviewsCount.getText()
    }

    waitForQuantityToAppear(){
        this.quantityTextField.waitForVisible(120000)
    }

    setProdQuantity(text){
        this.quantityTextField.setValue(text)
    }

    clickAddToCart(){
        this.addToCartBtn.click()
    }

    waitForBackToProduct(){
        this.backToProductBtn.waitForVisible(120000)
    }

    clickBackToProduct(){
        this.backToProductBtn.moveToObject()
        this.backToProductBtn.click()
    }

    waitForGoToCart(){
        this.goToCartBtn.waitForVisible(120000)
    }

    clickGoToCart(){
        this.goToCartBtn.moveToObject()
        this.goToCartBtn.click()
    }

    clickCookieCloseBtn(){
        this.acceptCookieCloseBtn.click()
    }

    getTotalPriceOfProd(){
        return this.totalPriceOfProduct.getText()
    }

    getProductName(){
        return this.productName.getText()
    }













}

module.exports = new ProductDetailsPage()