exports.bumblebee = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Good day Darling!",
    }),
  };
};
