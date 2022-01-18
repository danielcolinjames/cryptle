import classNames from "classnames";

const GuessLetter = ({
  letterIndex,
  guessLetters,
  finalized,
  guessCorrectness,
  guessIndex,
}) => {
  return (
    <div
      className={classNames(
        "w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-lg font-black",
        {
          "bg-gray-600": !finalized,
          "bg-gray-900 text-white": finalized,
          "bg-green-300 text-black":
            finalized && guessCorrectness[guessIndex][letterIndex] === 1,
          "bg-yellow-300 text-black":
            finalized && guessCorrectness[guessIndex][letterIndex] === -1,
        }
      )}
    >
      <span className="font-sans text-md md:text-2xl">
        {guessLetters[letterIndex]}
      </span>
    </div>
  );
};

export default GuessLetter;
