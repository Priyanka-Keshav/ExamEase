import { Category, Difficulty, user_ans, answers } from "./Context";
import { useContext, useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Question from "./Question";
import { Link } from "react-router-dom";

function Api() {
  const { category } = useContext(Category);
  const { difficulty } = useContext(Difficulty);
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [current_index, setCurrent] = useState(0);
  const { User_ans, setUser } = useContext(user_ans);
  const [count, setCount] = useState(0);
  const { ans, setAns } = useContext(answers);
  useEffect(() => {
    console.log("Category:", category);
    console.log("Difficulty:", difficulty);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=6&category=${category}&difficulty=${difficulty}&type=multiple`
        );
        console.log(response.data.results);
        setQuestions(response.data.results);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.log("Too many requests, retrying...");
          setTimeout(fetchData, 3000); // Retry after 3 seconds
        } else {
          console.log(error);
        }
      }
    };

    if (category && difficulty) {
      fetchData();
    }
  }, [category, difficulty]);

  const index_setting = () => {
    if (current_index <= questions.length) {
      setAns((prevAns) => [
        ...prevAns,
        questions[current_index].correct_answer,
      ]);
      setCurrent(current_index + 1);
    } else if (current_index > questions.length) {
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
    setCurrent(current_index + 1);
  };
  useEffect(() => {
    console.log(User_ans);
    console.log(count);
  }, [User_ans]);
  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <button
          onClick={play}
          className="btn btn-outline btn-info mt-4 ml-12 text"
        >
          Play
        </button>
        <div>
          {show && current_index < questions.length && (
            <div>
              {questions.length > 0 ? (
                <Question
                  key={current_index}
                  index={current_index}
                  correct={questions[current_index].correct_answer}
                  question={questions[current_index].question}
                  array={questions[current_index].incorrect_answers}
                  getting_value={getting}
                ></Question>
              ) : (
                <p>loading...</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        {" "}
        {current_index > 0 && current_index < questions.length && (
          <div className="flex flex-col items-center">
            <button
              className="btn btn-outline btn-info mt-4 ml-12 text"
              onClick={index_setting}
              disabled={current_index > questions.length - 1}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      {current_index > 5 && (
        <div className="flex flex-col items-center mt-8">
          <Link to="/score">
            {" "}
            <button className="btn btn-outline btn-info mt-4 ml-12 text">
              View Score
            </button>
          </Link>
        </div>
      )}
      <div></div>
    </>
  );
}

export default Api;
