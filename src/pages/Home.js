import React, { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(all);
    setFiltered(all);
  }, []);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    setSearch(text);

    const filteredProps = properties.filter((prop) =>
      prop.location.toLowerCase().includes(text)
    );
    setFiltered(filteredProps);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🏠 Airbnb Clone
      </h2>

      {/* 🔍 Search Bar */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by location (e.g. Goa, Hyderabad)"
          className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 🏡 Property Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">No properties found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((property, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={
                  property.image ||
                  "https://placehold.co/300x200?text=No+Image"
                }
                alt="Property"
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="text-xl font-semibold">{property.title}</h3>
              <p className="text-gray-600">📍 {property.location}</p>
              <p className="text-gray-800 font-medium">
                ₹{property.price}/night
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
