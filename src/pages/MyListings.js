import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyListings() {
  const [properties, setProperties] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    const mine = stored.filter((prop) => prop.owner === currentUser?.email);
    setProperties(mine);
  }, [currentUser]);

  const handleDelete = (indexToDelete) => {
    const stored = JSON.parse(localStorage.getItem("properties")) || [];
    const updated = stored.filter(
      (prop, index) =>
        !(
          prop.owner === currentUser?.email &&
          properties[indexToDelete].title === prop.title
        )
    );

    localStorage.setItem("properties", JSON.stringify(updated));
    const mine = updated.filter((prop) => prop.owner === currentUser?.email);
    setProperties(mine);
    alert("🗑️ Property deleted!");
  };

  const handleEdit = (index) => {
    navigate(`/edit/${index}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        📋 My Listings
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-600">
          No listings found. Add some!
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div key={index} className="bg-white shadow-md rounded p-4">
              <img
                src={
                  property.image || "https://placehold.co/300x200?text=No+Image"
                }
                alt="Property"
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
              <p className="text-gray-600">📍 {property.location}</p>
              <p className="text-gray-800 font-medium">₹{property.price}/night</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
