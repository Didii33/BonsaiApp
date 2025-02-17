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

//login mit firebase
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("loginBtn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    console.log("Anmeldeversuch:", email, password); // Logge die eingegebene E-Mail und Passwort für Debugging

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Erfolgreiche Anmeldung
        const user = userCredential.user;
        console.log('Erfolgreich angemeldet:', user);  // Logge den angemeldeten Benutzer
        // Weiterleitung zur nächsten Seite (z. B. bonsai-form.html)
        window.location.href = "bonsai-form.html";
      })
      .catch((error) => {
        // Fehler bei der Anmeldung
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Fehler bei der Anmeldung:', errorCode, errorMessage); // Logge Fehlercode und Nachricht
        alert('Fehler bei der Anmeldung: ' + errorMessage);  // Zeige Fehler in einer Alert-Nachricht an
      });
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
