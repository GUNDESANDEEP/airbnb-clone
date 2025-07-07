import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyListings() {
  const [myListings, setMyListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const filtered = allProperties.filter(
      (prop) => prop.owner === user?.email
    );
    setMyListings(filtered);
  }, []);

  const handleDelete = (index) => {
    const updatedListings = [...myListings];
    updatedListings.splice(index, 1);

    setMyListings(updatedListings);

    // Also remove from localStorage
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedAll = allProperties.filter(
      (prop) =>
        !(
          prop.owner === user?.email &&
          prop.title === myListings[index].title &&
          prop.location === myListings[index].location
        )
    );
    localStorage.setItem("properties", JSON.stringify(updatedAll));
  };

  const handleEdit = (property) => {
    navigate("/edit-property", { state: property });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📋 My Listings</h2>

      {myListings.length === 0 ? (
        <p>No listings yet. Go add a property!</p>
      ) : (
        <div className="grid gap-4">
          {myListings.map((property, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p>📍 {property.location}</p>
              <p>💰 ₹{property.price}/night</p>

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(property)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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
