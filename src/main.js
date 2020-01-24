import { goLoginPage } from './pages/login.js';
import { goHome } from './pages/home.js';
import './firebase-init.js';

document.addEventListener('DOMContentLoaded', () => {
  const user = firebase.auth().currentUser;
  if (!user) {
    goLoginPage();
  } else {
    document.getElementById('root').innerHTML = '<div>Bienvenido Usuario</div>';
  }
});

// #Observador de autenticación
const stateObserved = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      // const displayName = user.displayName;
      // const email = user.email;
      // const emailVerified = user.emailVerified;
      // const photoURL = user.photoURL;
      // const isAnonymous = user.isAnonymous;
      // const uid = user.uid;
      // const providerData = user.providerData;
      goHome();
    } else {
      goLoginPage();
    }
  });
};
stateObserved();
