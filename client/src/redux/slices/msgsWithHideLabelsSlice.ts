import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMessage, IMsgWithHideLabels } from '../../utils/types';

const initialState: IMsgWithHideLabels[] = [];

const msgsWithHideLabelsSlice = createSlice({
  name: 'msgsWithHideLabels',
  initialState,
  reducers: {
    addHideMsgLabels(state: IMsgWithHideLabels[], action: PayloadAction<TMessage[]>) {
      const msgs = action.payload;
      const nMsgs = msgs.length;

      // The first message...
      if (nMsgs === 1) {
        return [{
          ...msgs[nMsgs-1], authorLabel: '', timeLabel: ''
        }];
      }

      // The rest of the messages.
      // If the author or time label (for the same author) is repeating -> Hide (with CSS).
      return [ ...state, {
        ...msgs[nMsgs-1],
        authorLabel: msgs[nMsgs - 1].author === msgs[nMsgs - 2].author ? 'hide' : '',
        timeLabel: msgs[nMsgs - 1].author === msgs[nMsgs - 2].author &&
          msgs[nMsgs - 1].time === msgs[nMsgs - 2].time ? 'hide' : ''
      }];
    }
  }
})

export const { addHideMsgLabels } = msgsWithHideLabelsSlice.actions;
export default msgsWithHideLabelsSlice.reducer;
