import { Category, Difficulty, user_ans, answers } from "./Context";
import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Question from "./Question";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { final_score } from "./Context";
import { attempted } from "./Context";
import ProgressGraph from "./ProgressGraph";
function Api() {
  const { category } = useContext(Category);
  const { difficulty } = useContext(Difficulty);
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [current_index, setCurrent] = useState(-1);
  const { User_ans, setUser } = useContext(user_ans);
  const [count, setCount] = useState(0);
  const { ans, setAns } = useContext(answers);
  const [timer, setTimer] = useState(5);
  const { Final_score, setFinal_score } = useContext(final_score);
  const { Attempted, setAttempted } = useContext(attempted);

  useEffect(() => {
    console.log("Category:", category);
    console.log("Difficulty:", difficulty);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        console.log(response.data.results);
        setQuestions(response.data.results);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log("Too many requests, retrying...");
          setTimeout(fetchData, 3000);
        } else {
          console.log(error);
        }
      }
    };

    if (category && difficulty) {
      fetchData();
    }
  }, [category, difficulty]);

  useEffect(() => {
    if (show && current_index < questions.length) {
      const timerId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
        if (timer === 0) {
          index_setting();
        }
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [show, current_index, timer]);

  const index_setting = () => {
    if (current_index < questions.length) {
      setAns((prevAns) => [
        ...prevAns,
        questions[current_index].correct_answer,
      ]);
      setCurrent(current_index + 1);
      setTimer(10);
    } else if (current_index >= questions.length) {
      console.log("new game");
      setShow(false);
      setCurrent(-1);
      console.log(answers);
    }
  };

  const getting = (value) => {
    console.log(value);
    setUser((prevAnswers) => [...prevAnswers, value]);
  };

  const play = () => {
    setShow(true);
    setCurrent(0);
    setTimer(10);
  };

  const updateScore = () => {
    setCount(count + 1);
    setFinal_score(count);
  };

  useEffect(() => {
    console.log(User_ans);
    console.log(count);
  }, [User_ans, count]);

  const progress = Math.round(((current_index + 1) / questions.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      {!show && (
        <>
          <DotLottieReact
            src="https://lottie.host/17f905d4-5abc-4e58-8044-1ef41249e657/ImMStEkAB1.lottie"
            loop
            autoplay
            className="h-[200px]"
          />
          <button
            onClick={play}
            className="px-6 py-3 text-xl font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Play
          </button>
        </>
      )}
      <div className="w-full max-w-3xl">
        {show && current_index < questions.length && (
          <div className="mt-6">
            {questions.length > 0 ? (
              <>
                <Question
                  key={current_index}
                  index={current_index}
                  correct={questions[current_index].correct_answer}
                  question={questions[current_index].question}
                  array={questions[current_index].incorrect_answers}
                  getting_value={getting}
                  updateScore={updateScore}
                />
                <div className="text-center mt-4 text-xl">
                  Time remaining: {timer} seconds
                </div>
                <div className="text-center mt-4 text-xl">Score: {count}</div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
        <div className="w-full max-w-3xl flex justify-center mt-6">
          {current_index >= 0 && current_index < questions.length && (
            <button
              className="px-6 py-3 text-xl font-semibold rounded-lg bg-green-500 hover:bg-green-600 transition-transform transform hover:scale-105"
              onClick={index_setting}
              disabled={current_index >= questions.length}
            >
              Next
            </button>
          )}
        </div>
        {show && current_index < questions.length && (
          <>
            <span>
              {current_index + 1}/{questions.length}
            </span>
            <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        )}
      </div>

      {current_index >= questions.length && (
        <div className="flex flex-col items-center mt-8">
          <DotLottieReact
            src="https://lottie.host/58751a49-7ea6-45f5-a3a9-e3303643267d/XV8aFlqbdg.lottie"
            loop
            autoplay
          />
          <div className="text-center mt-4 text-xl">
            You successfully completed the quiz!!!!
          </div>

          <ProgressGraph
            score={count}
            attempted={questions.length}
            wrong={10 - count}
          />
          <Link to="/">
            <button className="px-6 py-3 text-xl font-semibold rounded-lg bg-purple-500 hover:bg-purple-600 transition-transform transform hover:scale-105 mt-6 w-[150px] ml-3">
              Start Over
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Api;
