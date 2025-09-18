import React from "react";
import { MoveRight } from "lucide-react";
import Button from "../components/general/Button";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white  bg-gradient-to-r from-indigo-500 to-purple-600">
      <img
        src="public\path-mate.png"
        alt="PathMate Logo"
        className="w-48 rounded-full mb-20"
      />

      <h1 className="text-center text-3xl lg:text-5xl font-bold mb-6">
        Welcome to PathMate 🚀
      </h1>
      <p className="text-center text-lg mb-8">
        Your AI-powered career roadmap generator
      </p>
      <Button
        text="Get Started"
        bg="white"
        textcol="indigo-600"
        url="/LoginPage"
      />
    </div>
  );
};

export default Home;
