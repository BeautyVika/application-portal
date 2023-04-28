import {Route, Routes} from "react-router-dom";
import {Login} from "../components/Login/Login";
import {Registration} from "../components/Registration/Registration";
import {Portal} from "../components/Portal/Portal";
import React from "react";
import {PrivateRoutes} from "../app/PrivateRoutes";
import {Profile} from "../components/Profile/Profile";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Login/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/registration'} element={<Registration/>}/>

            <Route element={<PrivateRoutes/>}>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/portal'} element={<Portal/>}/>
            </Route>
        </Routes>)
}