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
    firebase.auth().signInWithEmailAndPassword(email, password)
     .then((userCredential) => {
     // Erfolgreiches Login
     console.log('Erfolgreich eingeloggt:', userCredential.user);
    
     // Weiterleitung zur Bonsai-Seite
     window.location.href = '/docs/bonsai-form.html'; // Ändere dies zum Pfad deiner Seite
     })
    .catch((error) => {
     // Fehlerbehandlung
     const errorCode = error.code;
     const errorMessage = error.message;
        console.log(errorCode, errorMessage);
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
  