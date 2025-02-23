import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const move_options = () => {
    navigate("/options");
  };
  return (
    <div className="flex flex-col items-center justify-center text-center p-5 min-h-screen bg-gradient-to-b from-[#0b0f19] to-[#1a237e] text-white">
      <header className="mb-5">
        <DotLottieReact
          src="https://lottie.host/bfe4040f-91cc-4978-a160-dd4f49efd696/CuEmncB6II.lottie"
          loop
          autoplay
          className="h-[250px]"
        />
        <h1 className="text-5xl font-extrabold mt-5 drop-shadow-lg">
          Hey Champ! Welcome to <span className="text-blue-400">ExamEase</span>
        </h1>
      </header>

      <main className="flex flex-col items-center">
        <button
          onClick={move_options}
          className="mt-5 px-8 py-3 text-2xl font-semibold rounded-xl text-white bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300"
        >
          Let’s Get Started!
        </button>
      </main>
    </div>
  );
};

export default Home;
