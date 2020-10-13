import { waitForReact } from 'testcafe-react-selectors';
import utils from '../../POM/utils';
import landingPage from '../../POM/pages/landingPage';
import landingPageData from '../../POM/data/landingPage';
import chatPage from '../../POM/pages/chatPage';

fixture`Landing page`
  .page`${utils.url}`
  .beforeEach(async () => {
    await waitForReact();
  });

test('Initial view on landing page', async t => {
  await t
    .expect(landingPage.page.exists).ok()
    .expect(landingPage.header.innerText).match(new RegExp(landingPageData.headerText, 'i'))
    .expect(landingPage.nameInput.value).match(/^$/)
    .expect(landingPage.inputFeedback.innerText).match(/^$/);
});

test('Submit empty string as username', async t => {
  landingPage.joinChat();
  await t.expect(landingPage.inputFeedback.innerText).notMatch(/^$/);
});

test('Submit username with special character', async t => {
  landingPage.enterUsername(landingPageData.specialCharUsername);
  landingPage.joinChat();
  await t.expect(landingPage.inputFeedback.innerText).notMatch(/^$/);
});

test('Submit valid username', async t => {
  landingPage.enterUsername(landingPageData.validUsername);
  await t.expect(landingPage.nameInput.value).eql(landingPageData.validUsername);

  landingPage.joinChat();
  await t
    .expect(landingPage.page.exists).notOk()
    .expect(chatPage.page.exists).ok()
    .expect(chatPage.navigationBar.exists).ok()
    .expect(chatPage.messageBoard.exists).ok()
    .expect(chatPage.messageSubmitForm.exists).ok()
    .expect(chatPage.lastMessage.innerText).match(/welcome/i)
    .expect(chatPage.lastMessage.innerText).match(new RegExp(landingPageData.validUsername))
});

test('Submit already existing username', async t => {
  landingPage.enterUsername(landingPageData.validUsername);
  landingPage.joinChat();

  await t.openWindow(utils.url)
  landingPage.enterUsername(landingPageData.validUsername);
  landingPage.joinChat();
  await t
    .expect(landingPage.inputFeedback.innerText).notMatch(/^$/);
});
