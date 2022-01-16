import Head from "next/head";
import { useState } from "react";
import GuessingArea from "../components/GuessingArea";
import Keyboard from "../components/Keyboard";

const Home = () => {
  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  return (
    <div>
      <Head>
        <title>Cryptle</title>
      </Head>
      <div className="flex flex-col items-center justify-between h-full">
        <GuessingArea currentGuessNumber={currentGuessNumber} />
        <div className="max-w-xl mx-auto">
          <Keyboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
