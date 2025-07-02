import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProperty from "./pages/AddProperty";
import Dashboard from "./pages/Dashboard";
import MyListings from "./pages/MyListings";
import EditProperty from "./pages/EditProperty"; // 👈 NEW

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/edit/:index" element={<EditProperty />} /> {/* 👈 NEW ROUTE */}
      <Route path="/edit/:id" element={<EditProperty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
