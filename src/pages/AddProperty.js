import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function AddProperty() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !location || !price || !imageFile) {
      alert("Please fill in all fields and choose an image.");
      return;
    }

    setLoading(true);
    const imageUrl = await uploadToCloudinary(imageFile);
    setLoading(false);

    if (!imageUrl) {
      alert("Image upload failed!");
      return;
    }

    const newProperty = {
      title,
      location,
      price,
      image: imageUrl,
      owner: JSON.parse(localStorage.getItem("user"))?.email,
    };

    const existing = JSON.parse(localStorage.getItem("properties")) || [];
    localStorage.setItem("properties", JSON.stringify([...existing, newProperty]));

    setTitle("");
    setLocation("");
    setPrice("");
    setImageFile(null);
    navigate("/my-listings");
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
