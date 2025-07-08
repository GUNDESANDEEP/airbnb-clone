import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ _id, title, price, location, image }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 flex flex-col">
      {/* Property Image */}
      <img
        src={image || 'https://placehold.co/600x400?text=No+Image'}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      {/* Property Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{location}</p>
        </div>

        {/* Price & View Button */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-indigo-600 font-bold text-md">₹{price}/night</span>
          <Link
            to={`/property/${_id}`}
            className="text-sm text-white bg-indigo-600 px-3 py-1 rounded hover:bg-indigo-700 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
