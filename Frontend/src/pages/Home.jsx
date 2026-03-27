import React from "react";
import { motion } from "framer-motion";
import Button from "../components/general/Button";
import ThreeScene from "../components/ThreeScene";

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">

      {/* 3D Background */}
      <ThreeScene />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/80 backdrop-blur-sm"></div>

      {/* Glass Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.img
          src="/path-mate.png"
          alt="logo"
          className="w-28 mb-6 rounded-full shadow-2xl"
          whileHover={{ scale: 1.2, rotate: 10 }}
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-indigo-100 to-slate-900 bg-clip-text text-transparent">
          PathMate 
          <span className="text-black">🚀</span>
        </h1>

        <p className="text-gray-300 max-w-lg mb-8">
          AI-powered career roadmap generator that guides your future with smart insights
        </p>

        <motion.div whileHover={{ scale: 1.1 }}>
          <Button
            text="Get Started"
            bg="white"
            textcol="indigo-600"
            url="/LoginPage"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;