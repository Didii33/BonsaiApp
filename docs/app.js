// app.js

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

// Firebase Anmeldung durchführen
firebase.auth().signInWithEmailAndPassword(email, password)
   .then((userCredential) => {
       console.log("Login erfolgreich!", userCredential);
       // Weiterleitung auf die neue Seite
       window.location.href = 'bonsai-form.html'; // oder `window.location.assign('bonsai-form.html');`
   })
   .catch((error) => {
       console.error("Fehler beim Einloggen:", error.message);
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
