import { AuthErrorCodes } from 'firebase/auth';

export const txtEmail = document.querySelector('#txtEmail');
export const txtPassword = document.querySelector('#txtPassword');

export const btnLogin = document.querySelector('#btnLogin');
export const btnSignup = document.querySelector('#btnSignup');

export const btnLogout = document.querySelector('#btnLogout');

export const divAuthState = document.querySelector('#divAuthState');

export const divLoginError = document.querySelector('#divLoginError');
export const lblLoginErrorMessage = document.querySelector(
  '#lblLoginErrorMessage'
);

export const showLoginForm = () => {
  login.style.display = 'block';
};

export const hideLoginError = () => {
  divLoginError.style.display = 'none';
  lblLoginErrorMessage.innerHTML = '';
};

export const showLoginError = error => {
  divLoginError.style.display = 'block';
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`;
  } else {
    lblLoginErrorMessage.innerHTML = `Error: ${error.message}`;
  }
};

hideLoginError();
