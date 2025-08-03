import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { ErrorResponse, RegisterRequest } from "../types/auth";
import { API_BASE } from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<RegisterRequest>>({});
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const errors: Partial<RegisterRequest> = {};
    if (form.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }
    if (form.lastName.trim().length < 3) {
      errors.lastName = "Last Name must be at least 3 characters long.";
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) {
      errors.email = "Email is not valid.";
    }
    const password = form.password;
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/\d/.test(password)) {
      errors.password = "Password must contain at least one number.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    try {
      const response = await fetch(`${API_BASE}/api/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.status === 201) {
        toast.success("Account created successfully 🎉");
        navigate("/");
      } else {
        const errorData: ErrorResponse = await response.json();
        setError(errorData.message || "An error occurred during registration.");
        toast.error(errorData.message || "Could not create account.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An unexpected error occurred. Please try again later.");
      toast.error("Unexpected error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#080112] to-[#0e0121] flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="relative bg-white/10 backdrop-blur-lg border border-white/10 text-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      >
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none"></div>
        <h2 className="text-3xl font-bold mb-6 text-center relative z-10">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center relative z-10">
            {error}
          </p>
        )}

        <div className="mb-4 relative z-10">
          <label className="block mb-1 text-sm text-gray-300 font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-white/20 rounded px-3 py-2 bg-white/10 backdrop-blur-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          {formErrors.name && (
            <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        <div className="mb-4 relative z-10">
          <label className="block mb-1 text-sm text-gray-300 font-medium">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border border-white/20 rounded px-3 py-2 bg-white/10 backdrop-blur-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          {formErrors.lastName && (
            <p className="text-red-400 text-sm mt-1">{formErrors.lastName}</p>
          )}
        </div>

        <div className="mb-4 relative z-10">
          <label className="block mb-1 text-sm text-gray-300 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-white/20 rounded px-3 py-2 bg-white/10 backdrop-blur-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          {formErrors.email && (
            <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-6 relative z-10">
          <label className="block mb-1 text-sm text-gray-300 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-white/20 rounded px-3 py-2 bg-white/10 backdrop-blur-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          {formErrors.password && (
            <p className="text-red-400 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition relative z-10"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
