import React, { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(saved);
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const matchesSearch =
      prop.title.toLowerCase().includes(search.toLowerCase()) ||
      prop.location.toLowerCase().includes(search.toLowerCase());

    const withinPrice =
      maxPrice === "" || parseInt(prop.price) <= parseInt(maxPrice);

    return matchesSearch && withinPrice;
  });

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">🏡 Airbnb Clone</h2>

      <div className="max-w-md mx-auto space-y-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by title or location"
          className="w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="💰 Max Price (optional)"
          className="w-full p-2 border rounded"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">🏡 Featured Properties</h3>

      {filteredProperties.length === 0 ? (
        <p>No properties match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredProperties.map((property, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded p-4 flex flex-col"
            >
              <img
                src={
                  property.image?.startsWith("http")
                    ? property.image
                    : "https://placehold.co/300x200?text=No+Image"
                }
                alt="Property"
                className="h-48 object-cover mb-2 rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x200?text=No+Image";
                }}
              />
              <h4 className="text-lg font-bold">{property.title}</h4>
              <p>📍 {property.location}</p>
              <p>💸 ₹{property.price}/night</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
