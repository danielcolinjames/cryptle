import { useState } from "react";
import Key from "./Key";
import KeyboardRow from "./KeyboardRow";

const Keyboard = () => {
  const [currentGuess, setCurrentGuess] = useState("");

  const handleClick = (e) => {
    // setCurrentGuess(currentGuess + e.target.innerText);
  };
  return (
    <div className="bg-gray-700 w-full">
      <KeyboardRow>
        <Key letter="Q" />
        <Key letter="W" />
        <Key letter="E" />
        <Key letter="R" />
        <Key letter="T" />
        <Key letter="Y" />
        <Key letter="U" />
        <Key letter="I" />
        <Key letter="O" />
        <Key letter="P" />
      </KeyboardRow>
      <KeyboardRow>
        <Key letter="A" />
        <Key letter="S" />
        <Key letter="D " />
        <Key letter=" F" />
        <Key letter=" G" />
        <Key letter=" H" />
        <Key letter=" J" />
        <Key letter=" K" />
        <Key letter=" L" />
      </KeyboardRow>
      <KeyboardRow>
        <Key letter="Z" />
        <Key letter="X" />
        <Key letter="C " />
        <Key letter="V" />
        <Key letter=" B" />
        <Key letter="N" />
        <Key letter="M" />
      </KeyboardRow>
    </div>
  );
};

export default Keyboard;
