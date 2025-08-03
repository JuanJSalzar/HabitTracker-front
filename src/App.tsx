import './App.css'
import {Routes, Route} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Navbar from "./components/Navbar.tsx";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <div className="min-h-screen flex flex-col h-screen">
            <Navbar/>
            <Toaster position="top-right"/>
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile/>
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
            <footer className="text-center py-4 text-sm text-white bg-gradient-to-br from-[#080112] to-[#0e0121]">
                © 2025 Habit Tracker App
            </footer>
        </div>
    );
}

export default App;

