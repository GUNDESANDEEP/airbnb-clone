// src/pages/MyBookings.js
import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = allBookings.filter(
      (booking) => booking.email === currentUser?.email
    );
    setBookings(userBookings);
  }, [currentUser?.email]);

  if (!currentUser) {
    return <p>Please log in to view your bookings.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📄 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet. Go book a property!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {bookings.map((booking, index) => (
            <div key={index} className="border p-4 rounded shadow-md">
              <img
                src={booking.image}
                alt="Booked Property"
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{booking.title}</h3>
              <p>📍 {booking.location}</p>
              <p>📅 Date: {booking.date}</p>
              <p>💰 ₹{booking.price}/night</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
