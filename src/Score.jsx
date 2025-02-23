import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { user_ans } from "./Components/Context";
import { answers } from "./Components/Context";
import { Link } from "react-router-dom";

function Score() {
  const { User_ans } = useContext(user_ans);
  const { ans } = useContext(answers);
  const [score, setScore] = useState(0);

  const check_score = () => {
    for (let i = 0; i < User_ans.length; i++) {
      if (User_ans[i] === ans[i]) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  useEffect(() => {
    check_score();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
          <h1 className="text-4xl font-bold text-blue-500 mb-6">Your Score</h1>
          <p className="text-3xl text-gray-800 font-semibold mb-8">
            You scored <span className="text-blue-600">{score}</span> points
          </p>
          <Link to="/">
            <button className="btn btn-info px-6 py-3 font-bold text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
              NEW GAME
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Score;
