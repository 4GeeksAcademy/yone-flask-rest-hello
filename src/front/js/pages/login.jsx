import React, { useState, useContext } from 'react';
import HandleSignIn from  "../services/handleSingIn_service.jsx";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/auth_provider';

const Login = () => {
    const navigate = useNavigate();
    const leftClick = () => {
        const container = document.getElementById('container');
        container.classList.remove('right-panel-active');
    };

    const rightClick = () => {
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    };
    const { setUserData, login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSignInClick = () => {
        HandleSignIn(username, password)
            .then(signInResult => {
                if (signInResult.success) {
                    login(signInResult.data.token);
                    setUserData(signInResult.data.userData);

                    navigate('/'); // Usando navigate para redirigir
                } else {
                    // Mostrar mensaje de error al usuario
                    alert(signInResult.message);
                }
            })
            .catch(error => {
                console.error('Error al iniciar sesión:', error);
                // Mostrar mensaje de error al usuario
                alert('Error al iniciar sesión');
            });
    };
    return (
        <>

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        background: #f6f5f7;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        font-family: 'Montserrat', sans-serif;
                        height: 100vh;
                    }

                    h1 {
                        font-weight: bold;
                        margin: 0;
                    }

                    h2 {
                        text-align: center;
                    }

                    p {
                        font-size: 14px;
                        font-weight: 100;
                        line-height: 20px;
                        letter-spacing: 0.5px;
                        margin: 20px 0 30px;
                    }

                    span {
                        font-size: 12px;
                    }

                    a {
                        color: #333;
                        font-size: 14px;
                        text-decoration: none;
                        margin: 15px 0;
                    }

                    button {
                        border-radius: 20px;
                        border: 1px solid #9a66cd;
                        background-color: #9a66cd;
                        color: #FFFFFF;
                        font-size: 12px;
                        font-weight: bold;
                        padding: 12px 45px;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        transition: transform 80ms ease-in;
                    }

                    button:active {
                        transform: scale(0.95);
                    }

                    button:focus {
                        outline: none;
                    }

                    button.ghost {
                        background-color: transparent;
                        border-color: #FFFFFF;
                    }

                    form {
                        background-color: #FFFFFF;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        padding: 0 50px;
                        height: 100%;
                        text-align: center;
                    }

                    input {
                        background-color: #eee;
                        border: none;
                        padding: 12px 15px;
                        margin: 8px 0;
                        width: 100%;
                    }

                    .container {
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 14px 28px rgba(0,0,0,0.25),
                            0 10px 10px rgba(0,0,0,0.22);
                        position: relative;
                        overflow: hidden;
                        width: 768px;
                        max-width: 100%;
                        min-height: 480px;
                    }

                    .form-container {
                        position: absolute;
                        top: 0;
                        height: 100%;
                        transition: all 0.6s ease-in-out;
                    }

                    .sign-in-container {
                        left: 0;
                        width: 50%;
                        z-index: 2;
                    }

                    .container.right-panel-active .sign-in-container {
                        transform: translateX(100%);
                    }

                    .sign-up-container {
                        left: 0;
                        width: 50%;
                        opacity: 0;
                        z-index: 1;
                    }

                    .container.right-panel-active .sign-up-container {
                        transform: translateX(100%);
                        opacity: 1;
                        z-index: 5;
                        animation: show 0.6s;
                    }

                    @keyframes show {
                        0%, 49.99% {
                            opacity: 0;
                            z-index: 1;
                        }

                        50%, 100% {
                            opacity: 1;
                            z-index: 5;
                        }
                    }

                    .overlay-container {
                        position: absolute;
                        top: 0;
                        left: 50%;
                        width: 50%;
                        height: 100%;
                        overflow: hidden;
                        transition: transform 0.6s ease-in-out;
                        z-index: 100;
                    }

                    .container.right-panel-active .overlay-container{
                        transform: translateX(-100%);
                    }

                    .overlay {
                        background: #7B68EE; /* Cambia el color de fondo a morado */
                        background: -webkit-linear-gradient(to right, #483D8B, #8A2BE2); /* Agrega el degradado */
                        background: linear-gradient(to right, #483D8B, #8A2BE2); /* Agrega el degradado */
                        background-repeat: no-repeat;
                        background-size: cover;
                        background-position: 0 0;
                        color: #FFFFFF;
                        position: relative;
                        left: -100%;
                        height: 100%;
                        width: 200%;
                        transform: translateX(0);
                        transition: transform 0.6s ease-in-out;
                    }

                    .container.right-panel-active .overlay {
                        transform: translateX(50%);
                    }

                    .overlay-panel {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        padding: 0 40px;
                        text-align: center;
                        top: 0;
                        height: 100%;
                        width: 50%;
                        transform: translateX(0);
                        transition: transform 0.6s ease-in-out;
                    }

                    .overlay-left {
                        transform: translateX(-20%);
                    }

                    .container.right-panel-active .overlay-left {
                        transform: translateX(0);
                    }

                    .overlay-right {
                        right: 0;
                        transform: translateX(0);
                    }

                    .container.right-panel-active .overlay-right {
                        transform: translateX(20%);
                    }

                    .social-container {
                        margin: 20px 0;
                    }

                    .social-container a {
                        border: 1px solid #DDDDDD;
                        border-radius: 50%;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        margin: 0 5px;
                        height: 40px;
                        width: 40px;
                    }

                    footer {
                        background-color: #222;
                        color: #fff;
                        font-size: 14px;
                        bottom: 0;
                        position: fixed;
                        left: 0;
                        right: 0;
                        text-align: center;
                        z-index: 999;
                    }

                    footer p {
                        margin: 10px 0;
                    }

                    footer i {
                        color: red;
                    }

                    footer a {
                        color: #3c97bf;
                        text-decoration: none;
                    }
                `}
            </style>

            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Ingresar</h1>
                        <span>Escribe tu usuario y contraseña</span>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
                        <p>Olvidaste tu contraseña?</p>
                        <button type='button' onClick={handleSignInClick}>Ingresar</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>¿Quieres ser parte?</h1>
                            <p>Se parte de nuestro gran equipo en Footloose</p>
                            <p>Envia un correo a: correo@gmail.com</p>
                            <button className="ghost" onClick={leftClick}>Volver</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Bienvenido</h1>
                            <p>Escribe tu usuario y contraseña para poder ingresar al administrador de la galeria de footloose</p>
                            <button className="ghost" onClick={rightClick}>Ser parte</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;

