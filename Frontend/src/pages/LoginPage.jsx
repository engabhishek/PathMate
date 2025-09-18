import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const LoginPage = () => {
  const [mode, setMode] = useState("signup");
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { login } = useContext(UserContext);

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
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-b from-indigo-500 via-purple-600 to-pink-600">
      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Branding Section */}
        <div className="flex flex-col justify-center items-center sm:items-start text-white px-4 sm:pr-6 max-w-sm">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">PathMate 🚀</h1>
          <p className="text-sm sm:text-lg mb-4 text-center sm:text-left">
            Your <span className="font-semibold">AI Career GPS</span> – Get a
            personalized roadmap, curated resources & mentor guidance to achieve
            your dream career.
          </p>
        </div>

        <div className="w-full max-w-md bg-[#1c1c1c]/40 backdrop-blur-lg rounded-2xl p-6 text-white shadow-xl">
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

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            {mode === "signup"
              ? "Create your PathMate account"
              : "Welcome back to PathMate"}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="flex items-center bg-[#1e1e1e] rounded-md px-4 py-3">
              <span className="text-gray-400 mr-2">👤</span>
              <input
                type="text"
                placeholder="Full Name"
                {...register("username", { required: true })}
                className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* Email - only in signup */}
            {mode === "signup" && (
              <div className="flex items-center bg-[#1e1e1e] rounded-md px-4 py-3">
                <span className="text-gray-400 mr-2">📧</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                  className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
            )}

            {/* Password */}
            <div className="flex items-center bg-[#1e1e1e] rounded-md px-4 py-3">
              <span className="text-gray-400 mr-2">🔒</span>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
                className="bg-transparent w-full focus:outline-none text-white placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-100 transition"
            >
              {mode === "signup" ? "Create Account" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
