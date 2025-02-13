import { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log("Registriert:", userCredential.user))
      .catch((error) => console.error(error.message));
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log("Eingeloggt:", userCredential.user))
      .catch((error) => console.error(error.message));
  };

  return (
    <div>
      <input type="email" placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Passwort" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={signUp}>Registrieren</button>
      <button onClick={signIn}>Login</button>
    </div>
  );
}

export default Auth;
