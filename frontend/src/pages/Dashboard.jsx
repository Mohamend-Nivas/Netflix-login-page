import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate(); 

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h2>
        <p className="mb-6">
          You have successfully logged in (this is a dummy page).
        </p>
        <button
          className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
