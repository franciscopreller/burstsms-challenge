import { fromJS } from 'immutable';

import {
  USERNAME_KEY,
  CHANGE_USERNAME,
  SEND_SMS,
  SEND_SMS_SUCESS,
  SEND_SMS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  username: window.localStorage.getItem(USERNAME_KEY) || '',
  formSubmitting: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state.set('username', action.name);
    case SEND_SMS:
      return state.set('formSubmitting', true);
    case SEND_SMS_SUCESS:
    case SEND_SMS_ERROR:
      return state.set('foromSubmitting', false);
    default:
      return state;
  }
}

export default homeReducer;
