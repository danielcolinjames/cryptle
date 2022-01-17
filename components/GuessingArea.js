import GuessRow from "./GuessRow";

const GuessingArea = ({
  currentGuessNumber,
  currentGuess,
  guessCorrectness,
}) => {
  return (
    <div className="space-y-1 bg-black p-1 my-10">
      <GuessRow
        guessIndex={0}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
      />
      <GuessRow
        guessIndex={1}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
      />
      <GuessRow
        guessIndex={2}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
      />
      <GuessRow
        guessIndex={3}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
      />
      <GuessRow
        guessIndex={4}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
      />
      <GuessRow
        guessIndex={5}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
      />
    </div>
  );
};

export default GuessingArea;
