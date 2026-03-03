import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        password2: ""
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value,});
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await register(form);
            alert("Registration successful. Please login.");
            navigate("/login");
        } catch (err) {
            setError("Invalid credentials");
            alert("Registration failed");
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register to Yapwork</h2>
                {error && (
                    <div className="bg-red-100 text-red-600 p-2 mb-4 rouded">{error}</div>
                )}

                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    className="w-full p-2 mb-4 border rounded" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username"
                    className="w-full p-2 mb-4 border rounded"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="password" 
                    name="password2" 
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                    value={form.password2}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};