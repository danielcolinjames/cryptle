import GuessLetter from "./GuessLetter";

const IntroSection = ({ setSeenIntro }) => {
  const guess1 = "BTCHNT";
  const guess2 = "LRCXRP";

  const guessHistoryExample = [
    [0, 0, 1, 0, 0, 0],
    [1, 1, 1, -1, -1, 0],
  ];
  return (
    <div className="absolute z-50 top-20 bottom-0 md:top-40 w-full text-green-400 bg-gray-700 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 md:px-14 py-5 md:py-10 flex flex-col items-center justify-start max-w-xl text-center space-y-4 md:h-auto md:bottom-auto text-sm">
      <p className="text-2xl text-white font-bold mt-2 mb-4">
        Welcome to Cryptle!
      </p>
      <p>
        A Cryptle consists of two ticker symbols from the top 100 crypto assets
        by market cap, according to CoinGecko.
      </p>
      <p>Every 24 hours, a new Cryptle will be generated.</p>
      <p>A green square means you got that letter correct.</p>
      <div className="flex flex-row items-center justify-center space-x-2 md:space-x-4">
        <GuessLetter
          finalized={true}
          letterIndex={0}
          guessLetters={guess1}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={0}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={1}
          guessLetters={guess1}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={0}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={2}
          guessLetters={guess1}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={0}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={3}
          guessLetters={guess1}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={0}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={4}
          guessLetters={guess1}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={0}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={5}
          guessLetters={guess1}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={0}
          currentGuessNumber={2}
        />
      </div>
      <p>A yellow square means that letter appears somewhere in the Cryptle.</p>
      <div className="flex flex-row items-center justify-center space-x-2 md:space-x-4">
        <GuessLetter
          finalized={true}
          letterIndex={0}
          guessLetters={guess2}
          guessHistory={["asdftt", "asdfasdf"]}
          guessCorrectness={guessHistoryExample}
          guessIndex={1}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={1}
          guessLetters={guess2}
          guessHistory={[guess2, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={1}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={2}
          guessLetters={guess2}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={1}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={3}
          guessLetters={guess2}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={1}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={4}
          guessLetters={guess2}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={1}
          currentGuessNumber={2}
        />
        <GuessLetter
          finalized={true}
          letterIndex={5}
          guessLetters={guess2}
          guessHistory={[guess1, guess2]}
          guessCorrectness={guessHistoryExample}
          guessIndex={1}
          currentGuessNumber={2}
        />
      </div>
      <div className="pt-2">
        <button
          className="bg-gray-200 transition-all hover:bg-white focus:bg-gray-300 duration-100 text-black font-sans font-semibold px-4 py-2 rounded-md mt-5"
          onClick={() => setSeenIntro(true)}
        >
          {"Let's do this!"}
        </button>
      </div>
    </div>
  );
};

export default IntroSection;
