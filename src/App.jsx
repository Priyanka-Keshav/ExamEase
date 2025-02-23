import React from "react";
import Options from "./Components/Options";
import { Category, Difficulty, user_ans, answers } from "./Components/Context";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Api from "./Components/Api";
import Question from "./Components/Question";
import Home from "./Components/Home";
import { final_score } from "./Components/Context";
import { attempted } from "./Components/Context";
function App() {
  const [category, setCategory] = useState("Select Category");
  const [difficulty, setDifficulty] = useState("Select difficulty");
  const [Final_score, setFinal_score] = useState(0);
  const [Attempted, setAttempted] = useState(0);
  const [User_ans, setUser] = useState([]);
  const [ans, setAns] = useState([]);
  return (
    <>
      <BrowserRouter>
        <final_score.Provider value={{ Final_score, setFinal_score }}>
          <attempted.Provider value={{ Attempted, setAttempted }}>
            <Category.Provider value={{ category, setCategory }}>
              <Difficulty.Provider value={{ difficulty, setDifficulty }}>
                <user_ans.Provider value={{ User_ans, setUser }}>
                  {" "}
                  <answers.Provider value={{ ans, setAns }}>
                    <Routes>
                      <Route path="/options" element={<Options />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/api" element={<Api />} />
                      <Route
                        path="/question"
                        element={<Question></Question>}
                      ></Route>
                    </Routes>
                  </answers.Provider>
                </user_ans.Provider>
              </Difficulty.Provider>
            </Category.Provider>
          </attempted.Provider>
        </final_score.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
