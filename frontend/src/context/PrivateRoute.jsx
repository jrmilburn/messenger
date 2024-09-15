import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = () => {
    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return <p>Loading...</p>; // Optionally show a loading spinner
    }

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
