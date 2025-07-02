import React, { useEffect, useState } from "react";

export default function MyListings() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [listings, setListings] = useState([]);

  // ✅ Load only listings that belong to the logged-in user's email (owner)
  useEffect(() => {
    const allListings = JSON.parse(localStorage.getItem("properties")) || [];
    const userListings = allListings.filter(
      (prop) => prop.owner === currentUser?.email
    );
    setListings(userListings);
  }, [currentUser?.email]);

  // ✅ Delete selected listing
  const handleDelete = (index) => {
    const allListings = JSON.parse(localStorage.getItem("properties")) || [];
    const updated = allListings.filter(
      (prop) =>
        !(
          prop.owner === currentUser?.email &&
          prop.title === listings[index].title
        )
    );

    localStorage.setItem("properties", JSON.stringify(updated));

    // update only this user's listings
    const updatedUserListings = updated.filter(
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
            <button
              onClick={() => handleDelete(index)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
