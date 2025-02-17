const email = document.getElementById("email").value.trim(); 
const password = document.getElementById("password").value.trim(); 

// Funktion zur Überprüfung des E-Mail-Formats
function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  
  // Beispiel für die Anmeldung
  function signInWithEmail(email, password) {
    // Überprüfen, ob die E-Mail gültig ist
    if (!isValidEmail(email)) {
      console.error('Invalid email address');
      alert('Bitte eine gültige E-Mail-Adresse eingeben!');
      return;
    }
    }
  
    // Firebase Anmeldung durchführen
    if (!email || !password) {
      console.error("E-Mail oder Passwort ist leer!");
      return;
     }
  
  firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          console.log("Login erfolgreich!", userCredential);
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
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('User registered as:', user.email);
      })
      .catch(error => {
        console.error('Error registering:', error);
        alert('Fehler bei der Registrierung: ' + error.message);
      });
  }
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registriert!', reg))
      .catch(err => console.error('Service Worker Fehler:', err));
  }
  