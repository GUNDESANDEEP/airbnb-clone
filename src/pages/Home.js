import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(allProperties);
  }, []);

  const handleBooking = (property) => {
    if (!currentUser) {
      alert("❌ Please log in to book!");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("❌ Please select check-in and check-out dates.");
      return;
    }

    const booking = {
      ...property,
      user: currentUser.email,
      checkIn: checkIn.toDateString(),
      checkOut: checkOut.toDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));
    alert("✅ Booking successful!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🏡 Featured Properties</h2>
      <div className="mb-4 space-x-4">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          placeholderText="Check-in"
          className="border p-2"
        />
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          placeholderText="Check-out"
          className="border p-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property, index) => (
          <div key={index} className="border p-4 shadow rounded">
            <img
              src={property.image || "https://placehold.co/300x200?text=No+Image"}
              alt="Property"
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="text-xl font-bold">{property.title}</h3>
            <p>📍 {property.location}</p>
            <p>💰 ₹{property.price}/night</p>
            <button
              onClick={() => handleBooking(property)}
              className="bg-green-600 text-white mt-2 px-4 py-2 rounded hover:bg-green-700"
            >
              ✅ Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
