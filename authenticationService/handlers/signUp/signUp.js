const {CognitoIdentityProviderClient, SignUpCommand} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoClient = new CognitoIdentityProviderClient({region: 'us-east-1'});

const UserModel = require('../../models/User');

const CLIENT_ID = 'your_cognito_app_client_id';

exports.handler = async (event) => {
    const { email, password } = JSON.parse(event.body);
    const params = {
        ClientId: CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
                Name: 'name',
                Value: fullname
            }
        ]
    };

    try {
        const command = new SignUpCommand(params);
        const response = await cognitoClient.send(command);
        const newUser = new UserModel({
            email: email,
            cognitoSub: response.UserSub,
            // Add other user attributes as needed
        });
        await newUser.save();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User signed up successfully', data: response }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Error signing up user', error: error.message }),
        };
    }
}