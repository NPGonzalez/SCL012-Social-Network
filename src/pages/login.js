import {
  googleLogin
} from '../lib/google-auth.js';

import {
  emailLogin 
} from '../lib/index.js';

//GENERACIÓN DE PÁGINA DE LOGUEO CON FIREBASE
export const goLoginPage = () => {

  document.getElementById("root").innerHTML =
    `<div id="form-login">
        <form action="/form-page" method="post" onsubmit="return validation()">
          <ul class= "list">
            <li>
              <label for="mail"></label>
              <input class="inputLogin" type="email" id="txtMail" name="user_mail" Placeholder = "Correo electrónico" />
            </li>
            <li>
              <label for="password-example"></label> 
              <input class="inputLogin" type="password" id="txtPassword" name="password-example" Placeholder = "Contraseña" required />
            </li>
            <li class="button">
              <button class= "login" id="registro" type="button">Registrarse</button>
              <button class= "login" id="btnLogin" type="submit">Iniciar sesión</button>
              <span id="loginGoogle" class="login"><img src="./img/googleLogo.jpg" class="icon" alt=""><p>Inicia Sesión con Google</p></span>
              <span id="loginFacebook" class="login Facebook"><img src="" class="icon" alt=""><p>Inicia Sesión con Facebook</p></span>
            </li>
          </ul>
        </form>
      </div>`;
  buildListenerForm();
}

/**
 * Funcion inicia el boton de login cuando este exista
 */
const buildListenerForm = () => {

  try {
    // BOTON PARA LOGUEAR CON EMAIL Y PASSWORD
    document.getElementById("form-login").addEventListener("submit", () => {
      const email = document.getElementById("txtMail").value;
      const password = document.getElementById("txtPassword").value;
      emailLogin(email, password);
    });
    // BOTÓN LOGIN CON GOOGLE
    document.getElementById("loginGoogle").addEventListener("click", () => {
      googleLogin();
    });

    // BOTON CREACIÓN DE CUENTA
    document.getElementById("registro").addEventListener("click", () => {
      document.getElementById("root").innerHTML = '';

      // BOTON QUE VUELVE AL LOGIN
      document.getElementById("volver").addEventListener("click", () => {
        document.getElementById("root").innerHTML = '';
        loginPage();
      });

      // BOTON QUE CREA CUENTA
      document.getElementById("btnCreate").addEventListener("click", () => {
        const email = document.getElementById("newTextMail").value;
        const password = document.getElementById("newTextPassword").value;
        modulo.createAccount(email, password);

      });
    });

  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
}