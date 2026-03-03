import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value,});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await login(formData);
            alert("Login successful");
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
            setError("Invalid credentials");
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form 
            onSubmit={handleSubmit} 
            className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Yapwork</h2>
                {error && (
                    <div className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</div>
                )}

                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    className="w-full p-2 mb-4 border rounded" 
                    onChange={handleChange} 
                    required 
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded"
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}