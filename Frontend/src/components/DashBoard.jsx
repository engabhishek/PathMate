import React, { useContext, useState } from "react";
import { UserContext } from "../store/UserContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);

  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🤖 Chat states
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  // 🚀 Generate Roadmap
  const handleGenerateRoadmap = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      const data = await res.json();

      if (data?.roadmap && Array.isArray(data.roadmap)) {
        setRoadmap(data.roadmap);
      } else {
        console.error("❌ Invalid response:", data);
        setRoadmap([
          {
            title: "Start Basics",
            duration: "2 weeks",
            substeps: ["Learn basics", "Watch tutorials", "Practice daily"],
          },
          {
            title: "Practice Projects",
            duration: "1 month",
            substeps: [
              "Build small projects",
              "Improve skills",
              "Get feedback",
            ],
          },
        ]);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setRoadmap([
        {
          title: "Learn Fundamentals",
          duration: "2 weeks",
          substeps: ["Understand basics", "Read docs", "Practice"],
        },
        {
          title: "Build Projects",
          duration: "1 month",
          substeps: ["Create projects", "Upload work", "Improve UI"],
        },
      ]);
    }

    setLoading(false);
  };

  // 🤖 Chat
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setChatLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          user: user,
        }),
      });

      const data = await res.json();

      const botMsg = {
        role: "bot",
        text: data?.reply || "Sorry, something went wrong.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("❌ Chat error:", err);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Server error. Try again later." },
      ]);
    }

    setChatLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex flex-col">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-black/20 backdrop-blur-lg">
        <h1 className="text-2xl font-bold tracking-wide">PathMate 🚀</h1>
        <button
          onClick={logout}
          className="bg-white text-black text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 sm:px-6 py-6 overflow-y-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
          >
            <h2 className="text-xl font-bold mb-4">
              👤 {user?.name || "User"}
            </h2>

            <div className="space-y-2 text-sm text-gray-200">
              <p>
                <span className="font-semibold">Age:</span> {user?.age || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Education:</span>{" "}
                {user?.educationLevel || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Interest:</span>{" "}
                {user?.interestField || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Skills:</span>{" "}
                {user?.skills || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Passion:</span>{" "}
                {user?.passion || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Timeline:</span>{" "}
                {user?.timeline || "N/A"}
              </p>
            </div>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20"
          >
            <h2 className="text-xl font-bold mb-4">🧭 Your Roadmap</h2>

            {!Array.isArray(roadmap) || roadmap.length === 0 ? (
              <button
                onClick={handleGenerateRoadmap}
                disabled={loading}
                className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Roadmap 🚀"}
              </button>
            ) : (
              <div className="relative border-l-2 border-white/30 pl-6 space-y-6">
                {roadmap.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-[34px] top-1 w-4 h-4 bg-white rounded-full"></div>

                    <div className="bg-white/20 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-200 mb-2">
                        ⏳ {step.duration}
                      </p>

                      {/* ✅ Substeps */}
                      {Array.isArray(step.substeps) &&
                        step.substeps.length > 0 && (
                          <ul className="text-sm text-gray-100 space-y-1 mt-2">
                            {step.substeps.map((sub, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>👉</span>
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* 🤖 AI CHAT */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-white/10 backdrop-blur-xl p-5 rounded-2xl border border-white/20"
        >
          <h2 className="text-lg font-semibold mb-3">🤖 AI Career Assistant</h2>

          {/* Messages */}
          <div className="h-64 overflow-y-auto space-y-2 mb-3 pr-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-white text-black ml-auto"
                    : "bg-indigo-500 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {chatLoading && <p className="text-sm text-gray-300">Typing...</p>}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your career..."
              className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={chatLoading}
              className="bg-white text-black px-4 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
