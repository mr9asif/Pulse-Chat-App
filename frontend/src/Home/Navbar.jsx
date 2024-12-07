import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/Images/icons8-pulse-32.png';

const Navbar = () => {
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
                <Link  className="btn text-primary" to="/login">
                    Login
                </Link>
                <Link  className="btn text-primary" to="/register">
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
