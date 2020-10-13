import { Selector, t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

class LandingPage {
  page: Selector;
  header: Selector;
  nameInput: Selector;
  joinChatBtn: Selector;
  inputFeedback: Selector;

  constructor() {
    this.page = ReactSelector('LandingPage');
    this.header = Selector('#landingHeader');
    this.nameInput = Selector('#nameInput');
    this.joinChatBtn = Selector('#joinChatBtn');
    this.inputFeedback = Selector('#inputFeedback');
  }

  async enterUsername(validName: string): Promise<void> {
    await t.typeText(this.nameInput, validName)
  }

  async joinChat(): Promise<void> {
    await t.click(this.joinChatBtn)
  }
}

export default new LandingPage();
