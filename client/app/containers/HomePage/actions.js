import {
  CHANGE_USERNAME,
  SEND_SMS,
  SEND_SMS_SUCESS,
  SEND_SMS_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 * @param  {name} name The new text of the input field
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
  return {
    type: CHANGE_USERNAME,
    name,
  };
}

export function sendSMS(number, from, message) {
  return {
    type: SEND_SMS,
    payload: {
      number,
      from,
      message,
    },
  };
}

export function sendSMSSuccess(messageId) {
  return {
    type: SEND_SMS,
    payload: {
      messageId,
    },
  };
}

export function sendSMSError(error) {
  return {
    type: SEND_SMS_ERROR,
    payload: {
      error,
    },
  };
}