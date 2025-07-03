import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleAdd = (e) => {
    e.preventDefault();

    const newProperty = {
      title,
      location,
      price,
      image,
      owner: currentUser?.email,
    };

    const existing = JSON.parse(localStorage.getItem("properties")) || [];
    existing.push(newProperty);
    localStorage.setItem("properties", JSON.stringify(existing));

    alert("✅ Property added!");
    navigate("/my-listings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          🏡 Add Property
        </h2>

        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="number"
          placeholder="Price per night"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}
