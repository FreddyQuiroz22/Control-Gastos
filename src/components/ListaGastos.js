import React from "react";
// import {doc, getDoc} from "firebase/firestore";
// import { db, auth } from "../firebase"; // Importa la configuración de Firebase



function ListaGastos({ gastos, eliminarGasto, filtroCategoria, setFiltroCategoria, presupuesto }) {

  // const [presupuesto, setPresupuesto] = useState(0);
  // useEffect(() => {
  //   const fetchPresupuesto = async () => {
  //     if (auth.currentUser) {
  //       const userDoc = doc(db, 'usuarios', auth.currentUser.uid);
  //       const docSnap = await getDoc(userDoc);
  //       if (docSnap.exists()) {
  //         setPresupuesto(docSnap.data().presupuesto || 0);
  //       }
  //     }
  //   };
  //   fetchPresupuesto();
  // }, []);

  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

  return (
    <div>
      <h1 className='text-center mb-4 border-b pb-4 text-5xl leading-tight'>Lista de Gastos</h1>
      {/* Mostrar presupuesto, total gastado y saldo disponible */}
      <div className="mb-4">
        <h3>Presupuesto Inicial: ${presupuesto}</h3>
        <h3>Total Gastado: ${totalGastos}</h3>
        <h3>Saldo Disponible: ${presupuesto - totalGastos}</h3>
      </div>
      <div>
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
      </div>
      {gastos.length === 0 ? (
        <p>No hay gastos en esta categoría.</p>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden"></div>
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">Nombre</th>
                    <th scope="col" className="px-6 py-4">Monto</th>
                    <th scope="col" className="px-6 py-4">Categoría</th>
                    <th scope="col" className="px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {gastos.map((gasto) => (
                    <tr key={gasto.id} className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                      <td className=' whitespace-nowrap px-6 py-4'>{gasto.nombre}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{gasto.monto}</td>
                      <td className='whitespace-nowrap px-6 py-4'>{gasto.categoria}</td>
                      <td className='whitespace-nowrap px-6 py-4'>
                        <button
                          type="button"
                          onClick={() => eliminarGasto(gasto)}
                          className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaGastos;
