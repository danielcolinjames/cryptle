import Head from "next/head";
import { useState } from "react";
import GuessingArea from "../components/GuessingArea";
import Keyboard from "../components/Keyboard";
import cache from "../data/client-cache";

const Home = ({ recents, todaysCryptle }) => {
  const [currentGuessNumber, setCurrentGuessNumber] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");

  const handleLetterClick = (letter) => {
    // setCurrentGuess(currentGuess + e.target.innerText);
    if (currentGuess.length < 6) {
      setCurrentGuess(currentGuess + letter);
    }
  };

  const handleBackspace = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  return (
    <div>
      <Head>
        <title>Cryptle</title>
      </Head>
      <div className="flex flex-col items-center justify-between h-full">
        <span className="text-white">
          {"Today's Word:"}
          <p className="font-bold text-xl">{`#${todaysCryptle.number}`}</p>
          <p className="bg-black text-red-400">{todaysCryptle.cryptle}</p>
        </span>
        <GuessingArea currentGuessNumber={currentGuessNumber} />
        <span>{currentGuess}</span>
        {console.log(currentGuess)}
        <div className="max-w-xl mx-auto">
          <Keyboard
            handleLetterClick={handleLetterClick}
            handleBackspace={handleBackspace}
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const recents = await cache.get("recent-cryptles");
  const todaysCryptle = await cache.get("daily-cryptle");

  return {
    props: {
      recents,
      todaysCryptle,
    },
    revalidate: 60,
  };
}

export default Home;
