import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = allBookings.filter(
      (booking) => booking.user === currentUser?.email
    );
    setBookings(userBookings);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📖 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-md bg-white"
            >
              <img
                src={booking.image || "https://placehold.co/300x200?text=No+Image"}
                alt={booking.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-bold">{booking.title}</h3>
              <p>📍 {booking.location}</p>
              <p>💰 ₹{booking.price}/night</p>
              <p>📅 From: {booking.checkIn}</p>
              <p>📅 To: {booking.checkOut}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
