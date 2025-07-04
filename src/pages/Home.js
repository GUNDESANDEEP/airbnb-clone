import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];
    setProperties(storedProperties);
  }, []);

  const handleBooking = (property, date) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      ...property,
      date,
      user: user.email,
    };

    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    alert("✅ Booking successful!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏡 Featured Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-green-700 font-bold">₹{property.price}/night</p>

            <DatePicker
              selected={selectedDates[index]}
              onChange={(date) =>
                setSelectedDates((prev) => ({ ...prev, [index]: date }))
              }
              placeholderText="📅 Select booking date"
              className="border p-2 my-2 w-full rounded"
            />

            <button
              onClick={() => handleBooking(property, selectedDates[index])}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              ✅ Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
