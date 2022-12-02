// This file is used for manual configuration of the Amplify library.
// When Amplify is used in conjunction with the Amplify CLI toolchain or AWS Mobile Hub to manage backend resources,
// an aws-exports.js file is auto-generated and can be used instead of the below to automatically configure the Amplify library.
// In this workshop, we are using the Amplify client libraries without the CLI toolchain so you should edit this file manually.

const awsConfig = {
    Auth: {
        // user: pool_user_1
        // pass: Mekiller1.

        identityPoolId: "us-east-2:15511981-349f-4406-94e0-802252d13798", // example: 'us-east-2:c85f3c18-05fd-4bb5-8fd1-e77e7627a99e'
        region: "us-east-2", // example: 'us-east-2'
        userPoolId: "us-east-2_RnKeGFdQ2", // example: 'us-east-2_teEUQbkUh'
        userPoolWebClientId: "7rkhqabc1j9mls0nnabg26b0mp", // example: '3k09ptd8kn8qk2hpk07qopr86'

        oauth: {
            domain: "marlkiller.auth.us-east-2.amazoncognito.com",
            scope: [
                "phone",
                "email",
                "profile",
                "openid",
                "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: "http://localhost:3000",
            redirectSignOut: "http://localhost:3000",
            responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
    },
    API: {
        endpoints: [
            {
                name: "WildRydesAPI",
                endpoint:
                    "https://de7es6k23g.execute-api.us-east-2.amazonaws.com/v1", // example: 'https://u8swuvl00f.execute-api.us-east-2.amazonaws.com/prod'
                region: "us-east-2", // example: 'us-east-2'
            },
        ],
    }
};

export default awsConfig;
