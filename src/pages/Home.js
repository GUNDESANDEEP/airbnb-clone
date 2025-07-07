import React, { useEffect, useState } from "react";
import Loader from "../components/Loader"; // 🌀 Spinner component
import { Link } from "react-router-dom";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // 🔄 Loading state

  useEffect(() => {
    // 🕒 Simulate loading
    setTimeout(() => {
      const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
      setProperties(allProperties);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🏡 Featured Properties</h2>

      {loading ? (
        <Loader />
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((property, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow flex flex-col justify-between"
            >
              <img
                src={property.image || "https://placehold.co/300x200?text=No+Image"}
                alt={property.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-bold">{property.title}</h3>
              <p>📍 {property.location}</p>
              <p>💰 ₹{property.price}/night</p>
              <Link
                to={`/book/${index}`}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-center"
              >
                ✅ Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
