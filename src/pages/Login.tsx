import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginRequest, LoginResponse } from "../types/auth.ts";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { API_BASE } from "../config.ts";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: LoginRequest = { email, password };

    try {
      const response = await fetch(`${API_BASE}/api/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Login failed: " + (errorData.message || "Unknown error"));
        return;
      }

      const data: LoginResponse = await response.json();

      login(data.token);
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080112] to-[#0e0121] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="relative bg-white/10 backdrop-blur-lg border border-white/10 text-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      >
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
        <h2 className="text-3xl font-bold mb-6 text-center relative z-10">
          Log In
        </h2>

        {error && (
          <p className="mb-4 text-red-400 text-sm text-center relative z-10">
            {error}
          </p>
        )}

        <div className="mb-4 relative z-10">
          <label className="block mb-1 text-sm text-gray-300 font-medium">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/20 rounded px-3 py-2 bg-white/10 backdrop-blur-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        <div className="mb-6 relative z-10">
          <label className="block mb-1 text-sm text-gray-300 font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/20 rounded px-3 py-2 bg-white/10 backdrop-blur-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition relative z-10"
        >
          Log In
        </button>

        <p className="mt-4 text-sm text-center text-gray-300 relative z-10">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
