// WelcomeModal.js
import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function WelcomeModal({ onClose, onSubmit }) {
  const [presupuesto, setPresupuesto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        // Guardar el presupuesto en Firestore
        await setDoc(doc(db, 'presupuestos', user.uid), {
          presupuestoInicial: parseFloat(presupuesto)
        });
        onSubmit(presupuesto); // Llamamos a la función onSubmit para pasar el presupuesto
        onClose(); // Cierra el modal después de guardar
      }
    } catch (error) {
      console.error('Error al guardar el presupuesto:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">¡Bienvenido!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700">
              Presupuesto Inicial
            </label>
            <input
              type="number"
              id="presupuesto"
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Aceptar
          </button>
        </form>
      </div>
    </div>
  );
}

export default WelcomeModal;
