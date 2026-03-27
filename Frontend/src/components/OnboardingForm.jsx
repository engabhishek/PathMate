import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { motion, AnimatePresence } from "framer-motion";

const OnboardingForm = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const selectedInterest = watch("interestField");
  const [loading, setLoading] = useState(false); // ✅ added

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (data.interestField === "other") {
        data.interestField = data.customInterest;
      }

      // ✅ CALL BACKEND
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

      // ✅ SAVE USER + AI DATA
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
              {...register("name", { required: true })}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Age</label>
            <input
              type="number"
              {...register("age", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-white 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Education Level
            </label>
            <select
              {...register("educationLevel", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-white 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
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
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">Skills</label>
            <input
              type="text"
              {...register("skills")}
              placeholder="HTML, CSS, JavaScript"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
            />
          </div>

          {/* Interest */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">
              Interest Field
            </label>
            <select
              {...register("interestField", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-white 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
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

            {/* Custom Input */}
            <AnimatePresence>
              {selectedInterest === "other" && (
                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  type="text"
                  placeholder="Enter your interest..."
                  {...register("customInterest", { required: true })}
                  className="mt-3 w-full p-3 rounded-lg bg-white/20 text-white 
                  border border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
                />
              )}
            </AnimatePresence>
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
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
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
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Time per Week (hrs)
            </label>
            <input
              type="number"
              {...register("timePerWeek", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-white 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
            />
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Timeline</label>
            <select
              {...register("timeline", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-white 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
            >
              <option value="3months" className="text-black">
                3 Months
              </option>
              <option value="6months" className="text-black">
                6 Months
              </option>
              <option value="12months" className="text-black">
                12 Months
              </option>
            </select>
          </div>

          {/* Learning Style */}
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-200 mb-1">
              Learning Style
            </label>
            <select
              {...register("preference", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-white 
              border border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/40 outline-none"
            >
              <option value="video" className="text-black">
                Video-based
              </option>
              <option value="text" className="text-black">
                Text-based
              </option>
              <option value="project" className="text-black">
                Project-based
              </option>
              <option value="hybrid" className="text-black">
                Hybrid
              </option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading} // ✅ added
            className="md:col-span-2 w-full bg-white text-black font-semibold py-3 rounded-lg 
            hover:bg-gray-200 transition transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Submit & Generate Roadmap 🚀"}{" "}
            {/* ✅ added */}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingForm;
