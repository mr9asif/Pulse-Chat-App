import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const base = import.meta.env.VITE_BASEURL;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${base}/user/getUser`, { withCredentials: true });
                setUser(res.data); // Assuming your API returns user data in `res.data`
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null); // Clear user if API fails
            }
        };

        fetchUser();
    }, [base]);

    const info = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={info}>
            {children}
        </UserContext.Provider>
    );
};

export default AuthContext;
