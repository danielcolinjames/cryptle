import { useEffect, useState } from "react";
import GuessLetter from "./GuessLetter";

const GuessRow = ({
  guessIndex,
  currentGuessNumber,
  currentGuess,
  guessCorrectness,
  guessHistory,
}) => {
  const [guessLetters, setGuessLetters] = useState(
    guessHistory[guessIndex] ? guessHistory[guessIndex].split("") : []
  );

  const [finalized, setFinalized] = useState(false);

  const [thisRowGuess, setThisRowGuess] = useState(currentGuess);

  useEffect(() => {
    if (currentGuessNumber > guessIndex) {
      if (
        currentGuess === "" &&
        guessCorrectness.length > 0 &&
        guessHistory.length > 0
      ) {
        setThisRowGuess(guessHistory[guessIndex]);
      }
      setFinalized(true);
    }
  }, [
    currentGuess,
    currentGuessNumber,
    guessCorrectness.length,
    guessHistory,
    guessIndex,
  ]);

  useEffect(() => {
    if (guessHistory.length >= currentGuessNumber) {
      // if data is from cookies
      const letters = thisRowGuess?.split("");
      setGuessLetters(letters);
    }
  }, [
    currentGuessNumber,
    currentGuess,
    guessIndex,
    thisRowGuess,
    finalized,
    guessHistory.length,
  ]);

  useEffect(() => {
    if (guessIndex === currentGuessNumber) {
      const letters = currentGuess.split("");
      setGuessLetters(letters);
    }
  }, [currentGuessNumber, currentGuess, guessIndex, thisRowGuess, finalized]);

  return (
    <div className="flex flex-row items-center justify-center space-x-2 md:space-x-4">
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
