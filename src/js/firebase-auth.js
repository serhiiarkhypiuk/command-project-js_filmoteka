// import '../styles.css';
import {
  hideLoginError,
  showLoginError,
  btnLogin,
  btnSignup,
  btnLogout,
  txtEmail,
} from './ui';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCrWSxMZNzPqrsCEO5iHB2BSDQ95dLnvwo',
  authDomain: 'fir-auth-94948.firebaseapp.com',
  databaseURL: 'https://fir-auth-94948-default-rtdb.firebaseio.com',
  projectId: 'fir-auth-94948',
  storageBucket: 'fir-auth-94948.appspot.com',
  messagingSenderId: '867195326409',
  appId: '1:867195326409:web:a484591ccdaf0830a4a218',
  measurementId: 'G-5GZZ6N44MF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const loginEmailPasswrod = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
    // window.location.assign('./index');
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};

btnLogin.addEventListener('click', loginEmailPasswrod);

const createAccount = async () => {
  const loginEmail = txtEmail.value;
  const loginPassword = txtPassword.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};

btnSignup.addEventListener('click', createAccount);

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user) {
      console.log(user);
      hideLoginError();
    }
  });
};

monitorAuthState();

const logout = async () => {
  await auth
    .signOut()
    .then(() => {
      // window.location.assign('../');
    })
    .catch(error => {
      console.error(error);
    });
};

btnLogout.addEventListener('click', logout);
