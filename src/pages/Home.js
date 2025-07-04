import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [bookingDate, setBookingDate] = useState(null);

  useEffect(() => {
    const allProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(allProperties);
  }, []);

  const handleBooking = (property) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please log in to book a property.");
      return;
    }
    if (!bookingDate) {
      alert("Please select a booking date.");
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      user: user.email,
      property: property.title,
      location: property.location,
      price: property.price,
      date: bookingDate.toDateString(),
    };

    allBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));
    alert("✅ Booking successful!");
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
        🏡 Featured Properties
      </h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {properties.map((property, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow-md bg-white"
            >
              <img
                src={property.image || "https://placehold.co/300x200"}
                alt="Property"
                className="w-full h-48 object-cover mb-2"
              />
              <h3 className="text-xl font-bold">{property.title}</h3>
              <p>📍 {property.location}</p>
              <p>💰 ₹{property.price}/night</p>

              <div className="flex items-center gap-2 mt-2">
                <DatePicker
                  selected={bookingDate}
                  onChange={(date) => setBookingDate(date)}
                  placeholderText="📅 Select booking date"
                  className="border px-2 py-1 rounded"
                />
                <button
                  onClick={() => handleBooking(property)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  ✅ Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
