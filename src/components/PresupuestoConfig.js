import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

function PresupuestoConfig() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPresupuesto = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, 'usuarios', auth.currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setPresupuesto(docSnap.data().presupuesto || 0);
        }
        setLoading(false);
      }
    };
    fetchPresupuesto();
  }, []);

  const handlePresupuestoChange = (e) => {
    setPresupuesto(e.target.value);
  };

  const handleSave = async () => {
    if (auth.currentUser) {
      const userDoc = doc(db, 'usuarios', auth.currentUser.uid);
      await updateDoc(userDoc, { presupuesto: Number(presupuesto) });
      alert('Presupuesto actualizado');
    }
  };

  return (
    <div>
      <h2>Configurar Presupuesto</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <input
            type="number"
            value={presupuesto}
            onChange={handlePresupuestoChange}
            placeholder="Ingrese su presupuesto inicial"
          />
          <button onClick={handleSave}>Guardar</button>
        </div>
      )}
    </div>
  );
}

export default PresupuestoConfig;
