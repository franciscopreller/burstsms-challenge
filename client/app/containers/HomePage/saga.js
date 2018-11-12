import { put, select, all, takeLatest } from 'redux-saga/effects';
import * as linkify from 'linkifyjs';

import request from 'utils/request';
import {
  sendSMSSuccess,
  sendSMSError,
} from './actions';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { SEND_SMS } from './constants';

// Helpers
async function getBitlyLinks(links) {
  const requestURL = '/api/shorten';
  const options = {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ urls: links.map(l => l.href) }),
  };
  return await request(requestURL, options)
    .then(resp => resp.data);
}

async function postSendSMSAPI(payload) {
  const requestURL = '/api/sms';
  const options = {
    method: 'POST',
    credentials: 'same-origin',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  };
  return await request(requestURL, options)
    .then(resp => resp.data);
}

export function* requestSendSMS(action) {
  let { message } = action.payload;
  const links = linkify.find(message);
  // Perform bitly conversions
  try {
    const bitlyLinks = yield getBitlyLinks(links);
    links.forEach((link, index) => {
      message = message.replace(new RegExp(link.value, 'g'), bitlyLinks[index]);
    });
  } catch (error) {
    const errorMessage = 'Could not perform bitly URL conversion';
    console.error(errorMessage, error);
    yield put(sendSMSError(errorMessage));
  }
  // Attempt to send SMS
  try {
    const response = yield postSendSMSAPI({
      number: action.payload.number,
      from: action.payload.from,
      message,
    });
    yield put(sendSMSSuccess(response.data.message_id));
  } catch (error) {
    const errorMessage = 'Could not request SMS sent API';
    console.error(errorMessage, error);
    yield put(sendSMSError(errorMessage));
  }
}

export default function* SMSChallengeSaga() {
  yield all([
    takeLatest(SEND_SMS, requestSendSMS),
  ]);
}
