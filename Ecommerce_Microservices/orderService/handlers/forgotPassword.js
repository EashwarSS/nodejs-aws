const {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand
} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoClient = new CognitoIdentityProviderClient({
  region: "us-east-1"
});

const CLIENT_ID = process.env.CLIENT_ID;

exports.forgotPassword = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Request body is missing" })
      };
    }

    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" })
      };
    }

    const params = {
      ClientId: CLIENT_ID,
      Username: email
    };

    const command = new ForgotPasswordCommand(params);
    await cognitoClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "Password reset code sent to email"
      })
    };

  } catch (error) {
    console.error("ForgotPassword error:", error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: error.message || "Unknown error"
      })
    };
  }
};
