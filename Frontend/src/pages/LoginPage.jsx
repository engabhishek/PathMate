import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [mode, setMode] = useState("signup");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { login } = useContext(UserContext);

  // 🖱️ Cursor Light Effect
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--x", e.clientX + "px");
      document.documentElement.style.setProperty("--y", e.clientY + "px");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const onSubmit = (user) => {
    if (mode === "signup") {
      user.id = nanoid();
      login(user);
      setMode("signin");
    } else {
      login(user);
      navigate("/onboardingform");
    }
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-b from-indigo-500 via-purple-600 to-pink-600 relative overflow-hidden"
    >
      {/* ✨ Cursor Light */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,1,255,1),transparent_40%)]"></div>
      </div>

      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
        
        {/* Branding */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center items-center sm:items-start text-white px-4 sm:pr-6 max-w-sm"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            PathMate 🚀
          </h1>
          <p className="text-sm sm:text-lg mb-4 text-center sm:text-left">
            Your <span className="font-semibold">AI Career GPS</span> – Get a
            personalized roadmap, curated resources & mentor guidance to achieve
            your dream career.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#1c1c1c]/40 backdrop-blur-lg rounded-2xl p-6 text-white shadow-xl"
        >
          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-black p-1 rounded-full">
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                  mode === "signup"
                    ? "bg-white text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                Sign up
              </button>
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-200 ${
                  mode === "signin"
                    ? "bg-white text-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                Sign in
              </button>
            </div>
          </div>

          {/* Title Animation */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl font-bold mb-4 text-center"
            >
              {mode === "signup"
                ? "Create your PathMate account"
                : "Welcome back to PathMate"}
            </motion.h2>
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <motion.div
              animate={errors.username ? { x: [-5, 5, -5, 5, 0] } : {}}
            >
              <div className={`flex items-center rounded-md px-4 py-3 border 
                ${errors.username ? "border-red-500" : "border-transparent"} 
                bg-[#1e1e1e]`}>
                <span className="text-gray-400 mr-2">👤</span>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("username", { required: "Name is required" })}
                  className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                />
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <AnimatePresence>
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    errors.email
                      ? { x: [-5, 5, -5, 5, 0] }
                      : { opacity: 1, y: 0 }
                  }
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className={`flex items-center rounded-md px-4 py-3 border 
                    ${errors.email ? "border-red-500" : "border-transparent"} 
                    bg-[#1e1e1e]`}>
                    <span className="text-gray-400 mr-2">📧</span>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email",
                        },
                      })}
                      className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password */}
            <motion.div
              animate={errors.password ? { x: [-5, 5, -5, 5, 0] } : {}}
            >
              <div className={`flex items-center rounded-md px-4 py-3 border 
                ${errors.password ? "border-red-500" : "border-transparent"} 
                bg-[#1e1e1e]`}>
                <span className="text-gray-400 mr-2">🔒</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
            >
              {mode === "signup" ? "Create Account" : "Sign In"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginPage;