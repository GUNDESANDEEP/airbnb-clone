import React, { useEffect, useState } from "react";

function MyListings() {
  const [myProperties, setMyProperties] = useState([]);

  // Load listings from localStorage
  useEffect(() => {
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (currentUser) {
      const userProperties = allProperties.filter(
        (prop) => prop.owner === currentUser.email
      );
      setMyProperties(userProperties);
    }
  }, []);

  // Handle Delete
  const handleDelete = (indexToDelete) => {
    const updated = [...myProperties];
    updated.splice(indexToDelete, 1);
    setMyProperties(updated);

    const currentUser = JSON.parse(localStorage.getItem("user"));
    let all = JSON.parse(localStorage.getItem("properties")) || [];
    all = all.filter(
      (p) =>
        !(p.owner === currentUser.email && p.title === myProperties[indexToDelete].title)
    );
    localStorage.setItem("properties", JSON.stringify(all));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🧳 My Listings</h2>

      {myProperties.length === 0 ? (
        <p>No listings yet. Add one from "Add Property".</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {myProperties.map((property, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-md bg-white relative"
            >
              <img
                src={property.image || "https://placehold.co/300x200?text=No+Image"}
                alt="Property"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-bold">{property.title}</h3>
              <p>Location: {property.location}</p>
              <p>₹{property.price}/night</p>
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
