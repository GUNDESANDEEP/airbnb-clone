import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.email === email && user?.password === password) {
        alert("✅ Login successful!");
        navigate("/dashboard");
      } else {
        alert("❌ Invalid credentials");
      }
      setLoading(false);
    }, 1500);
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Log In
      </button>
    </div>
  );
}
