import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './AuthContext';

const Protected = ({children}) => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    if(user){
        return navigate('/');
    }
    return children
};

export default Protected;