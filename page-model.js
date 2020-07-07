import { Selector, t } from 'testcafe';

const EmailInput = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(2)');
const PasswordInput = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(3)');
const SubmitButtonSignUpPage = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(4)');
const SubmitButtonLoginInPage = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(4)');
const SecretButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)');
const password = 'welcome';

class Page {
  constructor () {
    this.emailInput = EmailInput;
    this.passwordInput = PasswordInput;
    this.submitButtonSignUpPage = SubmitButtonSignUpPage;
  }

  async SignUpWithRandomEmail (randomEmail, password) {
    await t
      .typeText(this.emailInput, randomEmail)
      .typeText(this.passwordInput, password)
      .click(SubmitButtonSignUpPage);
  }

  async LoginWithCreatedRandomEmail (randomEmailValue, password) {
    await t
      .typeText(this.emailInput, randomEmailValue)
      .typeText(this.passwordInput, password)
      .click(SubmitButtonLoginInPage);
  }

  async SecretSignIn (email, password) {
    await t
      .typeText(this.emailInput, email)
      .typeText(this.passwordInput, password)
      .click(SubmitButtonLoginInPage)
      .click(SecretButton);
  }
}

export default new Page();