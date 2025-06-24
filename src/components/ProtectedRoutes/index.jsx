import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
    const isAuthenticated = localStorage.getItem("token")


    return isAuthenticated ?
        <div>
            <Outlet />
        </div>
        : <Navigate to="/login" />
}

export default ProtectedRoutes;