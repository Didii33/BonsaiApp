import firebaseConfig from './firebaseConfig.js';

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-button');
  const logoutButton = document.getElementById('logout-button');
  const bonsaiList = document.getElementById('bonsai-list');
  const bonsaiInput = document.getElementById('bonsai-input');
  const addBonsaiButton = document.getElementById('add-bonsai-button');

  // Login-Funktion
  loginButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        console.log('User signed in:', result.user);
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  });

  // Logout-Funktion
  logoutButton.addEventListener('click', () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  });

  // Bonsai hinzufügen
  addBonsaiButton.addEventListener('click', () => {
    const bonsaiName = bonsaiInput.value;
    if (bonsaiName) {
      db.collection('bonsais').add({
        name: bonsaiName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log('Bonsai added');
        bonsaiInput.value = '';
      })
      .catch(error => {
        console.error('Error adding bonsai:', error);
      });
    }
  });

  // Bonsai-Liste anzeigen
  db.collection('bonsais').orderBy('timestamp').onSnapshot(snapshot => {
    bonsaiList.innerHTML = '';
    snapshot.forEach(doc => {
      const bonsai = doc.data();
      const listItem = document.createElement('li');
      listItem.textContent = bonsai.name;
      bonsaiList.appendChild(listItem);
    });
  });
});