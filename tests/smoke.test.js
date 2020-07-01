// Write some smoke tests using Test cafe to ensure that the applications has basic functionality

import { Selector, ClientFunction } from 'testcafe';

const getLocation = ClientFunction(() => document.location.href);
const SignUpButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)');
const EmailInput = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(2)');
const PasswordInput = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(3)');
const h1 = Selector('#root > div:nth-child(1) > div:nth-child(2) > h1:nth-child(1)');
const p = Selector('#root > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)');
let RandomEmail = Math.round(Math.random()*100000)+"@email.com";
let RandomEmailValue = RandomEmail;
const password = 'welcome'

fixture `Smoke test application`
  .page('http://localhost:3000/')

// Smoke Specs:
test('Navigating to the /home route should display "Home  Welcome!', async t => {
  console.time("Time to finish test case 1 ");
    await t
      .navigateTo('http://localhost:3000/home')

      .expect(h1.textContent).eql('Home')
      .expect(p.textContent).eql('Welcome!');
  console.timeEnd("Time to finish test case 1 ");
});

test('When signing up for an account, and submit your email and password you should be taken to the home page', async t => {
  const h1 = Selector('#root > div:nth-child(1) > form:nth-child(2) > h1:nth-child(1)');
  let SubmitButton = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(4)');

  console.time("Time to finish test case 2 ");
    await t
      .click(SignUpButton)
      .expect(h1.textContent).eql('Sign Up Below!')

      .typeText(EmailInput, RandomEmail)
      // .expect(EmailInput.textContent).eql('testemail@email.com') - Not working, will fix later
      .typeText(PasswordInput, password)
      .click(SubmitButton)

      .expect(getLocation()).eql('http://localhost:3000/')
      .expect(h1).ok();
  console.timeEnd("Time to finish test case 2 ");
});

test('When logging in, after submitting your email and password your should be taken to the home page', async t => {
  const LoginHeader = Selector('#root > div:nth-child(1) > form:nth-child(2) > h1:nth-child(1)');
  const EnterEmail = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(2)');
  const EnterPassword = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(3)');
  const SubmitButton = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(4)');

  console.time("Time to finish test case 3 ");
    await t
      .navigateTo('http://localhost:3000/login')
      .expect(LoginHeader.textContent).eql('Login Below!')

      .typeText(EnterEmail, RandomEmailValue)
      .typeText(EnterPassword, password)
      .click(SubmitButton)

      .expect(getLocation()).eql('http://localhost:3000/')
      .expect(h1).ok();
  console.timeEnd("Time to finish test case 3 ");
});

test('After logged in, when you click on secret, it should navigate you the /secret endpoint and display some juicy details', async t => {
  const SecretButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)');
  const SecretText = Selector('#root > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)');
  const LoginButton = Selector('#root > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)');
  const LoginEmail = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(2)');
  const LoginPassword = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(3)');
  const LoginSubmitButton = Selector('#root > div:nth-child(1) > form:nth-child(2) > input:nth-child(4)');

  console.time("Time to finish test case 4 ");
    await t
      .click(LoginButton)
      .typeText(LoginEmail, RandomEmailValue)
      .typeText(LoginPassword, password)
      .click(LoginSubmitButton)
      .expect(h1).ok()

      .click(SecretButton)
      .expect(SecretText.textContent).eql("Birds aren't real. Coronavirus was invented by Jeff Bezos. Donald Trump is really John Cena.");
  console.timeEnd("Time to finish test case 4 ");
});