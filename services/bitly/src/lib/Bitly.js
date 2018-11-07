const request = require('request-promise-native');

const BASE_URL = 'https://api-ssl.bitly.com/v4';

/**
 * Creates thee authorization headers for the HTTP request
 * @returns {{Authorization: string}}
 */
const getAuthObj = () => ({
  Authorization: `Bearer ${process.env.BITLY_ACCESS_TOKEN || ''}`,
});

/**
 * Returns a shortened URL from Bitly, given a url parameter
 * @param url {string}
 * @returns {Promise<*>}
 */
const shortenUrl = async (url) => {
  try {
    // Request options
    const options = {
      method: 'POST',
      url: `${BASE_URL}/shorten`,
      headers: getAuthObj(),
      body: {
        'long_url': url,
      },
      json: true,
    };
    return await request(options);
  } catch (error) {
    console.error('Could not complete shorten url request from Bitly', error.message);
    return Promise.reject(error);
  }
};

exports.shortenUrl = shortenUrl;
