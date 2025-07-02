import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyListings() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const allListings = JSON.parse(localStorage.getItem("properties")) || [];
    const userListings = allListings.filter(
      (prop) => prop.owner === currentUser?.email
    );
    setListings(userListings);
  }, [currentUser?.email]);

  const handleDelete = (id) => {
    const allListings = JSON.parse(localStorage.getItem("properties")) || [];
    const updatedListings = allListings.filter(
      (prop) => !(prop.owner === currentUser?.email && prop.id === id)
    );

    localStorage.setItem("properties", JSON.stringify(updatedListings));

    // update UI state
    const updatedUserListings = updatedListings.filter(
      (prop) => prop.owner === currentUser?.email
    );
    setListings(updatedUserListings);
  };

  if (!currentUser) {
    return <p>Please log in to view your listings.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📄 My Listings</h2>
      {listings.length === 0 ? (
        <p>No listings found. Add some!</p>
      ) : (
        listings.map((property, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 rounded mb-4 max-w-md"
          >
            <img
              src={
                property.image?.startsWith("http")
                  ? property.image
                  : "https://placehold.co/300x200?text=No+Image"
              }
              alt="Property"
              className="w-full h-48 object-cover mb-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x200?text=No+Image";
              }}
            />
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p>Location: {property.location}</p>
            <p>₹{property.price}/night</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleDelete(property.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                🗑 Delete
              </button>
              <Link
                to={`/edit/${property.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                ✏️ Edit
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
