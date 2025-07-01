import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProperty() {
  const navigate = useNavigate();
  const { index } = useParams();
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("properties")) || [];
    const propertyToEdit = all[index];
    if (propertyToEdit) {
      setForm(propertyToEdit);
    }
  }, [index]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("properties")) || [];
    all[index] = { ...form };
    localStorage.setItem("properties", JSON.stringify(all));
    alert("✅ Property updated!");
    navigate("/my-listings");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Property</h2>
      <form onSubmit={handleSubmit} className="space-x-2">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Property Title"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price per night"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProperty;
