import { useEffect, useState } from "react";
import { addBonsai, getBonsais } from "./BonsaiService";

function BonsaiList() {
  const [bonsais, setBonsais] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [birthdate, setBirthdate] = useState("");

  useEffect(() => {
    getBonsais().then(setBonsais);
  }, []);

  const handleAddBonsai = async () => {
    await addBonsai(name, type, birthdate);
    setBonsais(await getBonsais());
  };

  return (
    <div>
      <h2>Meine Bonsais</h2>
      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Typ" onChange={(e) => setType(e.target.value)} />
      <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
      <button onClick={handleAddBonsai}>Hinzufügen</button>
      <ul>
        {bonsais.map((b) => (
          <li key={b.id}>{b.name} - {b.type}</li>
        ))}
      </ul>
    </div>
  );
}

export default BonsaiList;
