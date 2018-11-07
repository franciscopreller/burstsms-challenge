/**
 * Just a wrapper to create simple responses for the gateway
 */
const createResponse = {
  error: error => ({
    error: true,
    data: {
      message: error.message,
      status: error.status,
    },
  }),
  success: data => ({
    error: false,
    data,
  }),
};

module.exports = createResponse;
