const {CognitoIdentityProviderClient, ConfirmSignUpCommand} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({
    region: 'us-east-1',//Specify your AWS region
});

// const CLIENT_ID = "24afgv0lal4ud015i4veuog2a1"; 
const CLIENT_ID = process.env.COGNITO_CLIENT_ID;


exports.confirmSignUp = async (event) =>{
    const {email, confirmationCode}  = JSON.parse(event.body);

    const params = {
        ClientId: CLIENT_ID,
        Username :email,
        ConfirmationCode:confirmationCode,
    };
    try {
        const command = new ConfirmSignUpCommand(params);

        await client.send(command);

        return {
            statusCode:200,
            body: JSON.stringify({msg:"User successfully confirmed!"}),
        };  
    } catch (error) {
        return {
            statusCode:400,
            body:JSON.stringify({msg: 'confirmation failed', error:error.message}),
        };
    }
}