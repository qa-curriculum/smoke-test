import page from '../page-model';
import { ClientFunction, Selector } from 'testcafe';

const url = 'http://localhost:3000/';
const getLocation = ClientFunction(() => document.location.href);
const SignUpButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)');
const LoginButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)')
const Password = 'welcome';
const h1 = Selector('#root > div:nth-child(1) > form:nth-child(2) > h1:nth-child(1)');
let randomEmail = Math.round(Math.random()*100000)+"@email.com";
let newRandomEmail = Math.round(Math.random()*100000)+"@email.com";
let newRandomEmailValue = newRandomEmail;

fixture `Testing page model with application`
  .page(url);

test('Using page model to sign up with random email', async t => {
  await t
    .click(SignUpButton)
  await t
    .typeText(page.emailInput, randomEmail)
    .typeText(page.passwordInput, Password)
    .click(page.submitButtonSignUpPage)
  await t
    .expect(getLocation()).eql(url)
    .expect(h1).ok();
});

// Need to fix duplicate email logic, am using newRandomEmail variable in the meantime.
test('Use page model command to signup with random user created', async t => {
  await t
    .click(SignUpButton);
  await page
    .SignUpWithRandomEmail(newRandomEmail, Password)
  await t
    .expect(getLocation()).eql(url)
    .expect(h1).ok();
});

test('Use page model command to login with created random user from previous test', async t => {
  await t
    .click(LoginButton)
  await page
    .LoginWithCreatedRandomEmail(newRandomEmailValue, Password)
  await t
    .expect(getLocation()).eql(url);
});