import React , { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Si estás usando react-router
import { auth } from '../firebase'; // Importa tu configuración de Firebase

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/login'); // Redirige a la página de login después de cerrar sesión
      })
      .catch(error => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  useEffect(() => {
    // Obtener el nombre del usuario desde Firebase
    const user = auth.currentUser;
    if (user && user.displayName) {
      setUserName(user.displayName); // Asignar el nombre del usuario
    }
  }, []); 

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg font-semibold">Control de Gastos</h1>

         <p className="text-white text-lg font-semibold">Bienvenido {userName}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
