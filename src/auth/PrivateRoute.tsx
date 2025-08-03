import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import type {JSX} from 'react';

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return children;
};

export default PrivateRoute;