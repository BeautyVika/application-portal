import React, {useEffect} from 'react';
import './App.css';
import {AppRoutes} from "./Routes/AppRoutes";
import {Header} from "../app/Header/Header";
import {useAppDispatch} from "../store/store";
import {getUser} from "../store/authReducer";
import {InfoSnackBar} from "../components/common/components/InfoSnackbar/InfoSnackbar";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUser())
    }, [])

  return (
      <div>
          <Header/>
          <InfoSnackBar/>
          <AppRoutes/>

      </div>
  )
}

export default App;
