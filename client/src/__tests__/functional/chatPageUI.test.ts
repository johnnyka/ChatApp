import { waitForReact } from 'testcafe-react-selectors';
import utils from '../../POM/utils';
import landingPage from '../../POM/pages/landingPage';
import landingPageData from '../../POM/data/landingPage';
import chatPage from '../../POM/pages/chatPage';
import chatPageData from '../../POM/data/chatPage';
import chatInfoPage from '../../POM/pages/chatInfoPage';

fixture`Chat page and info modal`
  .page`${utils.url}`
  .beforeEach(async () => {
    await waitForReact();
  });

test(
  'All features (send/receive messages, notifications about other user, info modal and leave chat)',
  async t => {
    // Join chat and send message.
    landingPage.enterUsername(landingPageData.validUsername);
    landingPage.joinChat();
    chatPage.typeMessage(chatPageData.message1);
    chatPage.sendMessage();
    await t
      .expect(chatPage.lastMessage.innerText).match(new RegExp(chatPageData.message1))
      .expect(chatPage.lastMessage.innerText).match(utils.timeRegex)
      .expect(chatPage.lastMessage.innerText).notMatch(new RegExp(landingPageData.validUsername))

    // Another user joins chat.
    await t.openWindow(utils.url);
    landingPage.enterUsername(landingPageData.validUsername2);
    landingPage.joinChat();
    await t
      .switchToParentWindow()
      .expect(chatPage.lastMessage.innerText)
      .match(new RegExp(`${landingPageData.validUsername2} joined the chat`));

    // Another user is typing a message.
    await t
      .switchToPreviousWindow();
    chatPage.typeMessage(chatPageData.message3);
    await t
      .switchToParentWindow()
      .expect(chatPage.typingUsersNotification.innerText)
      .match(new RegExp(landingPageData.validUsername2))
      .expect(chatPage.typingUsersNotification.innerText)
      .match(new RegExp(chatPageData.isTypingText));

    // Receive message from another user.
    await t
      .switchToPreviousWindow();
    chatPage.sendMessage();
    await t
      .switchToParentWindow()
      .expect(chatPage.lastMessage.innerText).match(new RegExp(chatPageData.message3))
      .expect(chatPage.lastMessage.innerText).match(new RegExp(landingPageData.validUsername2))

    // Info modal.
    chatPage.openInfoModal();
    await t
      .expect(chatInfoPage.page.exists).ok()

    // Correct users list.
    await t
      .expect(await chatInfoPage.nUsers()).eql(2)
      .expect(chatInfoPage.getUser(0).innerText).match(new RegExp(landingPageData.validUsername))
      .expect(chatInfoPage.getUser(1).innerText).match(new RegExp(landingPageData.validUsername2))
      .switchToPreviousWindow()
      .closeWindow()
    await t
      .expect(await chatInfoPage.nUsers()).eql(1)
      .expect(chatInfoPage.usersList.innerText).match(new RegExp(landingPageData.validUsername))
      .expect(chatInfoPage.usersList.innerText).notMatch(new RegExp(landingPageData.validUsername2))

    // Close info modal.
    chatInfoPage.close();
    await t
      .expect(chatInfoPage.page.exists).notOk()
      .expect(chatPage.page.exists).ok();

    // Leave chat.
    chatPage.leave();
    await t
      .expect(chatPage.page.exists).notOk()
      .expect(landingPage.page.exists).ok();
  });
