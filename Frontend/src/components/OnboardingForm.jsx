import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const OnboardingForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // ✅ context login

  const onSubmit = (data) => {
    login(data); // Save user data to context & localStorage
    reset();
    navigate("/dashboard"); 
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 px-4 py-6">
      <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          🎯 Tell Us About Yourself
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-lg text-gray-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* Age & Education Level */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="block text-lg text-gray-200 mb-1">Age</label>
              <input
                type="number"
                {...register("age", { required: true })}
                placeholder="18"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-lg text-gray-200 mb-1">
                Education Level
              </label>
              <select
                {...register("educationLevel", { required: true })}
                className="w-full p-3 rounded-lg bg-white/20 text-gray-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="school">School Student</option>
                <option value="college">College Student</option>
                <option value="graduate">Graduate</option>
                <option value="professional">Working Professional</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">Skills</label>
            <input
              type="text"
              {...register("skills")}
              placeholder="HTML, CSS, JavaScript"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* Interest Field */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Interest Field
            </label>
            <select
              {...register("interestField", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-gray-500 focus:outline-none"
            >
              <option value="">Select...</option>
              <option value="tech">Technology</option>
              <option value="design">Design</option>
              <option value="medical">Medical</option>
              <option value="finance">Finance</option>
              <option value="arts">Arts</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Passion */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              What do you enjoy doing freshly & happily?
            </label>
            <input
              type="text"
              {...register("passion")}
              placeholder="e.g., I love building apps"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* Achievements */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Achievements
            </label>
            <textarea
              {...register("achievements")}
              placeholder="Hackathon winner, coding contest finalist..."
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>

          {/* Time & Timeline */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="block text-sm text-gray-200 mb-1">
                Time per Week (hrs)
              </label>
              <input
                type="number"
                {...register("timePerWeek", { required: true })}
                placeholder="10"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-200 mb-1">
                Timeline
              </label>
              <select
                {...register("timeline", { required: true })}
                className="w-full p-3 rounded-lg bg-white/20 text-gray-500 focus:outline-none"
              >
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="12months">12 Months</option>
              </select>
            </div>
          </div>

          {/* Learning Preference */}
          <div>
            <label className="block text-sm text-gray-200 mb-1">
              Learning Style
            </label>
            <select
              {...register("preference", { required: true })}
              className="w-full p-3 rounded-lg bg-white/20 text-gray-500 focus:outline-none"
            >
              <option value="video">Video-based</option>
              <option value="text">Text-based</option>
              <option value="project">Project-based</option>
              <option value="hybrid">Hybrid (Mix)</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition mt-4"
          >
            Submit & Generate Roadmap
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
