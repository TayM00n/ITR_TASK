import React from 'react';
import {useRoutes} from "./routes";
import {BrowserRouter} from 'react-router-dom';
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {HeaderComponent} from "./pages/layout/HeaderComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Loader} from "./pages/layout/Loader";

function App() {
    const {token, login, logout, userId, ready} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if(!ready){
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <BrowserRouter>
                {isAuthenticated && <HeaderComponent/>}
                <div className='container-fluid d-flex vh-100' style={{marginTop: '5rem'}}>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
