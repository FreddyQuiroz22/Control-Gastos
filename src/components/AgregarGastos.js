import React, { useState } from 'react';

function AgregarGasto({agregarGasto}) {
  // Estado local para almacenar el nombre del gasto y el monto
  //const [nombre, setNombre] = useState('');
  //const [monto, setMonto] = useState('');
  //const [categoria, setCategoria] = useState('Comida'); // Nuevo estado para la categoría

  // Función para manejar el envío del formulario
  //const manejarSubmit = (e) => {
  //  e.preventDefault();
  //  const nuevoGasto = {
  //    nombre,
  //    monto: parseFloat(monto),
  //    categoria,
  //  };
  //  agregarGasto(nuevoGasto);
  //  setNombre('');
  //  setMonto('');
  //  setCategoria('comida');
  //};

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState(0);

  const manejarSubmit = (e) => {
    e.preventDefault();
    const nuevoGasto = { nombre, categoria, monto: parseFloat(monto) };
    agregarGasto(nuevoGasto); // Llama a la función para guardar el gasto en Firestore
  };  



  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Agregar Nuevo Gasto</h2>
      <form onSubmit={manejarSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Gasto:</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700">Monto:</label>
            <input
              id="monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoría:</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Comida">Comida</option>
              <option value="Transporte">Transporte</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className='flex-1 p-5'>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Agregar Gasto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AgregarGasto;
