import React, { useEffect, useState } from "react";

function Question({ question, array, correct, getting_value }) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  let [count, setCount] = useState(1);
  function shuffleArray(value, array_2) {
    const merge = [value, ...array_2];

    // Fisher-Yates shuffle algorithm
    for (let i = merge.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
      [merge[i], merge[j]] = [merge[j], merge[i]]; // Swap elements
    }

    return merge;
  }

  useEffect(() => {
    const shuffled = shuffleArray(correct, array);
    setShuffledOptions(shuffled);
  }, [array, correct]);

  const set_index = (index, value) => {
    setActiveButton(index);
    console.log(index);
    getting_value(value);
    if (value === correct) {
      console.log("right");
      setCount((prevCount) => {
        prevCount + 1;
        console.log(prevCount);
      });
    } else {
      console.log("wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-12">
        <div className="card bg-white rounded-box grid h-16 place-items-center w-3/4">
          <h1 className="text-black text-center">{question}</h1>
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className="bg-slate-100 text-black w-3/4 mb-2 h-16 rounded-box"
            onClick={() => set_index(index, option)} // Handle click and pass index
            style={{
              backgroundColor: activeButton === index ? "gray" : "white", // Change color based on active button
              color: activeButton === index ? "white" : "black",
            }}
            disabled={activeButton != null}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Question;
