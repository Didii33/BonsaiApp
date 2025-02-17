// app.js
console.log('App.js wurde geladen!');

// Importiere Firebase-Module
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import firebaseConfig from './firebaseConfig.js';  // Firebase-Konfiguration importieren

// Firebase App initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Funktion zur Überprüfung des E-Mail-Formats
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

//login mit firebase
document.getElementById('signInForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Verhindert, dass das Formular neu geladen wird.
  console.log('Login Form submitted');

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log('Email:', email);
  console.log('Password:', password);

  // Firebase-Anmeldung hier einfügen
  const auth = getAuth();  // Hier holen wir den Auth-Objekt
  signInWithEmailAndPassword(auth, email, password)  // Modularer Ansatz
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User logged in:', user);
    })
    .catch((error) => {
      console.error('Login error:', error);
    });
});



// Beispiel für die Registrierung
function registerWithEmail(email, password) {
    // Überprüfen, ob die E-Mail gültig ist
    if (!isValidEmail(email)) {
        console.error('Invalid email address');
        alert('Bitte eine gültige E-Mail-Adresse eingeben!');
        return;
    }

    // Firebase Registrierung durchführen
    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log('User registered as:', user.email);
        })
        .catch(error => {
            console.error('Error registering:', error);
            alert('Fehler bei der Registrierung: ' + error.message);
        });
}

// Service Worker registrieren, falls unterstützt
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('Service Worker registriert!', reg))
        .catch(err => console.error('Service Worker Fehler:', err));
}
