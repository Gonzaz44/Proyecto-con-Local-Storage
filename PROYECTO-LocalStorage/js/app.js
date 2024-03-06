// VARIABLES

const formulario = document.querySelector('#formulario');
const listaTweeets = document.querySelector('#lista-tweets');
let tweets = [];


//EVENTLISTENER
eventListener();
//Cuando el usuario agrega un nuevo tweet
function eventListener() {
  formulario.addEventListener('submit', agregarTweet); 

  //Cuando el documento está listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets'))  || [];
    console.log(tweets);
    crearHTML();
  });
}


//FUNCIONES
function agregarTweet(e) { 
  e.preventDefault();

  // TextArea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;

  if (tweet === '') {
    mostrarError('Un mensaje no puede ir vacío');
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet
  }

  //Añadir al arreglo de tweet
  tweets = [...tweets, tweetObj] 

  //Crear el HTML
  crearHTML();

  //Reiniciar el formulario
  formulario.reset();

}

// Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  //Insertar el contanido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);
  //Elimina el alerta después de 4seg
  setTimeout(() => {
    mensajeError.remove();

  }, 400)
}

//Mostrar un listado de los tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) { 
    tweets.forEach(tweet => { 

      //Crear un botón
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'x';

      //Eliminar el tweet del HTML
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);

      }


      //Crear el HTML
      const li = document.createElement('li');

      //Añadir texto
      li.textContent = tweet.tweet; 

      //Asignar el botón
      li.appendChild(btnEliminar);

      //Insertar la lista de los tweets en el HTML
      listaTweeets.appendChild(li);
    });
  }

  sincronizarStorage();
}
//Agrega los tweets a LocalStorage
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets));

}

// Función para eliminar el tweet del HTML
function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id);
  crearHTML();
}

//Limpiar HTML
function limpiarHTML() {
  while (listaTweeets.firstChild) {
    listaTweeets.removeChild(listaTweeets.firstElementChild);
  }
}