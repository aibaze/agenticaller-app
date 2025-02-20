import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

import cognito from './cognito';

export const VerifyUser = (email, code, callback) => {
  const user = new CognitoUser({
    Username: email,
    Pool: cognito,
  });
  user.confirmRegistration(code, true, callback);
};

export const SignIn = (email, password, successCb, errorCb) => {
  const user = new CognitoUser({
    Username: email,
    Pool: cognito,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      successCb(data);
    },
    onFailure: (error) => {
      errorCb(error.message);
    },
    newPasswordRequired: (data) => {
      console.log(`password req :${data}`);
    },
  });
};

export const getSession = async () =>
  await new Promise((resolve, reject) => {
    const user = cognito.getCurrentUser();
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          reject(err);
        }
        resolve(session);
      });
    } else {
      reject();
    }
  });

export const logoutFromCognito = async () => {
  const user = cognito.getCurrentUser();
  if (user) {
    user.signOut();
  }
};
