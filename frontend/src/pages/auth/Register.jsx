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
            alert("Registration successful. Please log in.");
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
        <div className="min-h-screen flex items-center justify-center"> {/*  bg-blue-100 */}

            <img 
                src="/src/assets/background/bg-blue.jpg" 
                className="fixed place-self-stretch inset-0 -z-10"
            />

            <div className="fixed inset-0 bg-black/30 -z-10" />
            
            <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register to Yapwork</h2>
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
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            
        </div>
    );
};