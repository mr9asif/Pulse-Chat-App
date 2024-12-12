import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './AuthContext';

const Privet = ({children}) => {
    const {user} = useContext(UserContext);
    const navigate =useNavigate();
    if(!user){
        return navigate('/login');
    }
    return children;
};

export default Privet;