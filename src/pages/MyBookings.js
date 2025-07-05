import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = allBookings.filter(
      (booking) => booking.user === currentUser?.email
    );
    setBookings(userBookings);
  }, [currentUser]);

  // 🧹 Handle Delete Booking
  const handleDelete = (indexToDelete) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updated = allBookings.filter(
      (booking, index) => booking.user !== currentUser?.email || index !== indexToDelete
    );
    localStorage.setItem("bookings", JSON.stringify(updated));
    const filtered = updated.filter((b) => b.user === currentUser?.email);
    setBookings(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📅 My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index} className="border p-4 mb-4 rounded shadow">
            <h3 className="text-xl font-semibold">{booking.title}</h3>
            <p>📍 {booking.location}</p>
            <p>💰 ₹{booking.price}/night</p>
            <p>
              🗓 {booking.checkIn} → {booking.checkOut}
            </p>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-500 hover:text-red-700 font-bold mt-2"
            >
              🗑 Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}
