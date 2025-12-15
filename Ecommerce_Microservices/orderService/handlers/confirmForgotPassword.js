const {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand
} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoClient = new CognitoIdentityProviderClient({
  region: "us-east-1"
});

const CLIENT_ID = process.env.CLIENT_ID;

exports.forgotPassword = async (event) => {
    const { email, code, newPassword } = JSON.parse(event.body);

    const params = {
        ClientId: CLIENT_ID,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword
    };

    try {
        const command = new ConfirmForgotPasswordCommand(params);
        await client.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "Password has been reset successfully" })
        };
    } catch (error) {
        console.error("ConfirmForgotPassword error:", error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message || "Unknown error" })
        };
    }
};    