import React, { useEffect, useState } from "react";

export default function MyListings() {
  const [myProperties, setMyProperties] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const userProperties = allProperties.filter(
      (p) => p.owner === currentUser?.email
    );
    setMyProperties(userProperties);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updated = myProperties.filter((_, index) => index !== indexToDelete);
    setMyProperties(updated);

    // Also update localStorage
    const all = JSON.parse(localStorage.getItem("properties")) || [];
    const updatedAll = all.filter(
      (p) => !(p.owner === currentUser?.email && myProperties.indexOf(p) === indexToDelete)
    );
    localStorage.setItem("properties", JSON.stringify(updatedAll));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📋 My Listings</h2>
      {myProperties.length === 0 ? (
        <p>No listings found. Add some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myProperties.map((property, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img
                src={property.image || "https://placehold.co/300x200?text=No+Image"}
                alt="Property"
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p>📍 {property.location}</p>
              <p>💰 ₹{property.price}/night</p>

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
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
