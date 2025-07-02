import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const allListings = JSON.parse(localStorage.getItem("properties")) || [];
    const found = allListings.find((prop) => prop.id === parseInt(id));
    if (found) {
      setProperty(found);
    } else {
      alert("Property not found");
      navigate("/my-listings");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allListings = JSON.parse(localStorage.getItem("properties")) || [];
    const updatedListings = allListings.map((prop) =>
      prop.id === parseInt(id) ? property : prop
    );

    localStorage.setItem("properties", JSON.stringify(updatedListings));
    alert("✅ Property updated successfully!");
    navigate("/my-listings");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={property.title}
          onChange={handleChange}
          placeholder="Property Title"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={property.location}
          onChange={handleChange}
          placeholder="Location"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={property.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          value={property.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ✅ Save Changes
        </button>
      </form>
    </div>
  );
}
