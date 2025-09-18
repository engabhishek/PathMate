import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner with Logo inside */}
        <div className="relative">
          {/* Spinner Circle */}
          <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

          {/* Logo/Icon inside spinner */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🚀</span> 
            {/* You can replace 🚀 with your PathMate logo img */}
            {/* Example: <img src="/logo.png" alt="logo" className="w-8 h-8" /> */}
          </div>
        </div>

        {/* Text with pulse animation */}
        <p className="text-white text-lg font-semibold animate-pulse">
          Loading PathMate...
        </p>
      </div>
    </div>
  );
};

export default Loader;
