import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';
import { collection, addDoc, query, where, onSnapshot, doc, deleteDoc, getDoc} from 'firebase/firestore';
import Navbar from './components/Navbar';
import AgregarGasto from './components/AgregarGastos';
import ListaGastos from './components/ListaGastos';
import Register from './components/Register';
import Login from './components/Login';
import PresupuestoConfig from './components/PresupuestoConfig';
import WelcomeModal from './components/WelcomeModal'; // Asegúrate de importar el modal
import Widgets from './components/Widgets';

function App() {
  const [gastos, setGastos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [user, setUser] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); // Estado para mostrar el modal de bienvenida
  const [presupuestoInicial, setPresupuestoInicial] = useState(null); // Estado para el presupuesto inicial

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const q = query(
          collection(db, 'gastos'),
          where('userId', '==', user.uid)
        );
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const gastosArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setGastos(gastosArray);
        });

        // Verificamos si el usuario tiene un presupuesto inicial guardado en la colección 'presupuestos'
      const checkPresupuesto = async () => {
        const presupuestoDoc = await getDoc(doc(db, 'presupuestos', user.uid));
        if (presupuestoDoc.exists() && presupuestoDoc.data().presupuestoInicial) {
          setPresupuestoInicial(presupuestoDoc.data().presupuestoInicial);
        } else {
          setShowWelcomeModal(true); // Mostrar modal si no tiene presupuesto
        }
      };

      checkPresupuesto();

    
        return () => unsubscribeSnapshot();
      } else {
        setGastos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePresupuestoSubmit = (presupuesto) => {
    setPresupuestoInicial(presupuesto); // Actualiza el estado con el presupuesto inicial
    setShowWelcomeModal(false); // Cierra el modal
  };
  



  const agregarGastoFirestore = async (gasto) => {
    if (!user) return;
    try {
      const gastosRef = collection(db, 'gastos');
      const docRef = await addDoc(gastosRef, { ...gasto, userId: user.uid });
      const nuevoGastoConId = { id: docRef.id, ...gasto };
      setGastos([...gastos, nuevoGastoConId]);
    } catch (error) {
      console.error('Error al agregar el gasto a Firestore:', error.message);
    }
  };

  const eliminarGasto = async (gasto) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'gastos', gasto.id));
      await addDoc(collection(db, 'gastosEliminados'), gasto);
      setGastos(gastos.filter((g) => g.id !== gasto.id));
    } catch (error) {
      console.error('Error al eliminar el gasto:', error);
    }
  };

  const gastosFiltrados =
    filtroCategoria === 'Todos'
      ? gastos
      : gastos.filter((gasto) => gasto.categoria === filtroCategoria);

  return (
    <div className="App">
      <Routes>
        {user ? (
          <>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  {showWelcomeModal && (
                    <WelcomeModal 
                    onClose={() => setShowWelcomeModal(false)} // Función para cerrar el modal
                    onSubmit={handlePresupuestoSubmit} // Función para guardar el presupuesto
                  />
                  )}
                  <Widgets gastos={gastosFiltrados}/>  
                  <AgregarGasto agregarGasto={agregarGastoFirestore} />
                  <ListaGastos
                    gastos={gastosFiltrados}
                    eliminarGasto={eliminarGasto}
                    filtroCategoria={filtroCategoria}
                    setFiltroCategoria={setFiltroCategoria}
                    presupuesto={presupuestoInicial}
                  />
                </>
              }
            />
            <Route path="/configurar-presupuesto" element={<PresupuestoConfig />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
