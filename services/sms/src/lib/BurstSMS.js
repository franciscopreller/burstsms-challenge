const request = require('request-promise-native');
const querystring = require('querystring');
const getErrorFromResponse = require('../util/getErrorFromResponse');

const SUCCESS_CODE = 'SUCCESS';

class BurstSMS {
  constructor({ apiKey, secret }) {
    this.baseUrl = 'https://api.transmitsms.com';
    this.apiKey = apiKey;
    this.secret = secret;
  }

  /**
   * Returns the auth object for the request module
   * @returns {{user: *, pass: *}}
   */
  get auth() {
    return {
      user: this.apiKey,
      pass: this.secret,
    };
  }

  /**
   * Formats a number given a countryCode, used for sendSMS internally
   * @param number {string}
   * @param countryCode {string}
   * @returns {Promise<any>}
   */
  async formatNumber({ number, countryCode }) {
    try {
      // Generate the query string for GET request
      const qs = querystring.stringify({
        msisdn: number,
        countrycode: countryCode,
      });
      // Request options
      const options = {
        method: 'GET',
        url: `${this.baseUrl}/format-number.json?${qs}`,
        auth: this.auth,
      };
      const response = await request(options);
      // Parse the response to JSON
      return JSON.parse(response);
    } catch (error) {
      const errorObj = getErrorFromResponse(error.message);
      console.error('Could not complete format number request from BurstSMS', error.message);
      return Promise.reject(errorObj);
    }
  }

  /**
   * Sends an SMS given the parameters
   * @param number {string}
   * @param countryCode {string}
   * @param message {string}
   * @param from{string} [optional]
   * @returns {Promise<void>}
   */
  async sendSMS({ number, countryCode, message, from = null }) {
    try {
      const formattedNumber = await this.formatNumber({ number, countryCode });
      if (formattedNumber && formattedNumber.error && formattedNumber.error.code !== SUCCESS_CODE) {
        throw new Error(formattedNumber.error.code);
      }
      // Request options
      const options = {
        method: 'POST',
        url: `${this.baseUrl}/send-sms.json`,
        auth: this.auth,
        form: {
          message,
          to: formattedNumber.number.international,
          from,
        },
      };
      const response = await request(options);
      // Get message ID - since it won't be possible to get the BurstSMS system
      // to send callbacks to a local based system, we'll just ping the server
      // once per second (within the 2 per second throttle limit) for 5
      // seconds until we see the message has been delivered
      return JSON.parse(response);
    } catch (error) {
      // Error handling
      const errorObj = getErrorFromResponse(error.message);
      console.error('Could not complete send SMS request from BurstSMS', errorObj.code);
      return Promise.reject(errorObj);
    }
  }

  /**
   * Gets an SMS given an id
   * @param id {string}
   * @returns {Promise<void>}
   */
  async getSMS({ id }) {
    try {
      // Request options
      const options = {
        method: 'POST',
        url: `${this.baseUrl}/get-sms.json`,
        auth: this.auth,
        form: {
          'message_id': id,
        },
      };
      const response = await request(options);
      return JSON.parse(response);
    } catch (error) {
      // Error handling
      const errorObj = getErrorFromResponse(error.message);
      console.error('Could not complete get SMS request from BurstSMS', errorObj.code);
      return Promise.reject(errorObj);
    }
  }

  async getSMSStats({ id }) {
    try {
      // Request options
      const options = {
        method: 'POST',
        url: `${this.baseUrl}/get-sms-stats.json`,
        auth: this.auth,
        form: {
          'message_id': id,
        },
      };
      const response = await request(options);
      return JSON.parse(response);
    } catch (error) {
      // Error handling
      const errorObj = getErrorFromResponse(error.message);
      console.error('Could not complete get SMS stats request from BurstSMS', error.message);
      return Promise.reject(errorObj);
    }
  }
}

module.exports = BurstSMS;
