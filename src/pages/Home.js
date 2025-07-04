import React, { useEffect, useState } from "react";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(storedProperties);
  }, []);

  // ✅ Booking handler
  const handleBooking = (property) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      alert("❌ Please login to book.");
      return;
    }

    const date = new Date().toLocaleDateString();

    const booking = {
      title: property.title,
      location: property.location,
      price: property.price,
      date,
      user: currentUser.email,
    };

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    allBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(allBookings));

    alert("✅ Booking Confirmed!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🏡 Featured Properties</h2>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property, index) => (
            <div key={index} className="bg-white p-4 shadow rounded">
              <img
                src={property.image || "https://placehold.co/300x200?text=No+Image"}
                alt="Property"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-bold">{property.title}</h3>
              <p>📍 {property.location}</p>
              <p>💰 ₹{property.price}/night</p>

              <button
                onClick={() => handleBooking(property)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
              >
                ✅ Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
