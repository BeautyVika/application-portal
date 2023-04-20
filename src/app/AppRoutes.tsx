import {Route, Routes} from "react-router-dom";
import {Login} from "../components/Login/Login";
import {Registration} from "../components/Registration/Registration";
import {Portal} from "../components/Portal/Portal";
import React from "react";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<div>Hello</div>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/registration'} element={<Registration/>}/>
            <Route path={'/portal'} element={<Portal/>}/>
        </Routes>)
}