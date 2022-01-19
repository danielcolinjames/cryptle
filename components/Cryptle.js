import Head from "next/head";
import { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";
import GuessingArea from "../components/GuessingArea";
import Keyboard from "../components/Keyboard";
import { formatDistanceToNowStrict, addDays, format } from "date-fns";
import {
  calculateGuessCorrectness,
  checkIfGameComplete,
  checkIfValidGuess,
  generateShareText,
} from "../game-logic";
import { setCookies, checkCookies, getCookie } from "cookies-next";

import Clipboard from "react-clipboard.js";
import IntroSection from "../components/IntroSection";
import * as ga from "../lib/ga";
import NavSection from "./NavSection";
import MetaTags from "./MetaTags";

const Cryptle = ({
  todaysCryptle,
  cryptleBank,
  color1,
  color2,
  isOldCryptle = false,
}) => {
  const [seenIntro, setSeenIntro] = useState(false);

  const formattedDate = format(new Date(todaysCryptle.date), "MMM d, yyyy");

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

  const [instructionsHidden, setInstructionsHidden] = useState(true);

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
    ga.event({
      action: "submit_guess",
      params: {
        cryptleNumber: todaysCryptle.number,
        cryptle: todaysCryptle.cryptle,
        guess: currentGuess,
        guessNuber: currentGuessNumber,
      },
    });
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
        ga.event({
          action: "game_won",
          params: {
            cryptleNumber: todaysCryptle.number,
            cryptle: todaysCryptle.cryptle,
            guesses: currentGuessNumber,
          },
        });
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

  const pageTitle = `Cryptle - #${todaysCryptle.number}`;

  const pageDescription = `Cryptle #${todaysCryptle.number}. Cryptle is a simple crypto ticker guessing game for crypto enthusiasts.`;
  const pageUrl = `https://cryptle.app/${todaysCryptle.number}`;
  const pageOgImageUrl = "https://cryptle.app/images/og.png";

  return (
    <div>
      <MetaTags
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageUrl={pageUrl}
        pageOgImageUrl={pageOgImageUrl}
      />
      <div className="flex flex-col items-center justify-between">
        {!instructionsHidden && (
          <IntroSection setSeenIntro={setInstructionsHidden} />
        )}
        <NavSection
          setInstructionsHidden={setInstructionsHidden}
          todaysCryptle={todaysCryptle}
          formattedDate={formattedDate}
          isOldCryptle={isOldCryptle}
        />
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
          <div className="absolute z-40 bottom-40 md:bottom-96 text-green-400 bg-gray-700 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 md:px-14 py-5 md:py-10 flex flex-col items-center justify-start min-w-[360px]">
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
            {!isOldCryptle && <p className="mt-4">New Cryptle {time}</p>}
          </div>
        )}
        {gameWon && gameOver && (
          <div className="absolute z-40 bottom-40 md:bottom-96 text-green-400 bg-gray-700 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 md:px-14 py-5 md:py-10 flex flex-col items-center justify-start min-w-[360px]">
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
            {!isOldCryptle && <p className="mt-4">New Cryptle {time}</p>}
          </div>
        )}
        {showErrors && (
          <div
            className="absolute z-40 bottom-40 md:bottom-96 text-red-400 bg-gray-700 bg-opacity-90 backdrop-blur-sm rounded-xl px-6 md:px-14 py-5 flex flex-col items-center justify-start text-xs"
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

export default Cryptle;
