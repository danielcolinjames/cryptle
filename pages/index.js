import Head from "next/head";
import { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";
import GuessingArea from "../components/GuessingArea";
import Keyboard from "../components/Keyboard";
import cache from "../data/client-cache";
import { formatDistanceToNowStrict, addDays } from "date-fns";
import {
  calculateGuessCorrectness,
  checkIfGameComplete,
  checkIfValidGuess,
  generateShareText,
} from "../game-logic";
import { setCookies, checkCookies, getCookie } from "cookies-next";

import Clipboard from "react-clipboard.js";
import Image from "next/image";
import GuessLetter from "../components/GuessLetter";
import IntroSection from "../components/IntroSection";

const Home = ({ todaysCryptle, cryptleBank, color1, color2 }) => {
  const [seenIntro, setSeenIntro] = useState(false);

  useEffect(() => {
    if (seenIntro) {
      setCookies("cryptle-seen-intro", true, {
        expires: new Date(Number(new Date() + 365 * 24 * 60 * 60 * 1000)),
      });
    }
  }, [seenIntro]);

  useEffect(() => {
    if (checkCookies("cryptle-seen-intro")) {
      setSeenIntro(true);
    }
  }, []);

  const date = addDays(new Date(todaysCryptle.date), 1);
  const time = formatDistanceToNowStrict(date, {
    addSuffix: true,
  });
  const { validGuesses } = cryptleBank;

  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessCorrectness, setGuessCorrectness] = useState([]);

  const [guessHistory, setGuessHistory] = useState([]);

  const [errors, setErrors] = useState([]);

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const cookieExists = checkCookies(`cryptle-${todaysCryptle.number}`);
    const cookie = cookieExists
      ? getCookie(`cryptle-${todaysCryptle.number}`)
      : null;
    const parsedCookie = cookie ? JSON.parse(cookie) : null;

    const initialGuessCorrectness = parsedCookie?.guessCorrectness
      ? parsedCookie.guessCorrectness
      : [];
    const initialGuessHistory = parsedCookie?.guessHistory
      ? parsedCookie.guessHistory
      : [];
    const initialCurrentGuessNumber = parsedCookie?.currentGuessNumber
      ? parsedCookie.currentGuessNumber
      : 0;
    const initialGameWon = parsedCookie?.gameWon ? parsedCookie.gameWon : false;
    const initialGameOver = parsedCookie?.gameOver
      ? parsedCookie.gameOver
      : false;

    setGuessCorrectness(initialGuessCorrectness);
    setGuessHistory(initialGuessHistory);
    setCurrentGuessNumber(initialCurrentGuessNumber);
    setGameWon(initialGameWon);
    setGameOver(initialGameOver);
  }, [todaysCryptle.number]);

  useEffect(() => {
    if (currentGuessNumber === 6) {
      setGameOver(true);
    }
    return () => {};
  }, [currentGuessNumber]);

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

  const [shareLinkText, setShareLinkText] = useState("");

  const handleConfirmGuess = async () => {
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
      setGuessHistory([...guessHistory, currentGuess]);
      const gameComplete = checkIfGameComplete(currentGuess, todaysCryptle);
      const shareTextContent = generateShareText(guessCorrectness);

      if (gameComplete) {
        setGameWon(true);
        setGameOver(true);
        setShareLinkText(shareTextContent);
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

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newShareText = generateShareText(
      guessCorrectness,
      todaysCryptle,
      currentGuessNumber
    );
    setShareLinkText(newShareText);

    setCookies(
      `cryptle-${todaysCryptle.number}`,
      { guessCorrectness, guessHistory, currentGuessNumber, gameWon, gameOver },
      {
        expires: new Date(Number(new Date() + 365 * 24 * 60 * 60 * 1000)),
      }
    );
  }, [
    guessCorrectness,
    gameWon,
    gameOver,
    todaysCryptle,
    currentGuessNumber,
    guessHistory,
  ]);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  const pageTitle = `Cryptle - ${todaysCryptle.number}`;

  const pageDescription =
    "A simple crypto ticker guessing game for crypto enthusiasts.";
  const pageUrl = "https://cryptle.app";
  const pageOgImageUrl = "https://cryptle.app/images/og.png";

  return (
    <div>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#79eda7" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="keywords" content="crypto, game, wordle" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        {/* <!-- Primary Meta Tags --> */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageOgImageUrl} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={pageOgImageUrl} />
      </Head>
      <div className="flex flex-col items-center justify-between">
        <div className="pt-3 md:pt-4">
          <span className="text-white font-bold font-sans text-center flex items-center justify-center">
            <Image
              width={15}
              height={15}
              src="/images/cryptle-logo.png"
              alt=""
            />
            <span className="ml-2">Cryptle</span>
          </span>
          <span className="flex items-center justify-center">
            <p className="font-bold text-lg md:text-4xl text-gray-300">{`#${todaysCryptle.number}`}</p>
          </span>
        </div>
        <GuessingArea
          color1={color1}
          color2={color2}
          gameComplete={gameWon || gameOver}
          currentGuessNumber={currentGuessNumber}
          currentGuess={currentGuess}
          guessHistory={guessHistory}
          guessCorrectness={guessCorrectness}
        />
        {!gameOver && !gameWon && !seenIntro && (
          <IntroSection setSeenIntro={setSeenIntro} />
        )}
        {gameOver && !gameWon && (
          <div className="absolute z-50 bottom-40 md:bottom-96 text-green-400 bg-gray-700 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 md:px-14 py-5 md:py-10 flex flex-col items-center justify-start">
            <span className="">Good effort! The answer was</span>
            <p className="text-2xl text-white font-bold mt-2 mb-4">
              {todaysCryptle.cryptle}
            </p>
            <Clipboard
              data-clipboard-text={shareLinkText}
              onClick={() => setCopied(true)}
            >
              <div className="bg-gray-200 bg-opacity-90 rounded-md p-2 text-black font-sans font-medium">
                {copied ? (
                  <p>Copied to clipboard</p>
                ) : (
                  <p>Copy game result to clipboard</p>
                )}
              </div>
            </Clipboard>
            <p className="mt-4">New Cryptle {time}</p>
          </div>
        )}
        {gameWon && gameOver && (
          <div className="absolute z-50 bottom-40 md:bottom-96 text-green-400 bg-gray-700 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 md:px-14 py-5 md:py-10 flex flex-col items-center justify-start">
            <span className="mb-4">
              You won in {currentGuessNumber}{" "}
              {currentGuessNumber === 1 ? "guess" : "guesses"}!
            </span>
            <Clipboard
              data-clipboard-text={shareLinkText}
              onClick={() => setCopied(true)}
            >
              <div className="bg-gray-200 bg-opacity-90 rounded-md p-2 text-black font-sans font-medium">
                {copied ? (
                  <p>Copied to clipboard</p>
                ) : (
                  <p>Copy game result to clipboard</p>
                )}
              </div>
            </Clipboard>
            <p className="mt-4">New Cryptle {time}</p>
          </div>
        )}
        {showErrors && (
          <div
            className="absolute z-50 bottom-40 md:bottom-96 text-red-400 bg-gray-700 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 md:px-14 py-5 flex flex-col items-center justify-start text-xs"
            onClick={() => {
              setShowErrors(false);
              setErrors([]);
            }}
          >
            {errors?.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}
        <div className="max-w-xl mx-auto flex">
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
