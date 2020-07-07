import page from '../page-model';
import { ClientFunction, Selector } from 'testcafe';

const url = 'http://localhost:3000/';
const getLocation = ClientFunction(() => document.location.href);
const SignUpButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)');
const LoginButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)')
const Password = 'welcome';
const h1 = Selector('#root > div:nth-child(1) > form:nth-child(2) > h1:nth-child(1)');
const SecretText = Selector('#root > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)');
const SecretTextContent = "Birds aren't real. Coronavirus was invented by Jeff Bezos. Donald Trump is really John Cena.";
let newRandomEmail = Math.round(Math.random()*100000)+"@email.com";
let newRandomEmailValue = newRandomEmail;

fixture `Testing page model with application`
  .page(url);

// Need to fix duplicate email logic, am using newRandomEmail variable in the meantime.
test('Use page model command to signup with random user created', async t => {
  console.time("Time to finish test case 1");
    await t
      .click(SignUpButton);
    await page
      .SignUpWithRandomEmail(newRandomEmail, Password)
    await t
      .expect(getLocation()).eql(url)
      .expect(h1).ok();
  console.timeEnd("Time to finish test case 1");
});

test('Use page model command to login with created random user from previous test', async t => {
  console.time("Time to finish test case 2");
    await t
      .click(LoginButton)
    await page
      .LoginWithCreatedRandomEmail(newRandomEmailValue, Password)
    await t
      .expect(getLocation()).eql(url);
  console.timeEnd("Time to finish test case 2");
});

test('Use page model command to see secret message after logging in with existing user', async t => {
  console.time("Time to finish test case 3");
    await t
      .click(LoginButton)
    await page
      .SecretSignIn(newRandomEmailValue, Password)
    await t
      .expect(SecretText.textContent).eql(SecretTextContent)
  console.timeEnd("Time to finish test case 3");
});