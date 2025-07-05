import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("properties")) || [];
    setProperty(all[id]);
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("properties")) || [];

    let imageUrl = property.image;
    if (imageFile) {
      const uploaded = await uploadToCloudinary(imageFile);
      if (uploaded) imageUrl = uploaded;
    }

    const updated = {
      ...property,
      image: imageUrl,
    };

    all[id] = updated;
    localStorage.setItem("properties", JSON.stringify(all));
    alert("✅ Property updated!");
    navigate("/my-listings");
  };

  if (!property) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={property.title}
          onChange={(e) => setProperty({ ...property, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={property.location}
          onChange={(e) => setProperty({ ...property, location: e.target.value })}
          placeholder="Location"
        />
        <input
          type="number"
          value={property.price}
          onChange={(e) => setProperty({ ...property, price: e.target.value })}
          placeholder="Price"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
