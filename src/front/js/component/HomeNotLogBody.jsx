import React from "react";
import NewLoginButton from './NewLoginButton'; // Asegúrate de que la ruta sea correcta
import NewPostButton from "./NewPostButton";

export const HomeNotLogBody = () => {
    return (
        <div className="container-fluid d-flex flex-column justify-content-center my-auto" style={{minHeight: '87dvh'}}>
            <div className="container-fluid text-center mb-5">
                <h1 style={{fontFamily: 'Montserrat', fontWeight: 'bold' ,fontSize:'4em', color:'white'}}>Unete</h1>
            </div>
            <div className="container text-center">
                <NewLoginButton/>
                <NewPostButton/>
            </div>
        </div>
    );
}; 