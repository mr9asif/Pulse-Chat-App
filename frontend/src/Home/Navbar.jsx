import axios from 'axios';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Images/icons8-pulse-32.png';
import { UserContext } from '../Utils/AuthContext';

const Navbar = () => {
     const {user, setUser} = useContext(UserContext);
     const navigate = useNavigate();
    
    console.log(user?.image)
      
     const base = import.meta.env.VITE_BASEURL;
     const handleLogout = async () => {
        try {
            const res = await axios.post(`${base}/user/logout`, {}, { withCredentials: true });
            if (res.status === 200) {
                setUser(null);
                toast.success("Logout Successfully");

                navigate('/login');
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("An error occurred during logout.");
        }
    };
  
    return (
        <nav className="h-24 fixed w-full z-30 bg-blue-950 shadow-md mb-5 flex px-5 justify-between items-center opacity-95">
            {/* Logo Section */}
            <div className="flex items-center justify-center gap-4 cursor-pointer hover:scale-105 hover:animate-pulse">
                <img width={60} className="" src={logo} alt="logo" />
                <h1 className="text-[#ED0049] text-3xl font-bold">Pulse</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex justify-center items-center gap-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `btn ${isActive ? 'text-blue-400 font-bold ' : 'text-primary'}`
                    }
                >
                    Home
                </NavLink>
               {
                user &&  <NavLink
                to="/messages"
                className={({ isActive }) =>
                    `btn ${isActive ? 'text-secondary font-bold' : 'text-primary'}`
                }
            >
                Messages
            </NavLink>
               }
                <NavLink
                    to="/features"
                    className={({ isActive }) =>
                        `btn ${isActive ? 'text-secondary font-bold' : 'text-primary'}`
                    }
                >
                    Features
                </NavLink>
                <NavLink
                    to="/feedback"
                    className={({ isActive }) =>
                        `btn ${isActive ? 'text-secondary font-bold' : 'text-primary'}`
                    }
                >
                    Feedback
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `btn ${isActive ? 'text-secondary font-bold' : 'text-primary'}`
                    }
                >
                    About
                </NavLink>
            </div>

            {/* Login and Register Links */}
            <div className="flex items-center justify-center gap-4">
            {
             
                    user ? (<>
                         <img className='rounded-[50%] w-[50px] h-[50px]' src={user?.user?.image || user?.image} alt="" />
                        <Link onClick={handleLogout} className="btn text-primary" to="/login">LogOut</Link>
                        </>) : (
                        <>
                            <Link className="btn text-primary" to="/login">Login</Link>
                            <Link className="btn text-primary" to="/register">Register</Link>
                        </>
                    )
                 
            }
            
            </div>
        </nav>
    );
};

export default Navbar;
