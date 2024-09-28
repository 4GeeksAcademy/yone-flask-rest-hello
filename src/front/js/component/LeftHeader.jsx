import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

const LogoutButton = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ejecuta la acción de logout
    actions.logOut();

    // Redirigir al usuario a la página de inicio
    navigate('/');

    // Recargar la página
    window.location.reload();
  };

  const styles = {
    button: {
      backgroundColor: '#00adb5',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
    }
  };

  return (
    <button onClick={handleLogout} style={styles.button}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
