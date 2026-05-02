import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const OnboardingForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }, // ✅ added
  } = useForm();

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const selectedInterest = watch("interestField");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (data.interestField === "other") {
        data.interestField = data.customInterest;
      }

      const res = await fetch("http://localhost:5000/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: data }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to generate roadmap");
      }

      login({
        ...data,
        roadmap: result.roadmap,
        motivation: result.motivation,
      });

      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert("Failed to generate roadmap. Try again.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 
      px-4 py-10"
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl 
        bg-white/10 backdrop-blur-xl border border-white/20 
        rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
          🎯 Tell Us About Yourself
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Full Name */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Full Name is required" })}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300"
            />
            {errors.name && (
              <p className="text-red-300 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            />
            {errors.age && (
              <p className="text-red-300 text-sm mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Education Level
            </label>
            <select
              {...register("educationLevel", {
                required: "Select education level",
              })}
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            >
              <option value="" className="text-black">
                Select...
              </option>
              <option value="school" className="text-black">
                School Student
              </option>
              <option value="college" className="text-black">
                College Student
              </option>
              <option value="graduate" className="text-black">
                Graduate
              </option>
              <option value="professional" className="text-black">
                Working Professional
              </option>
            </select>
            {errors.educationLevel && (
              <p className="text-red-300 text-sm mt-1">
                {errors.educationLevel.message}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">Skills</label>
            <input
              type="text"
              {...register("skills")}
              placeholder="HTML, CSS, JavaScript"
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            />
          </div>

          {/* Interest */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">
              Interest Field
            </label>
            <select
              {...register("interestField", {
                required: "Select an interest",
              })}
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            >
              <option value="" className="text-black">
                Select...
              </option>
              <option value="tech" className="text-black">
                Technology
              </option>
              <option value="design" className="text-black">
                Design
              </option>
              <option value="medical" className="text-black">
                Medical
              </option>
              <option value="finance" className="text-black">
                Finance
              </option>
              <option value="arts" className="text-black">
                Arts
              </option>
              <option value="other" className="text-black">
                Other
              </option>
            </select>
            {errors.interestField && (
              <p className="text-red-300 text-sm mt-1">
                {errors.interestField.message}
              </p>
            )}

            <AnimatePresence>
              {selectedInterest === "other" && (
                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  type="text"
                  placeholder="Enter your interest..."
                  {...register("customInterest", {
                    required: "Please enter your custom interest",
                  })}
                  className="mt-3 w-full p-3 rounded-lg bg-white/20 text-white"
                />
              )}
            </AnimatePresence>

            {errors.customInterest && (
              <p className="text-red-300 text-sm mt-1">
                {errors.customInterest.message}
              </p>
            )}
          </div>

          {/* Passion */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">
              What do you enjoy doing?
            </label>
            <input
              type="text"
              {...register("passion")}
              placeholder="e.g., I love building apps"
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            />
          </div>

          {/* Achievements */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">
              Achievements
            </label>
            <textarea
              {...register("achievements")}
              placeholder="Hackathon winner..."
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Time per Week (hrs)
            </label>
            <input
              type="number"
              {...register("timePerWeek", {
                required: "Enter time per week",
              })}
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            />
            {errors.timePerWeek && (
              <p className="text-red-300 text-sm mt-1">
                {errors.timePerWeek.message}
              </p>
            )}
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Timeline</label>
            <select
              {...register("timeline", { required: "Select timeline" })}
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            >
              <option value="">Select...</option>
              <option value="3months">3 Months</option>
              <option value="6months">6 Months</option>
              <option value="12months">12 Months</option>
            </select>
            {errors.timeline && (
              <p className="text-red-300 text-sm mt-1">
                {errors.timeline.message}
              </p>
            )}
          </div>

          {/* Learning Style */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">
              Learning Style
            </label>
            <select
              {...register("preference", {
                required: "Select learning style",
              })}
              className="w-full p-3 rounded-lg bg-white/20 text-white"
            >
              <option value="">Select...</option>
              <option value="video">Video-based</option>
              <option value="text">Text-based</option>
              <option value="project">Project-based</option>
              <option value="hybrid">Hybrid</option>
            </select>
            {errors.preference && (
              <p className="text-red-300 text-sm mt-1">
                {errors.preference.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full bg-white text-black font-semibold py-3 rounded-lg 
            hover:bg-gray-200 transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Submit & Generate Roadmap 🚀"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingForm;