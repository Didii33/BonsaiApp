console.log('App.js wurde geladen!');

// Importiere Firebase-Module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Import für Firestore
import { firebaseConfig } from './firebaseConfig.js';  // Firebase-Konfiguration importieren

// Firebase App initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore initialisieren

// Funktion zur Überprüfung des E-Mail-Formats
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

// Login mit Firebase
document.getElementById('signInForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Verhindert, dass das Formular neu geladen wird.
  console.log('Login Form submitted');

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User logged in:', user);

      // Weiterleitung zur bonsai-form.html
      window.location.href = 'bonsai-form.html';  // Weiterleiten zur Bonsai-Form-Seite
    })
    .catch((error) => {
      console.error('Login error:', error);
      alert('Fehler beim Login: ' + error.message);
    });
});

// Service Worker registrieren, falls unterstützt
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(reg => console.log('Service Worker registriert!', reg))
    .catch(err => console.error('Service Worker Fehler:', err));
}

// Bonsai-Form: Event-Listener für das Bonsai-Formular (nur einmal!)
document.getElementById('bonsaiForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const bonsaiName = document.getElementById('bonsaiName').value;
  const bonsaiAge = document.getElementById('bonsaiAge').value;

  // Firestore: Bonsai speichern
  addDoc(collection(db, 'bonsais'), {
    name: bonsaiName,
    age: bonsaiAge,
    userId: auth.currentUser.uid // Speichern der User-ID für die Zuordnung
  })
    .then(() => {
      console.log('Bonsai erfolgreich gespeichert!');
      // Weiterleitung nach dem Speichern
      window.location.href = '/docs/bonsai-list.html'; // Seite mit allen Bonsais anzeigen
    })
    .catch((error) => {
      console.error('Fehler beim Speichern des Bonsais:', error);
    });
});
