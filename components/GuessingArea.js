import GuessRow from "./GuessRow";

const GuessingArea = ({ currentGuessNumber, currentGuess }) => {
  return (
    <div className="space-y-1 bg-black p-1 my-10">
      <GuessRow guessIndex={1} currentGuessNumber={currentGuessNumber} />
      <GuessRow guessIndex={2} currentGuessNumber={currentGuessNumber} />
      <GuessRow guessIndex={3} currentGuessNumber={currentGuessNumber} />
      <GuessRow guessIndex={4} currentGuessNumber={currentGuessNumber} />
      <GuessRow guessIndex={5} currentGuessNumber={currentGuessNumber} />
      <GuessRow guessIndex={6} currentGuessNumber={currentGuessNumber} />
    </div>
  );
};

export default GuessingArea;
