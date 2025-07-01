import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("✅ Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        🏡 <span>Airbnb Clone</span>
      </h1>

      <div className="space-x-4 text-blue-700 font-medium">
        <Link to="/my-listings">My Listings</Link>
        <Link to="/">Home</Link>
        <Link to="/add-property">Add Property</Link>
        <Link to="/dashboard">Dashboard</Link>

        {localStorage.getItem("user") ? (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline font-bold"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
