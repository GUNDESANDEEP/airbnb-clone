import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const userBookings = allBookings.filter(
      (b) => b.user === currentUser?.email
    );

    setBookings(userBookings);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📅 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {bookings.map((booking, index) => (
            <div key={index} className="bg-white rounded shadow-md p-4">
              <h3 className="font-bold">{booking.title}</h3>
              <p>📍 {booking.location}</p>
              <p>💰 ₹{booking.price}/night</p>
              <p>📅 Date: {booking.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
