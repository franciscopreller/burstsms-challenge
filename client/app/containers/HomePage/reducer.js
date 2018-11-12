import { fromJS } from 'immutable';

import {
  USERNAME_KEY,
  CHANGE_USERNAME,
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
    default:
      return state;
  }
}

export default homeReducer;
