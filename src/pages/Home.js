import { useEffect, useState } from "react";

export default function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(saved);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🏡 Featured Properties</h2>
      {properties.length === 0 ? (
        <p>No properties found. Add some!</p>
      ) : (
        <div className="grid gap-4">
          {properties.map((property, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-md bg-white"
            >
              <img
                src={property.image || "https://via.placeholder.com/300"}
                alt="Property"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-bold">{property.title}</h3>
              <p>Location: {property.location}</p>
              <p>₹{property.price}/night</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
