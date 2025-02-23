import React from "react";
import Home from "./Components/Home";
import { Category, Difficulty, user_ans, answers } from "./Components/Context";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Api from "./Components/Api";
import Question from "./Components/Question";
import Score from "./Score";
function App() {
  const [category, setCategory] = useState("Select Category");
  const [difficulty, setDifficulty] = useState("Select difficulty");

  const [User_ans, setUser] = useState([]);
  const [ans, setAns] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Category.Provider value={{ category, setCategory }}>
          <Difficulty.Provider value={{ difficulty, setDifficulty }}>
            <user_ans.Provider value={{ User_ans, setUser }}>
              {" "}
              {/* Wrap components that need access to context here */}
              <answers.Provider value={{ ans, setAns }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/api" element={<Api />} />
                  <Route
                    path="/question"
                    element={<Question></Question>}
                  ></Route>
                  <Route path="/score" element={<Score></Score>}></Route>
                </Routes>
              </answers.Provider>
            </user_ans.Provider>
          </Difficulty.Provider>
        </Category.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
