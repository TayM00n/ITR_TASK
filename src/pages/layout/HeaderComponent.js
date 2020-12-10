import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import logo from "./logo.png";

export const HeaderComponent = ()=>{
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = (e) =>{
        e.preventDefault();
        auth.logout();
        history.push('/');
    };

    return(
      <nav className="navbar navbar-expand-sm navbar-light bg-light border-bottom fixed fixed-top">
          <a className="navbar-brand" href="/">
              <img src={logo} width="100" height="30"
                   className="d-inline-block align-top img-fluid" alt=""/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto h-100">
                  <li className="nav-item mx-3 h-100">
                      <NavLink to="/create" className='nav-link'>Create</NavLink>
                  </li>
                  <li className="nav-item mx-3">
                      <NavLink to="/links" className='nav-link'>Links</NavLink>
                  </li>
                  <li className="nav-item mx-3">
                      <a href="/" className='nav-link btn btn-outline-info' onClick={logoutHandler}>Logout</a>
                  </li>
              </ul>
          </div>
      </nav>
  );
};