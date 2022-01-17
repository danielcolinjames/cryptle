import Head from "next/head";
import { useEffect, useState } from "react";
import GuessingArea from "../components/GuessingArea";
import Keyboard from "../components/Keyboard";
import cache from "../data/client-cache";

const Home = ({ todaysCryptle, cryptleBank }) => {
  const { validGuesses } = cryptleBank;

  const [gameOver, setGameOver] = useState(false);

  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessCorrectness, setGuessCorrectness] = useState([]);

  console.log(gameOver);
  console.log(guessCorrectness);

  useEffect(() => {
    if (currentGuessNumber === 6) {
      setGameOver(true);
    }
  }, [currentGuessNumber, guessCorrectness]);

  const handleLetterClick = (letter) => {
    if (gameOver) return;
    if (currentGuess.length < 6) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const [showErrors, setShowErrors] = useState(false);

  const handleConfirmGuess = () => {
    const validGuess = checkIfValidGuess(currentGuess);

    if (validGuess) {
      setCurrentGuessNumber(currentGuessNumber + 1);
      setCurrentGuess("");
      const guessCorrectnessRow = calculateGuessCorrectness();
      const guessCorrectnessArray = [...guessCorrectness, guessCorrectnessRow];
      setGuessCorrectness(guessCorrectnessArray);
    } else {
      setShowErrors(true);
    }
  };

  const calculateGuessCorrectness = () => {
    const currentGuessLetters = currentGuess.split("");
    const todaysCryptleLetters = todaysCryptle.cryptle.split("");

    const newGuessCorrectnessRow = [];

    currentGuessLetters.forEach((letter, index) => {
      if (letter === todaysCryptleLetters[index]) {
        newGuessCorrectnessRow[index] = 1;
      } else if (todaysCryptleLetters.includes(letter)) {
        newGuessCorrectnessRow[index] = -1;
      }
    });

    return newGuessCorrectnessRow;
  };

  const [errors, setErrors] = useState([]);

  const checkIfValidGuess = (guess) => {
    if (guess.length !== 6) {
      return false;
    }

    const guessLetters = guess.split("");

    const [guessA, guessB, guessC, guessD, guessE, guessF] = guessLetters;
    const [cryptleA, cryptleB, cryptleC, cryptleD, cryptleE, cryptleF] =
      todaysCryptle.cryptle.split("");

    if (
      guessA === cryptleA &&
      guessB === cryptleB &&
      guessC === cryptleC &&
      guessD === cryptleD &&
      guessE === cryptleE &&
      guessF === cryptleF
    ) {
      setGameOver(true);
    }

    const firstTickerValid = validGuesses.includes(
      `${guessA}${guessB}${guessC}`
    );
    const secondTickerValid = validGuesses.includes(
      `${guessD}${guessE}${guessF}`
    );
    const fullCryptoNameValid = validGuesses.includes(
      `${guessA}${guessB}${guessC}${guessD}${guessE}${guessF}`
    );

    if ((firstTickerValid && secondTickerValid) || fullCryptoNameValid) {
      setErrors([]);
      return true;
    } else {
      const newErrors = errors;
      if (!firstTickerValid) {
        newErrors.push(
          `${guessA}${guessB}${guessC} is not a valid crypto ticker`
        );
      }
      if (!secondTickerValid) {
        newErrors.push(
          `${guessD}${guessE}${guessF} is not a valid crypto ticker`
        );
      }
      if (!firstTickerValid && !secondTickerValid && !fullCryptoNameValid) {
        newErrors.push(
          `${guessA}${guessB}${guessC}${guessD}${guessE}${guessF} is not a valid crypto name`
        );
      }
      setErrors(newErrors);
      return false;
    }
  };

  return (
    <div>
      <Head>
        <title>Cryptle</title>
      </Head>
      <div className="flex flex-col items-center justify-between h-full">
        <span className="text-white text-center">
          {"Today's Cryptle:"}
          <p className="font-bold text-xl">{`#${todaysCryptle.number}`}</p>
        </span>
        <GuessingArea
          currentGuessNumber={currentGuessNumber}
          currentGuess={currentGuess}
          guessCorrectness={guessCorrectness}
        />
        {showErrors && (
          <div
            onClick={() => {
              setShowErrors(false);
              setErrors([]);
            }}
            className="text-red-400 bg-black rounded-md"
          >
            {errors.map((error) => (
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

  return {
    props: {
      recents,
      todaysCryptle,
      cryptleBank,
    },
    revalidate: 60,
  };
}

export default Home;
