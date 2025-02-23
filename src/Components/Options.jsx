import React, { useContext } from "react";
import { Category, Difficulty } from "./Context";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Options() {
  const { category, setCategory } = useContext(Category);
  const { difficulty, setDifficulty } = useContext(Difficulty);

  const select_category = (e) => {
    const selectedCategory = parseInt(e.target.value, 10);
    console.log(selectedCategory);
    setCategory(selectedCategory);
  };
  const select_difficulty = (e) => {
    console.log(e.target.value);
    setDifficulty(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-5 min-h-screen bg-[url('https://source.unsplash.com/1600x900/?space,galaxy')] bg-cover bg-center text-white">
      <div className="flex flex-col items-center mb-8">
        <DotLottieReact
          src="https://lottie.host/aa31c5e0-2da1-482a-93bf-3ede58232ee5/LyPVGiH95p.lottie"
          loop
          autoplay
          className="h-64 drop-shadow-lg"
        />
        <h1 className="text-5xl font-extrabold mt-4 drop-shadow-lg">
          Ace Your Exams with <span className="text-blue-400">Ease</span>
        </h1>
      </div>
      <div className="flex flex-col items-center space-y-6">
        <select
          className="block appearance-none w-full bg-blue-900 border border-blue-400 text-white py-3 px-4 pr-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={select_category}
          defaultValue=""
        >
          <option value="" disabled>
            Select Category
          </option>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="20">Mythology</option>
          <option value="17">Science</option>
          <option value="18">Computer Science</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="27">Biology</option>
          <option value="19">Mathematic</option>
        </select>
        <select
          className="block appearance-none w-full bg-blue-900 border border-blue-400 text-white py-3 px-4 pr-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={select_difficulty}
          defaultValue=""
        >
          <option value="" disabled>
            Select Difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link to="/api">
          <button className="px-8 py-3 text-2xl font-semibold rounded-xl text-white bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Options;
