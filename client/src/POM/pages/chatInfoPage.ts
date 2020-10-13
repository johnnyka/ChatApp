import { Selector, t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

class ChatInfoPage {
  page: Selector;
  closeBtn: Selector;
  usersList: Selector;

  constructor() {
    this.page = ReactSelector('ChatInfoPage');
    this.closeBtn = Selector('#closeInfoModalBtn');
    this.usersList = Selector('#usersList');
  }

  async nUsers(): Promise<number> {
    return await this.usersList.childElementCount;
  }

  getUser(idx: number): Selector {
    return this.usersList.child(idx);
  }

  async close(): Promise<void> {
    await t.click(this.closeBtn);
  }
}

export default new ChatInfoPage();
