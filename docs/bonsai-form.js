document.getElementById('bonsaiForm').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const bonsaiName = document.getElementById('bonsaiName').value;
    const bonsaiAge = document.getElementById('bonsaiAge').value;
  
    // Angenommen, du verwendest Firebase Firestore
    const db = firebase.firestore();
    db.collection('bonsais').add({
      name: bonsaiName,
      age: bonsaiAge,
      userId: firebase.auth().currentUser.uid // Speichern der User-ID für die Zuordnung
    })
    .then(() => {
      console.log('Bonsai erfolgreich gespeichert!');
      // Optional: Weiterleitung nach dem Speichern
      window.location.href = '/docs/bonsai-list.html'; // Seite mit allen Bonsais anzeigen
    })
    .catch((error) => {
      console.error('Fehler beim Speichern des Bonsais:', error);
    });
  });
  