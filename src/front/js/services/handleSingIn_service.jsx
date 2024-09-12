import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3, // Número de reintentos
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Retardo entre reintentos (en milisegundos)
  },
  retryCondition: (error) => {
    return error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND'; // Condiciones para reintentar
  }
});

const handleSignIn = async (username, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:3001/api/login', {
      username,
      password
    });
    // Manejar la respuesta de la API
    if (response.status === 200) {
      // Autenticación exitosa
      const userData = response.data.staff;
      console.log(userData)
      return { success: true, data: { userData } };
    } else {
      // Autenticación fallida
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return { success: false, message: 'Error al iniciar sesión' };
  }
};

export default handleSignIn;