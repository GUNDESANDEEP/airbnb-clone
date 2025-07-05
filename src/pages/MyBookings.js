import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Show only the bookings of the current user
    const userBookings = allBookings.filter(
      (booking) => booking.user === currentUser?.email
    );

    setMyBookings(userBookings);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📅 My Bookings</h2>

      {myBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myBookings.map((booking, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow hover:shadow-md"
            >
              <img
                src={booking.image || "https://placehold.co/300x200?text=No+Image"}
                alt="property"
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-semibold">{booking.title}</h3>
              <p>📍 {booking.location}</p>
              <p>💰 ₹{booking.price}/night</p>
              <p>🟢 Check-in: {booking.checkIn}</p>
              <p>🔴 Check-out: {booking.checkOut}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
