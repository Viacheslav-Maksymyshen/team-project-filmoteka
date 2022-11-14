import Notiflix from 'notiflix';


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, collection, getDocs, getDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBxK5_h_ujvAsW-jGS7sZP1o86rN6KTw8k',
  authDomain: 'filmoteca-07-2022.firebaseapp.com',
  projectId: 'filmoteca-07-2022',
  storageBucket: 'filmoteca-07-2022.appspot.com',
  messagingSenderId: '628934586572',
  appId: '1:628934586572:web:0e49d0218d443fe2319269',
  measurementId: 'G-21XLJKH2KG',
});

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// console.log(app);
const sendToDBFormBtn = document.getElementById('sendToDBFormBtn');
const libraryDBPopup = document.getElementById('libraryDBPopup');
const showMovieFromDB = document.getElementById('showMovieFromDB');

// const storage refs
const STORAGE_WATCHED = 'Watched:';
const STORAGE_QUEUE = 'Queque:';

const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
// db.collection('todos').getDocs();
// const todosCol = collection(db, 'todos');
// const snapshot = await getDocs(todosCol);

// detect state
const logRegBtn = document.getElementById('log_reg_button');

onAuthStateChanged(auth, user => {
  if (user != null) {
    // console.log('logged in');
  } else {
    // console.log('no user');
  }
});

function fetchMoviesByIdToken(token) {
  // console.log(token);
  if (!token) {
    // Notiflix.Notify.warning('Invalid email'); 
    return 
    // return Promise.resolve('<p> No token</p>')
  }
  
   
    
  return fetch(
    `https://filmoteca-07-2022-default-rtdb.firebaseio.com/movies.json?auth=${token}`
  )
    .then(response => response.json())
    .then(movies => {
      // console.log('movies', movies);
      const lastAddedMovies = movies[Object.keys(movies)[Object.keys(movies).length - 1]];
      // console.log(lastAddedMovies);
      // console.log("last queue", lastAddedMovies.queueMovies);
      // console.log("last watched", lastAddedMovies.watchedMovies);
      const wathedTitles = [];
      const queueTitles = [];

      if (lastAddedMovies.watchedMovies) {
        lastAddedMovies.watchedMovies.forEach(element => {
          wathedTitles.push(element.title)
        });
      }
      if (lastAddedMovies.queueMovies) {
        lastAddedMovies.queueMovies.forEach(element => {
         queueTitles.push(element.title)
        });
      }
      // console.log(wathedTitles);
      // console.log(queueTitles);
      if (libraryDBPopup) {
        libraryDBPopup.innerHTML = `
                <div>
                <p>watched:"${wathedTitles}</p>
                <p>queue:"${queueTitles}</p>
                </div>`
        
      }
    })
    
}

function authWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyBxK5_h_ujvAsW-jGS7sZP1o86rN6KTw8k';
  return (
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(data => {
        // console.log(data);

        if (data.error) {
              if (data.error.message == 'INVALID_EMAIL') {
              Notiflix.Notify.warning('Invalid email');
              return
            }
            if (data.error.message == 'INVALID_PASSWORD') {
              Notiflix.Notify.warning('Invalid password');
              return
            }
        }
        else {
        // console.log(data.email);
        Notiflix.Notify.success(`Welcome back !!! Movie lover with email: ${data.email}`);
          logRegBtn.classList.add('logged');
          if (sendToDBFormBtn) {
            sendToDBFormBtn.removeAttribute('disabled');
            showMovieFromDB.removeAttribute('disabled');
          }
          
        return data.idToken
      }
        
      })
  );
}

function authFormHandler(e) {
  e.preventDefault();
  const email = e.target.querySelector('#email').value;
  const password = e.target.querySelector('#password').value;
  // console.log(email, password);

  if (email == "") {
    Notiflix.Notify.warning('Missing email');
    login_form.reset();
    return
  }
    if (password == "") {
      Notiflix.Notify.warning('Missing password');
      login_form.reset();
      return
  }
      if (password.length < 6) {
      Notiflix.Notify.warning('Weak password. Should be more then 6 characters');
      login_form.reset();
      return
  }

  authWithEmailAndPassword(email, password).then(token => {
    return fetchMoviesByIdToken(token);
  });

  // .then(renderModalAfterAuth)
}

