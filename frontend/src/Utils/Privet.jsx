import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from './AuthContext';

const Privet = ({ children }) => {
    const { user , loading} = useContext(UserContext);
if(loading){
    return <div>Loading..</div>
}
    if (!user) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/login" replace />;
    }

    return children; // Render children if user exists
};

export default Privet;
