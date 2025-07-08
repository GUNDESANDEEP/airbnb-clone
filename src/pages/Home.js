import React from 'react';
import PropertyCard from '../components/PropertyCard'; // adjust the path based on your project

const AllProperties = ({ properties }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-6">
      {/* ✅ Responsive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ✅ Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-gray-800">
          All Properties
        </h1>

        {/* ✅ Responsive Grid for Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property._id} {...property} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No properties found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
