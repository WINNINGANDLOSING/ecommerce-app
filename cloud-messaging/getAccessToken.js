const {JWT} = require('google-auth-library');
const path = require('path');

async function getAccessToken() {
  const serviceAccount = require('./firebase-service-account.json');

  const client = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  const token = await client.authorize();
  console.log('Access Token:', token.access_token);
}

getAccessToken();
