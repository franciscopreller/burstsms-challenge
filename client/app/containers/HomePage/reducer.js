import { fromJS } from 'immutable';

import {
  USERNAME_KEY,
  CHANGE_USERNAME,
  SEND_SMS,
  SEND_SMS_SUCCESS,
  SEND_SMS_ERROR,
  CLEAR_LAST_MESSAGE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: window.localStorage.getItem(USERNAME_KEY) || '',
  formSubmitting: false,
  lastMessageId: false,
  formError: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state.set('username', action.name);
    case SEND_SMS:
      return state
        .set('lastMessageId', false)
        .set('formSubmitting', true)
        .set('formError', false);
    case SEND_SMS_SUCCESS:
      console.log('send sms success', action.payload);
      return state
        .set('lastMessageId', action.payload.messageId)
        .set('formSubmitting', false)
        .set('formError', false);
    case SEND_SMS_ERROR:
      return state
        .set('formError', action.payload.error)
        .set('lastMessageId', false)
        .set('formSubmitting', false);
    case CLEAR_LAST_MESSAGE:
      return state
        .set('formError', false)
        .set('lastMessageId', false)
        .set('formSubmitting', false);
    default:
      return state;
  }
}

export default homeReducer;
