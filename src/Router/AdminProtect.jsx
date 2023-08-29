import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Components/Dashboard/hooks/useAdmin';
import { BallTriangle } from 'react-loader-spinner';
import Loader from '../Components/Dashboard/hooks/Loader';

// eslint-disable-next-line react/prop-types
const AdminProtect = ({children}) => {
    const {user, loader} = useContext(UserContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const location = useLocation();
    if(loader|| isAdminLoading){
        return <Loader/>
    }
    if(user && isAdmin){
        return children;
    }
return <Navigate to='/login' state={{from:location}} replace />
};

export default AdminProtect;