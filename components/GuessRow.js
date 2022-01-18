import { useEffect, useState } from "react";
import GuessLetter from "./GuessLetter";

const GuessRow = ({
  guessIndex,
  currentGuessNumber,
  currentGuess,
  guessCorrectness,
}) => {
  const [guessLetters, setGuessLetters] = useState([]);

  const [finalized, setFinalized] = useState(false);

  useEffect(() => {
    if (currentGuessNumber > guessIndex) {
      setFinalized(true);
    }
  }, [currentGuessNumber, guessIndex]);

  useEffect(() => {
    if (guessIndex === currentGuessNumber) {
      const letters = currentGuess?.split("");
      setGuessLetters(letters);
    }
  }, [currentGuessNumber, currentGuess, guessIndex]);

  return (
    <div className="flex flex-row items-center justify-center space-x-2">
      <GuessLetter
        finalized={finalized}
        letterIndex={0}
        guessLetters={guessLetters}
        guessCorrectness={guessCorrectness}
        guessIndex={guessIndex}
        currentGuessNumber={currentGuessNumber}
      />
      <GuessLetter
        finalized={finalized}
        letterIndex={1}
        guessLetters={guessLetters}
        guessCorrectness={guessCorrectness}
        guessIndex={guessIndex}
        currentGuessNumber={currentGuessNumber}
      />
      <GuessLetter
        finalized={finalized}
        letterIndex={2}
        guessLetters={guessLetters}
        guessCorrectness={guessCorrectness}
        guessIndex={guessIndex}
        currentGuessNumber={currentGuessNumber}
      />
      <GuessLetter
        finalized={finalized}
        letterIndex={3}
        guessLetters={guessLetters}
        guessCorrectness={guessCorrectness}
        guessIndex={guessIndex}
        currentGuessNumber={currentGuessNumber}
      />
      <GuessLetter
        finalized={finalized}
        letterIndex={4}
        guessLetters={guessLetters}
        guessCorrectness={guessCorrectness}
        guessIndex={guessIndex}
        currentGuessNumber={currentGuessNumber}
      />
      <GuessLetter
        finalized={finalized}
        letterIndex={5}
        guessLetters={guessLetters}
        guessCorrectness={guessCorrectness}
        guessIndex={guessIndex}
        currentGuessNumber={currentGuessNumber}
      />
    </div>
  );
};

export default GuessRow;
