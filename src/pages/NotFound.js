// src/pages/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-4">Sorry! The page you’re looking for doesn't exist.</p>
      <Link to="/" className="text-blue-600 underline">
        🔙 Go Back to Home
      </Link>
    </div>
  );
}
