import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { HomeNotLogBody } from "../component/HomeNotLogBody.jsx";
import { HomeNotLogHeader } from "../component/HomeNotLogHeader.jsx";
import background from "../../img/fondo.jpg";

export const HomeReg = () => {

    // useEffect(() => {
    //     actions.getReviews();
    //     actions.getUsers();
    // }, []);

    return (
        <section>
            <div className="container-fluid bg-img-home" style={{ backgroundImage: `url(${background})` }}>
                <div className="container-fluid d-flex my-auto" style={{ zIndex: '2' }}>
                    <HomeNotLogBody />
                </div>
            </div>
        </section>
        
    );
};