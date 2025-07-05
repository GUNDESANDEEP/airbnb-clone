import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function AddProperty() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !location || !price || !imageFile) {
      alert("Please fill in all fields and choose an image.");
      return;
    }

    // ✅ Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(selectedImage);
    if (!imageUrl) {
      alert("Image upload failed!");
      return;
    }

    // 📦 Build property object
    const newProperty = {
      title,
      location,
      price,
      image: imageUrl,
      owner: JSON.parse(localStorage.getItem("user"))?.email,
    };

    const existing = JSON.parse(localStorage.getItem("properties")) || [];
    localStorage.setItem("properties", JSON.stringify([...existing, newProperty]));

    // ✅ Clear form and redirect
    setTitle("");
    setLocation("");
    setPrice("");
    setImageFile(null);
    navigate("/my-listings");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price per night"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
