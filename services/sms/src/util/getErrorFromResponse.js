const getErrorFromResponse = errorStr => {
  const errorArr = errorStr.split(' - ');
  const status = errorArr[0];
  // Error object returns with double JSON encoding??
  const error = JSON.parse(JSON.parse(errorArr[1])).error;
  // Return the error object
  return {
    status,
    code: `${error.code}`,
    message: `${error.description}`,
  };
};

module.exports = getErrorFromResponse;
