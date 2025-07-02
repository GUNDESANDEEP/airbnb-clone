import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("properties")) || [];
    const myListings = all.filter((prop) => prop.owner === user?.email);
    setListings(myListings);
  }, [user?.email]);

  const total = listings.length;
  const avgPrice =
    total > 0
      ? (
          listings.reduce((sum, prop) => sum + parseInt(prop.price), 0) / total
        ).toFixed(2)
      : 0;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">👤 Dashboard</h2>

      <div className="bg-white shadow-md p-4 rounded mb-6">
        <p className="text-lg font-semibold">Name: {user?.name}</p>
        <p className="text-lg font-semibold">Email: {user?.email}</p>
        <p className="text-lg">📝 Total Listings: {total}</p>
        <p className="text-lg">💰 Avg Price: ₹{avgPrice}</p>
      </div>

      <h3 className="text-xl font-bold mb-2">📦 Your Listings</h3>
      {listings.length === 0 ? (
        <p>You haven’t added any properties yet.</p>
      ) : (
        listings.map((prop, index) => (
          <div key={index} className="border rounded p-3 mb-3">
            <h4 className="font-semibold">{prop.title}</h4>
            <p>📍 {prop.location}</p>
            <p>💸 ₹{prop.price}</p>
          </div>
        ))
      )}
    </div>
  );
}
