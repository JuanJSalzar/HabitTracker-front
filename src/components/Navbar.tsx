import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Navbar = () => {
    const {isAuthenticated, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav
            className="bg-gradient-to-br from-[#080112] to-[#080112] text-white px-6 py-3 flex justify-between items-center">
            <h1 className="text-lg font-bold">Habit Tracker</h1>

            <div className="space-x-4">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className="hover:underline">Profile</Link>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                        <button onClick={handleLogout} className="hover:underline">Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/" className="hover:underline">Log In</Link>
                        <Link to="/register" className="hover:underline">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;