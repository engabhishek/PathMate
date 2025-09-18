import React, { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);
  const [roadmap, setRoadmap] = useState([]);

  const handleGenerateRoadmap = () => {
    setRoadmap([
      { id: 1, title: "Master JavaScript Basics", duration: "2 weeks" },
      { id: 2, title: "React + Tailwind Projects", duration: "1 month" },
      { id: 3, title: "Learn Node.js & MongoDB", duration: "1.5 months" },
      { id: 4, title: "Full Stack Project + Resume", duration: "1 month" },
    ]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-4 py-3 bg-black/20 backdrop-blur-lg">
        <h1 className="text-xl font-bold">PathMate 🚀</h1>
        <button
          onClick={logout}
          className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-6 overflow-y-auto">
        {/* User Info Card */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Hi, {user?.name || "User"} 👋
          </h2>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Age:</span> {user?.age || "N/A"}
          </p>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Education:</span> {user?.educationLevel || "N/A"}
          </p>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Interest:</span> {user?.interestField || "N/A"}
          </p>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Skills:</span> {user?.skills || "N/A"}
          </p>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Passion:</span> {user?.passion || "N/A"}
          </p>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Achievements:</span> {user?.achievements || "N/A"}
          </p>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Timeline:</span> {user?.timeline || "N/A"}
          </p>
          <p className="text-sm text-gray-200 mb-1">
            <span className="font-semibold">Learning Style:</span> {user?.preference || "N/A"}
          </p>
        </div>

        {/* Roadmap Section */}
        {roadmap.length === 0 ? (
          <button
            onClick={handleGenerateRoadmap}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition mb-6"
          >
            Generate Roadmap
          </button>
        ) : (
          <div className="space-y-4">
            {roadmap.map((step) => (
              <div
                key={step.id}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-xl shadow-md"
              >
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-gray-300">Duration: {step.duration}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
