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

     // Limpiar los campos del formulario
     setNombre('');
     setMonto('');
     setCategoria('');
  };  



  return (
  <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Agregar Gasto</h2>
        <form onSubmit={manejarSubmit}>

          {/* Input para nombre */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre del Gasto
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Compra de alimentos"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Input para monto */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="monto">
              Monto
            </label>
            <input
              id="monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ej. 50"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Select para categoría */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
              Categoría
            </label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Comida">Comida</option>
              <option value="Transporte">Transporte</option>
              <option value="Entretenimiento">Entretenimiento</option>
              <option value="Otros">Otros</option>
            </select>
          </div>

          {/* Botón para agregar gasto */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Agregar Gasto
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AgregarGasto;
