import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true);
    const base = import.meta.env.VITE_BASEURL;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${base}/user/getUser`, { withCredentials: true });
                console.log(res)
                setUser(res.data); // Assuming your API returns user data in `res.data`
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null); // Clear user if API fails
                setLoading(false);
            }
        };

        fetchUser();
    }, [base]);

    const info = {
        user,
        setUser,
        loading
    };

    return (
        <UserContext.Provider value={info}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContext;
