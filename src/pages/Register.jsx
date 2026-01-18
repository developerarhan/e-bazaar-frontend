import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(form);
        navigate("/profile");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
        >
            <h2 className="text-2xl font-bold mb-4 dark:text-black">Register</h2>

            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                className="w-full p-2 rounded mb-3 bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="w-full p-2 rounded mb-3 bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full p-2 rounded mb-3 bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
            />

            <button className="w-full bg-black text-white py-2 rounded cursor-pointer">
                Register
            </button>

            <p className="text-sm mt-4 text-center dark:text-black">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600">
                    Login
                </Link>
            </p>
        </form>
    </div>
  );
}