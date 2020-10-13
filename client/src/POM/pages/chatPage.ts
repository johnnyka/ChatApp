import { Selector, t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

class ChatPage {
  page: Selector;
  navigationBar: Selector;
  messageBoard: Selector;
  messageSubmitForm: Selector;
  messageList: Selector;
  lastMessage: Selector;
  messageInput: Selector;
  sendMessageBtn: Selector;
  typingUsersNotification: Selector;
  leaveChatBtn: Selector;
  infoBtn: Selector;
  
  constructor() {
    this.page = ReactSelector('ChatPage');
    this.navigationBar = ReactSelector('NavigationBar');
    this.messageBoard = ReactSelector('MessageBoard');
    this.messageSubmitForm = ReactSelector('MessageSubmitForm');
    this.messageList = Selector('#msgList');
    this.lastMessage = this.messageList.child(-2);
    this.messageInput = Selector('#messageInput');
    this.sendMessageBtn = Selector('#sendMessageBtn');
    this.typingUsersNotification = Selector('#typingUsersNotification')
    this.leaveChatBtn = Selector('#leaveChatBtn');
    this.infoBtn = Selector('#infoBtn');
  }

  async typeMessage(message: string): Promise<void> {
    await t.typeText(this.messageInput, message);
  }

  async sendMessage(): Promise<void> {
    await t.click(this.sendMessageBtn);
  }

  async openInfoModal(): Promise<void> {
    await t.click(this.infoBtn);
  }

  async leave(): Promise<void> {
    await t.click(this.leaveChatBtn);
  }
}

export default new ChatPage();
