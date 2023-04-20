import { Navigate, Outlet } from 'react-router-dom'
import {AppUseSelector} from "../store/store";

export const PrivateRoutes = () => {
    const isLoggedIn = AppUseSelector(state => state.auth.isLoggedIn)

    return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />
}
