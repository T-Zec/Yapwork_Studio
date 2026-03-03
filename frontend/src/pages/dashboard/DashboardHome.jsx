import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <h2 className="text-2xl font-bold">Welcome, {user?.username}</h2>

      <div className="space-x-4">
        <Link
          to="/login/"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Login
        </Link>

        <Link
          to="/register/"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Go Register
        </Link>

        <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </div>
  );
}