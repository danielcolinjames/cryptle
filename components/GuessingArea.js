import GuessRow from "./GuessRow";
import rgbHex from "rgb-hex";

const GuessingArea = ({
  gameComplete,
  color1,
  color2,
  currentGuessNumber,
  currentGuess,
  guessCorrectness,
  guessHistory,
}) => {
  const { Vibrant: vibrant1 } = color1;
  const { Vibrant: vibrant2 } = color2;

  const [r1, g1, b1] = vibrant1.rgb;
  const [r2, g2, b2] = vibrant2.rgb;

  const color1Hex = `#${rgbHex(r1, g1, b1)}`;
  const color2Hex = `#${rgbHex(r2, g2, b2)}`;

  const colorLeft = gameComplete ? color1Hex : "#000000";
  const colorRight = gameComplete ? color2Hex : "#000000";

  return (
    <div
      className="space-y-2 md:space-y-4 p-2 md:p-4 my-10 rounded-lg"
      style={{
        background: `linear-gradient(to right, ${colorLeft} 50%, ${colorRight} 50%)`,
      }}
    >
      <GuessRow
        guessIndex={0}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
        guessHistory={guessHistory}
      />
      <GuessRow
        guessIndex={1}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
        guessHistory={guessHistory}
      />
      <GuessRow
        guessIndex={2}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
        guessHistory={guessHistory}
      />
      <GuessRow
        guessIndex={3}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
        guessHistory={guessHistory}
      />
      <GuessRow
        guessIndex={4}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
        guessHistory={guessHistory}
      />
      <GuessRow
        guessIndex={5}
        currentGuessNumber={currentGuessNumber}
        currentGuess={currentGuess}
        guessCorrectness={guessCorrectness}
        guessHistory={guessHistory}
      />
    </div>
  );
};

export default GuessingArea;
