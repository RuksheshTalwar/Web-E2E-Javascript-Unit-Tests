class LoginRegistrationPage {

    get loginEmailTextField() {
        return $('//label[text()=\'Your email\']/following-sibling::input[@type=\'email\']')
    }

    get loginPasswordTextField() {
        return $('//label[text()=\'Your password\']/following-sibling::input[@type=\'password\']')
    }

    get createAnAccountBtn(){
        return $('//span[contains(text(),\'Create an account\')]')
    }

    waitForEmailToAppear(){
        this.loginEmailTextField.waitForVisible(120000)
    }

    isEmailVisible(){
        return this.loginEmailTextField.isVisible()
    }

    waitForPwdToAppear(){
        this.loginPasswordTextField.waitForVisible(120000)
    }

    isPwdVisible(){
        return this.loginPasswordTextField.isVisible()
    }

    waitForCreateAccountToAppear(){
        this.createAnAccountBtn.waitForVisible(120000)
    }

    isCreateAccVisible(){
        return this.createAnAccountBtn.isVisible()
    }
}

module.exports = new LoginRegistrationPage()