import React, {useEffect} from 'react';
import './App.css';
import {AppRoutes} from "./Routes/AppRoutes";
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
          <Header/>
          <AppRoutes/>
      </div>
  )
}

export default App;