// function renderModalAfterAuth(content) {

// }

const login_form = document.getElementById('login_form');
login_form.addEventListener('submit', authFormHandler);

function createUserWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyBxK5_h_ujvAsW-jGS7sZP1o86rN6KTw8k';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // console.log(data.error.message);
  
      if (data.error) {
          if (data.error.message == 'EMAIL_EXISTS') {
          Notiflix.Notify.warning('Email exists');
          return
        }
        if (data.error.message == 'INVALID_EMAIL') {
          Notiflix.Notify.warning('Invalid email');
          return
      }
      } else {
        // console.log(data.email);
        Notiflix.Notify.success(`Welcome. You have been sign in with email: ${data.email}`);
        logRegBtn.classList.add('logged');
         if (sendToDBFormBtn) {
            sendToDBFormBtn.removeAttribute('disabled');
            showMovieFromDB.removeAttribute('disabled');
          }
      }
    });
}

function regFormHandler(e) {
  e.preventDefault();
  const email = e.target.querySelector('#reg_email').value;
  const password = e.target.querySelector('#reg_password').value;
  // const name = e.target.querySelector('#reg_name').value;

  // console.log(email, password);

  if (email == "") {
    Notiflix.Notify.warning('Missing email');
    register_form.reset();
    return
  }
    if (password == "") {
      Notiflix.Notify.warning('Missing password');
      register_form.reset();
      return
  }
      if (password.length < 6) {
      Notiflix.Notify.warning('Weak password. Should be more then 6 characters');
      register_form.reset();
      return
  }
  createUserWithEmailAndPassword(email, password);
  // .then(token => {

  // })
}

const register_form = document.getElementById('register_form');
// console.log(login_form);
register_form.addEventListener('submit', regFormHandler);

function addInfoToDB(addedMovies) {
  return fetch(
    'https://filmoteca-07-2022-default-rtdb.firebaseio.com/movies.json',
    {
      method: 'POST',
      body: JSON.stringify(addedMovies),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then(response => response.json())
    .then(response => {
      // console.log(response);
      // console.log('added to DB')
        Notiflix.Notify.success(`Added movies to DB`);

      addedMovies.id = response.name;
      return addedMovies;
    })
    // .then(addToLocalStorage);
  // .then(render)
}

// function addToLocalStorage(test_string) {
//   const all = getMoviesFromLocalStorage();
//   all.push(test_string);
//   localStorage.setItem('movies', JSON.stringify(all));
// }
// function getMoviesFromLocalStorage() {
//   return JSON.parse(localStorage.getItem('movies') || '[]');
// }

function sendToDBFormHandler(e) {
    e.preventDefault();
    // const inputVal = e.target.querySelector('#test_input').value;
    const watchedFilmsArrayDB = JSON.parse(localStorage.getItem(STORAGE_WATCHED)) || [];
    const queueFilmsArrayDB = JSON.parse(localStorage.getItem(STORAGE_QUEUE)) || [];

    const movieBase = {
      watchedMovies: watchedFilmsArrayDB,
      queueMovies:queueFilmsArrayDB,
      date: new Date().toJSON()
    }
    // console.log(movieBase);

    // sbm_btn.disabled = true
  addInfoToDB(movieBase)
    // .then(() => {
    //     inputVal.value = ''
    //     // sbm_btn.disabled = false

    // })

}

function showRenderedMovieFromDB() {
  libraryDBPopup?.classList.add('visible');
}

const sendToDBForm = document.getElementById('sendToDBForm');
sendToDBForm?.addEventListener('submit', sendToDBFormHandler);
showMovieFromDB?.addEventListener('click', showRenderedMovieFromDB);
