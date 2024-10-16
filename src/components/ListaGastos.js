import React from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db, auth } from "../firebase"; // Importa la configuración de Firebase
import DataTable from 'react-data-table-component';
import { TrashIcon } from '@heroicons/react/24/outline'; // Para outline

function ListaGastos({ gastos, eliminarGasto, filtroCategoria, setFiltroCategoria }) {
  // const [Presupuesto, setPresupuesto] = useState(0);
  // const [editingPresupuesto, setEditingPresupuesto] = useState(false); // Nuevo estado para editar presupuesto

  const columns = [
    {
      name: 'Nombre',
      selector: row => row.nombre,
      sortable: true,
    },
    {
      name: 'Monto',
      selector: row => row.monto,
      sortable: true,
    },
    {
      name: 'Categoría',
      selector: row => row.categoria,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <button 
          onClick={() => eliminarGasto(row)} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
          <TrashIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      ),
    },
  ];

  //Datos para datatable

  const data = gastos.map((gasto)=>({
    nombre: gasto.nombre,
    monto: gasto.monto,
    categoria: gasto.categoria,
    id: gasto.id,
  }));

   // Manejar evento de eliminación de un gasto
  //  useEffect(() => {
  //   const table = document.querySelector('.dataTable');
  //   table.addEventListener('click', (e) => {
  //     if (e.target.classList.contains('btn-delete')) {
  //       const id = e.target.getAttribute('data-id');
  //       const gasto = gastos.find((g) => g.id === id);
  //       if (gasto) {
  //         eliminarGasto(gasto); // Llamada a la función eliminarGasto de App.js
  //       }
  //     }
  //   });
  // }, [gastos]);


  // useEffect(() => {
  //   const fetchPresupuesto = async () => {
  //     if (auth.currentUser) {
  //       const userDoc = doc(db, 'presupuestos', auth.currentUser.uid); // Cambiado a 'users'
  //       console.log("UID del usuario:", auth.currentUser.uid); // Asegúrate de que este ID es correcto
  //       const docSnap = await getDoc(userDoc);
  //       if (docSnap.exists()) {
  //         setPresupuesto(docSnap.data().presupuestoInicial || 0); // Cambiado a 'presupuestoinicial'
  //       } else {
  //         console.log("Documento de usuario no encontrado.");
  //       }
  //     }
  //   };
  //   fetchPresupuesto();
  // }, []);

  // const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

  // const handlePresupuestoUpdate = async () => {
  //   try {
  //     const userDocRef = doc(db, 'presupuestos', auth.currentUser.uid); // Cambiado a 'users'
  //     const docSnap = await getDoc(userDocRef);
      
  //     if (docSnap.exists()) {
  //       await updateDoc(userDocRef, { presupuestoInicial: Presupuesto }); // Cambiado a 'presupuestoinicial'
  //       setEditingPresupuesto(false);
  //     } else {
  //       console.error("No se encontró el documento para actualizar.");
  //     }
  //   } catch (error) {
  //     console.error('Error al actualizar el presupuesto:', error);
  //   }
  // };


  return (
    <div className="p-4">
      
      {/* <div className="flex space-x-4 mb-4">
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

        <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
          <h3 className="text-lg font-semibold">Total Gastado</h3>
          <p className="text-2xl">${totalGastos}</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 w-1/3">
          <h3 className="text-lg font-semibold">Saldo Disponible</h3>
          <p className="text-2xl">${Presupuesto - totalGastos}</p>
        </div>
      </div> */}
      {/* <div>
        <label>Filtrar por Categoría:</label>
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Comida">Comida</option>
          <option value="Transporte">Transporte</option>
          <option value="Entretenimiento">Entretenimiento</option>
          <option value="Otros">Otros</option>
        </select>
      </div> */}
      {gastos.length === 0 ? (
        <p>No hay gastos en esta categoría.</p>
      ) : (
        <div className="p-6 bg-white shadow-md rounded-lg">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        className="min-w-full text-sm"
        noHeader={false}
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página',
          rangeSeparatorText: 'de',
        }}
      />
    </div>
      )}
    </div>
  );
}

export default ListaGastos;
