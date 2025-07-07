import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProperty from "./pages/AddProperty";
import MyListings from "./pages/MyListings";
import EditProperty from "./pages/EditProperty";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
          <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
          <Route path="/edit-property/:index" element={<PrivateRoute><EditProperty /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* ✅ Toast Popup Handler */}
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
