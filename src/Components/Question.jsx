import React, { useEffect, useState } from "react";

function Question({ question, array, correct, getting_value, updateScore }) {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

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
    setIsAnswerSubmitted(true);
    getting_value(value);
    if (value === correct) {
      updateScore();
    }
  };

  return (
    <>
      {/* Enlarged Question Box */}
      <div className="flex justify-center items-center mt-12">
        <div className="card bg-white rounded-lg shadow-md p-6 w-4/5 sm:w-3/4 lg:w-2/3">
          <h1 className="text-black text-center text-lg sm:text-xl lg:text-2xl font-semibold">
            {question}
          </h1>
        </div>
      </div>

      {/* Answer Buttons */}
      <div className="flex flex-col items-center mt-6">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className="bg-slate-100 text-black w-4/5 sm:w-3/4 lg:w-2/3 mb-3 h-16 rounded-lg text-lg font-medium transition-all duration-200 ease-in-out hover:bg-gray-200"
            onClick={() => set_index(index, option)}
            style={{
              backgroundColor:
                isAnswerSubmitted && option === correct
                  ? "green"
                  : activeButton === index
                  ? option === correct
                    ? "green"
                    : "red"
                  : "white",
              color: "black",
            }}
            disabled={isAnswerSubmitted}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Question;
