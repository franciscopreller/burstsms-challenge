/**
 * Just a wrapper to create simple responses for the gateway
 */
const createResponse = {
  error: error => ({
    error: true,
    data: error,
  }),
  success: data => {
    // Filter out the data, remove the error object which already comes with all responses
    const { error, ...payload } = data;
    return {
      error: false,
      data: payload,
    };
  },
};

module.exports = createResponse;
