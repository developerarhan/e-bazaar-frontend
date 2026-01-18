import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(form.email, form.password);
        navigate("/profile");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded mb-3 bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded mb-3 bg-white dark:bg-gray-800 text-black dark:text-white border dark:border-gray-700"
                />

                <button className="w-full bg-black text-white py-2 rounded cursor-pointer">
                    Login
                </button>

                <p className="text-sm mt-4 text-center dark:text-black">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}