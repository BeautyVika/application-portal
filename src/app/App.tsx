import React, {useEffect} from 'react';
import './App.css';
import {NavLink} from "react-router-dom";
import {AppRoutes} from "../app/AppRoutes";
import {Header} from "../app/Header/Header";
import {useAppDispatch} from "../store/store";
import {getUser} from "../store/authReducer";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getUser())
    }, [])

  return (
      <div>
          <NavLink style={{marginRight: "8px"}} to={'./login'}>LoginPage</NavLink>
          <NavLink style={{marginRight: "8px"}} to={'./registration'}>RegistrationPage</NavLink>
          <NavLink style={{marginRight: "8px"}} to={'./portal'}>PortalPage</NavLink>
          <Header/>
          <AppRoutes/>
      </div>
  )
}

export default App;
