import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Importa la configuración de Firebase


function Widgets ({gastos =[]}){
    const [Presupuesto, setPresupuesto] = useState(0);
    const [editingPresupuesto, setEditingPresupuesto] = useState(false); // Nuevo estado para editar presupuesto


    useEffect(() => {
        const fetchPresupuesto = async () => {
          if (auth.currentUser) {
            const userDoc = doc(db, 'presupuestos', auth.currentUser.uid); // Cambiado a 'users'
            console.log("UID del usuario:", auth.currentUser.uid); // Asegúrate de que este ID es correcto
            const docSnap = await getDoc(userDoc);
            if (docSnap.exists()) {
              setPresupuesto(docSnap.data().presupuestoInicial || 0); // Cambiado a 'presupuestoinicial'
            } else {
              console.log("Documento de usuario no encontrado.");
            }
          }
        };
        fetchPresupuesto();
      }, []);
    
      
      const handlePresupuestoUpdate = async () => {
          try {
              const userDocRef = doc(db, 'presupuestos', auth.currentUser.uid); // Cambiado a 'users'
              const docSnap = await getDoc(userDocRef);
              
              if (docSnap.exists()) {
                  await updateDoc(userDocRef, { presupuestoInicial: Presupuesto }); // Cambiado a 'presupuestoinicial'
                  setEditingPresupuesto(false);
                } else {
                    console.error("No se encontró el documento para actualizar.");
                }
            } catch (error) {
                console.error('Error al actualizar el presupuesto:', error);
            }
        };
        
    const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);
      

return(

    <div className="flex space-x-4 mb-4">
    <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
      <h3 className="text-lg font-semibold">Presupuesto Inicial</h3>
      {editingPresupuesto ? (
        <div>
          <input
            type="number"
            value={Presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            className="border p-2 rounded-md"
          />
          <button
            className="bg-green-500 text-white px-3 py-2 rounded-md mt-2"
            onClick={handlePresupuestoUpdate}
          >
            Guardar
          </button>
        </div>
      ) : (
        <>
          <p className="text-2xl">${Presupuesto}</p>
          <button
            className="mt-2 text-blue-500"
            onClick={() => setEditingPresupuesto(true)}
          >
            Editar
          </button>
        </>
      )}
    </div>

    {/* Tarjeta de Total Gastado */}
    <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
      <h3 className="text-lg font-semibold">Total Gastado</h3>
      <p className="text-2xl">${totalGastos}</p>
    </div>

    {/* Tarjeta de Saldo Disponible */}
    <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
      <h3 className="text-lg font-semibold">Saldo Disponible</h3>
      <p className="text-2xl">${Presupuesto - totalGastos}</p>
    </div>
    </div>


);
}

export default Widgets;
