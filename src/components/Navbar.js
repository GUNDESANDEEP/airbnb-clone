import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        🏡 Airbnb Clone
      </h1>
      <div className="flex items-center gap-4 text-purple-800">
        <Link to="/my-listings">My Listings</Link>
        <Link to="/">Home</Link>
        <Link to="/add-property">Add Property</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
