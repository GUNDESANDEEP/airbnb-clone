import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    const property = properties[id];

    if (property) {
      setTitle(property.title);
      setLocation(property.location);
      setPrice(property.price);
      setImage(property.image);
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    properties[id] = {
      ...properties[id],
      title,
      location,
      price,
      image,
    };

    localStorage.setItem("properties", JSON.stringify(properties));
    alert("✅ Property updated!");
    navigate("/my-listings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-yellow-600 text-center">
          ✏️ Edit Property
        </h2>

        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="number"
          placeholder="Price per night"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
