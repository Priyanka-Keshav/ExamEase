import React, { useContext } from "react";
import { Category, Difficulty } from "./Context";
import { Link } from "react-router-dom";
function Home() {
  const { category, setCategory } = useContext(Category);
  const { difficulty, setDifficulty } = useContext(Difficulty);

  const select_category = (e) => {
    const selectedCategory = parseInt(e.target.value, 10); // Convert to integer
    console.log(selectedCategory);
    setCategory(selectedCategory);
  };
  const select_difficulty = (e) => {
    console.log(e.target.value);
    setDifficulty(e.target.value);
  };

  return (
    <>
      {" "}
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold underline">Quiz app</h1>
      </div>
      <div className="flex justify-center items-center mt-8">
        {" "}
        <select
          className="select select-info w-full max-w-xs"
          onChange={select_category}
        >
          <option disabled selected>
            Select Category
          </option>

          <option value="11">Entertainment</option>
          <option value="21">Sports</option>
          <option value="12">Music</option>
          <option value="17">Science</option>
          <option value="18">Computer Science</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
        </select>
      </div>
      <div className="flex justify-center items-center mt-8">
        {" "}
        <select
          className="select select-info w-full max-w-xs"
          onChange={select_difficulty}
        >
          <option disabled selected>
            Select difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="flex justify-center items-center mt-8">
        {" "}
        <Link to="/api">
          {" "}
          <button className="btn btn-outline btn-info">Submit</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
