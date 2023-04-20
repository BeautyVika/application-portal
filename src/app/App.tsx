import React from 'react';
import './App.css';
import {NavLink} from "react-router-dom";
import {AppRoutes} from "../app/AppRoutes";

function App() {
  return (
      <div>
          <NavLink style={{marginRight: "8px"}} to={'./login'}>LoginPage</NavLink>
          <NavLink style={{marginRight: "8px"}} to={'./registration'}>RegistrationPage</NavLink>
          <NavLink style={{marginRight: "8px"}} to={'./portal'}>PortalPage</NavLink>
          <AppRoutes/>
      </div>
  )
}

export default App;
