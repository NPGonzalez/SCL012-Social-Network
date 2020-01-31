/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  perfilInfo,
} from './perfil.js';

export const goHome = () => {
  window.location.hash = '/home';
  document.getElementById('root').innerHTML = `
  <header class="header">
          <img class="logoBar" src="img/logoOcre.png" alt="logo-bitacora"/>
          <nav class="topnav">
                <a id="home" href="#">Home</a>
                <a id="btn-perfil">Perfil</a>
          </nav>
          <a id="btnLogOut" href="#" class="logOut">Cerrar sesión</a>
  </header>
  <body class= "bodyHome">
        <div id="perfil-content"></div>
  <div id="writePost" class="post" >  
  <h4> PUBLICACIONES </h4>
  <div id="postsUsers"> 
  <div id="lista"></div> </div>
  <textarea name="message" id="message" class="texts"></textarea> 
  <div id="postButton">
  <input type="button" value="Postear" id="buttonPost" class="firstButton">
  </div>          
  </div>
  </body>`;


//RECUPERACIÓN DE POSTS
const divPosts = document.getElementById('lista');
const createPosts = firebase.database().ref().child('posts/');

createPosts.on('child_added', snap => {
const thePostDiv = document.createElement('div');
thePostDiv.innerHTML = `<div id="post${snap.key}">
  <div class="encabezado"><img src="${snap.val().authorPic || ''}"><div id="usuario">${snap.val().author}</div></div>
  <hr>
  <div id="bodyPost" class = "textPosts"><p>${snap.val().body}</p></div>
  <div id="datePost" class = "textPosts">${snap.val().createDate}</div>
  <hr>
  <div id="likes">Likes</div>
  <hr>
  </div>`;
divPosts.appendChild(thePostDiv);
});

//BOTÓN PARA POSTEAR
document.getElementById('buttonPost').addEventListener('click', () => {
  const database = firebase.database();
  const user = firebase.auth().currentUser;
  console.log(user);
  
  let uid = user.uid;
  let username = user.displayName;
  let picture = user.photoURL;
  let place = '';
  let date = new Date();
  let body = document.getElementById('message').value;
  document.getElementById("message").value="";
  const writeNewPost = (uid, username, picture, place, body) => {
   // A post entry.
   let postData = {
     author: username,
     uid: uid,
     body: body,
     place: place,
     starCount: 0,
     authorPic: picture,
     createDate: date.toUTCString(),
   };
 
   // Get a key for a new Post.
  let newPostKey = firebase.database().ref().child('posts').push().key;
 
   // Write the new post's data simultaneously in the posts list and the user's post list.
  let updates = {};
   updates['/posts/' + newPostKey] = postData;
   updates['/user-posts/' + uid + '/' + newPostKey] = postData;
   updates['/places/' + place + '/' + newPostKey] = postData;
   return firebase.database().ref().update(updates);
 }
  // LLAMADA A FUNCIÓN QUE IMPRIME POSTS
    writeNewPost(uid, username, picture, place, body);
    //  printPost();
  });




//*********************************************************************************** */

// Función para eliminar Post
const deletePost = (id) => {
  const questions = confirm('¿Está seguro de eliminar?');
  if (questions) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref().child('/user-posts/' + userId + '/' + id).remove();
    firebase.database().ref().child('posts/' + id).remove();
    while (publications.firstChild) publications.removeChild(publications.firstChild);
    alert('Post eliminado');
    window.location.reload();
  }
}

// Función para editar Post
window.editPost = (id) => {
  const currentPost = document.getElementById(id);
  const currentTextarea = currentPost.querySelector('.textarea-post');
  currentTextarea.disabled = false;
  const editButton = currentPost.querySelector('.edit-button');
  const saveButton = currentPost.querySelector('.save-button');
  editButton.classList.add('hidden');
  saveButton.classList.remove('hidden');
  currentTextarea.focus();
}

// Función para guardar post editado
window.savePostEdit = (id) => {
  const currentPost = document.getElementById(id);
  const currentTextarea = currentPost.querySelector('.textarea-post');
  const editButton = currentPost.querySelector('.edit-button');
  const saveButton = currentPost.querySelector('.save-button');
  const userId = firebase.auth().currentUser.uid;

  firebase.database().ref('posts/')
  .once('value', (postsRef) => { 
      const posts = postsRef.val();
      const postEdit = posts[id];
  
      let postEditRef = {
        id: postEdit.id,
        author: postEdit.author,
        newPost: currentTextarea.value,
        privacy: postEdit.privacy,
        likeCount: postEdit.likeCount,
        usersLikes: postEdit.usersLikes || []
      }
  
      let updates = {};
      updates['/posts/' + id] = postEditRef;
      updates['/user-posts/' + userId + '/' + id] = postEditRef;
      return firebase.database().ref().update(updates);

      currentTextarea.disabled = true;
      saveButton.classList.add('hidden');
      editButton.classList.remove('hidden');
    });
}

//****************************************************************************************************************** */



































  // BOTÓN QUE LLEVA AL PERFIL DEL USUARIO
  document.getElementById('btn-perfil').addEventListener('click', (evt) => {
    perfilInfo();
  });

  // BOTÓN QUE LLEVA AL HOME
  document.getElementById('home').addEventListener('click', () => {
    goHome();
  });

  // BOTÓN DE CIERRE DE SESIÓN LOGOUT
  document.getElementById('btnLogOut').addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => {
        goLoginPage();
        console.log('salir');
      })
      .catch((error) => {
        console.log('error saliendo');
      });
  });
};
