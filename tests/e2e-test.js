const assert = require('chai').assert

var home = require('../pageObjects/HomePage.js')
var pdp = require('../pageObjects/ProductDetailsPage.js')
var cart = require('../pageObjects/CartPage.js')
var loginReg = require('../pageObjects/LoginRegistrationPage')

describe("E2E Web Test for checkout process", () => {
    let prodNamePDP
    let productPrice
    let returnsPol
    let weight
    let reviewsCount
    let prodNameCart
    let totalPriceCart
    let invalidReason

    it("Validate that checkout is happening correctly", () => {
        browser.url('/')
        
        //Maximize browser window
        browser.setViewportSize({
            width: 500,
            height: 500
        });
        var windowSize = browser.windowHandleSize();
        browser.windowHandleMaximize([windowSize])

        home.clickSearchProduct()
        home.waitForSearchTextField()
        home.waitForStartSearchBtnToAppear()
        home.setSearchProductText('LUNDHAGS')
        browser.pause(4000)
        home.waitForProductToAppear()
        home.clickLundhagsProductItem()
        pdp.waitForColorToLoad()
        pdp.waitForSizeToLoad()
        pdp.clickProductSize()
        pdp.clickSelectedColor()
        pdp.waitForPriceToAppear()
        prodNamePDP = pdp.getProductName()
        console.log(prodNamePDP)
        productPrice = pdp.getProductPrice()
        console.log(productPrice)
        returnsPol = pdp.getReturnsPolicy()
        console.log(returnsPol)
        pdp.waitForWeightToAppear()
        weight = pdp.getProductWeight()
        console.log(weight)
        reviewsCount = pdp.getUserReviews()
        console.log(reviewsCount)
        assert.isTrue(reviewsCount > 1, 'User reviews are available')
        pdp.clickCookieCloseBtn()
        pdp.setProdQuantity('1')
        pdp.clickAddToCart()
        pdp.waitForBackToProduct()
        pdp.clickBackToProduct()
        browser.pause(2000)
        pdp.setProdQuantity('1')
        pdp.clickAddToCart()
        pdp.waitForGoToCart()
        totalPricePDP = pdp.getTotalPriceOfProd()
        console.log(totalPricePDP)
        pdp.clickGoToCart()
        cart.waitForProductToAppear()
        prodNameCart = cart.getProdName()
        cart.waitForPriceToAppear()
        totalPriceCart = cart.getTotalPrice()
        assert.equal(totalPricePDP, totalPriceCart, 'PDP and Cart Total Price are equal')
        assert.equal(prodNamePDP, prodNameCart, 'PDP and Cart Product Names are equal')
        cart.setRedeemVoucherValue('NotAvailable')
        cart.clickRedeemBtn()
        cart.waitForVoucherInvalidMsg()
        invalidReason = cart.getVoucherInvalidText()
        assert.equal(invalidReason, 'Reason: This voucher is not valid!', 'Invalid voucher code is visible')
        cart.waitForCloseVoucherInvalidBtn()
        cart.clickVoucherInvalidCloseBtn()
        cart.waitForGoToCheckoutToBeEnabled()
        cart.clickGoToCheckoutBtn()
        loginReg.waitForEmailToAppear()
        assert.isTrue(loginReg.isEmailVisible(),'Login Form - Email is appearing')
        loginReg.waitForPwdToAppear()
        assert.isTrue(loginReg.isPwdVisible(),'Login Form - Password is appearing')
        loginReg.waitForCreateAccountToAppear()
        assert.isTrue(loginReg.isCreateAccVisible(),'Create Account button is appearing')
    })
})