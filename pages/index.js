import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import useKeypress from "react-use-keypress";
import GuessingArea from "../components/GuessingArea";
import Keyboard from "../components/Keyboard";
import cache from "../data/client-cache";
import {
  calculateGuessCorrectness,
  checkIfGameComplete,
  checkIfValidGuess,
} from "../game-logic";

const Home = ({ todaysCryptle, cryptleBank, color1, color2 }) => {
  const { validGuesses } = cryptleBank;

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessCorrectness, setGuessCorrectness] = useState([]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentGuessNumber === 6) {
      setGameOver(true);
    }
    return () => {};
  }, [currentGuessNumber]);

  useEffect(() => {
    if (
      currentGuess > 0 &&
      guessCorrectness.length > 0 &&
      guessCorrectness[currentGuessNumber][0] === todaysCryptle.cryptle[0] &&
      guessCorrectness[currentGuessNumber][1] === todaysCryptle.cryptle[1] &&
      guessCorrectness[currentGuessNumber][2] === todaysCryptle.cryptle[2] &&
      guessCorrectness[currentGuessNumber][3] === todaysCryptle.cryptle[3] &&
      guessCorrectness[currentGuessNumber][4] === todaysCryptle.cryptle[4] &&
      guessCorrectness[currentGuessNumber][5] === todaysCryptle.cryptle[5]
    ) {
      setGameWon(true);
      setGameOver(true);
    }
  }, [guessCorrectness, currentGuess, todaysCryptle, currentGuessNumber]);

  const handleLetterClick = (letter) => {
    setErrors([]);
    setShowErrors(false);
    if (gameOver) return;
    if (currentGuess.length < 6) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const handleBackspace = () => {
    setErrors([]);
    setShowErrors(false);
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  useKeypress("Backspace", handleBackspace);

  const [showErrors, setShowErrors] = useState(false);

  const handleConfirmGuess = () => {
    const validGuess = checkIfValidGuess(
      currentGuess,
      validGuesses,
      errors,
      setErrors
    );

    if (validGuess) {
      const guessCorrectnessRow = calculateGuessCorrectness(
        currentGuess,
        todaysCryptle
      );
      setGuessCorrectness([...guessCorrectness, guessCorrectnessRow]);
      const gameComplete = checkIfGameComplete(currentGuess, todaysCryptle);
      if (gameComplete) {
        setGameWon(true);
        setGameOver(true);
      }
      setCurrentGuessNumber(currentGuessNumber + 1);
      setCurrentGuess("");
    } else {
      setShowErrors(true);
    }
  };

  useKeypress("Enter", (e) => {
    handleConfirmGuess();
  });

  return (
    <div>
      <Head>
        <title>Cryptle</title>
      </Head>
      <div className="flex flex-col items-center justify-between">
        <span className="text-white text-center">
          {"Today's Cryptle:"}
          <p className="font-bold text-xl">{`#${todaysCryptle.number}`}</p>
        </span>
        <GuessingArea
          color1={color1}
          color2={color2}
          gameComplete={gameWon}
          currentGuessNumber={currentGuessNumber}
          currentGuess={currentGuess}
          guessCorrectness={guessCorrectness}
        />
        {gameWon && (
          <div className="text-green-400 bg-black rounded-md p-4">
            You won in {currentGuessNumber} guesses!
          </div>
        )}
        {showErrors && (
          <div
            onClick={() => {
              setShowErrors(false);
              setErrors([]);
            }}
            className="text-red-400 bg-black rounded-md p-4 space-y-2"
          >
            {errors?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="max-w-xl mx-auto">
          <Keyboard
            handleLetterClick={handleLetterClick}
            handleBackspace={handleBackspace}
            handleConfirmGuess={handleConfirmGuess}
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const recents = await cache.get("recent-cryptles");
  const todaysCryptle = await cache.get("daily-cryptle");
  const cryptleBank = await cache.get("cryptle-bank");

  const { symbolMap } = cryptleBank;

  const { id: color1Id } = symbolMap.find(
    (symbol) =>
      symbol.symbol ===
      `${todaysCryptle.cryptle[0]}${todaysCryptle.cryptle[1]}${todaysCryptle.cryptle[2]}`
  );
  const { id: color2Id } = symbolMap.find(
    (symbol) =>
      symbol.symbol ===
      `${todaysCryptle.cryptle[3]}${todaysCryptle.cryptle[4]}${todaysCryptle.cryptle[5]}`
  );

  console.log(color1Id);

  const color1 = await (
    await fetch(`https://ath.ooo/api/vibes?asset=${color1Id}`)
  ).json();
  const color2 = await (
    await fetch(`https://ath.ooo/api/vibes?asset=${color2Id}`)
  ).json();

  return {
    props: {
      recents,
      todaysCryptle,
      cryptleBank,
      color1,
      color2,
    },
    revalidate: 60,
  };
}

export default Home;
