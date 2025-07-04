// src/pages/Booking.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📝 Book Property</h1>

      <div className="mb-4">
        <label className="block font-semibold">Check-in Date:</label>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          className="border px-2 py-1 w-full"
          placeholderText="Select check-in"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Check-out Date:</label>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          className="border px-2 py-1 w-full"
          placeholderText="Select check-out"
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Book Now
      </button>
    </div>
  );
};

export default Booking;
