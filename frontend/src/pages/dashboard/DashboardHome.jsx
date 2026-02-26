import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="space-x-4">
        <Link
          to="/"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Login
        </Link>

        <Link
          to="/register"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Go Register
        </Link>
      </div>
    </div>
  );
}