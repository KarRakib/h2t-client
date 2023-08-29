import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';
import Loader from '../Components/Dashboard/hooks/Loader';

// eslint-disable-next-line react/prop-types
const ProtectRouter = ({children}) => {
    const {user,loader}= useContext(UserContext)
    console.log('ProtectRouter', user);
    const location = useLocation();
    if(loader){
        return <Loader/>
    }
    if(user){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace:true />
};

export default ProtectRouter;