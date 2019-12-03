// import BasePage from './BasePage.js'
// var BasePage = require('../pageObjects/BasePage.js')
// import BasePage from ('../pageObjects/BasePage.js')
// var Page = require('./base.page.js')

class HomePage{

    get searchGearAndClothingBtn() { 
        return $('//div[contains(text(),\'Search gear & clothing\')]') 
    }
    get searchGearAndClothingTxtField() { 
        return $("input[name='searchparam']")
    }
    get startSearchGearAndClothingBtn() { 
        return $('input[title=\'Start your search!\']') 
    }

    get productItem(){
        return $('//img[@alt=\'Lundhags - Authentic Pant - Walking trousers\']')
    }

    // open() {
    //     super.open('/')
    // }

    clickSearchProduct() {
        this.searchGearAndClothingBtn.click()
    }

    waitForSearchTextField(){
        this.searchGearAndClothingTxtField.waitForVisible(120000)
    }

    setSearchProductText(text) {
        this.searchGearAndClothingTxtField.setValue(text)
    }

    waitForStartSearchBtnToAppear(){
        this.startSearchGearAndClothingBtn.waitForVisible(120000)
    }

    clickStartSearch(){
        this.startSearchGearAndClothingBtn.click()
    }

    waitForProductToAppear(){
        this.productItem.waitForVisible(120000)
    }

    clickLundhagsProductItem(){
        this.productItem.click()
    }



}

module.exports = new HomePage()