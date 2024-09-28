import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { HomeReg } from "./pages/homeReg.jsx";
import injectContext from "./store/appContext";
import PrivateRoute from  "./component/Private_route/PrivateRoute.jsx";

import { Navbar } from "./component/navbar";
import { Dashboard } from "./pages/Dashboard.jsx";

//create your first component
const Layout = () => {

    // const { isLoggedIn } = useContext(AuthContext);

    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                <PrivateRoute><Navbar /></PrivateRoute>
                    <Routes>
                        <Route element={<HomeReg />} path="/" />
                        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>} path="/dashboard"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
