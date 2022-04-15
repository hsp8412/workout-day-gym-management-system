import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const ProtectedRoute = ({path, component: Component}) => {
    const manager = localStorage.getItem("manager_token");
    return manager ? <Outlet/> : <Navigate to="/not_found"/>;
};

export default ProtectedRoute;