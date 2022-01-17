import { useState } from "react";
import Key from "./Key";
import KeyboardRow from "./KeyboardRow";

const Keyboard = ({ handleLetterClick, handleBackspace }) => {
  return (
    <div className="bg-black w-full space-y-0.5">
      <KeyboardRow>
        <Key letter="Q" handleLetterClick={handleLetterClick} />
        <Key letter="W" handleLetterClick={handleLetterClick} />
        <Key letter="E" handleLetterClick={handleLetterClick} />
        <Key letter="R" handleLetterClick={handleLetterClick} />
        <Key letter="T" handleLetterClick={handleLetterClick} />
        <Key letter="Y" handleLetterClick={handleLetterClick} />
        <Key letter="U" handleLetterClick={handleLetterClick} />
        <Key letter="I" handleLetterClick={handleLetterClick} />
        <Key letter="O" handleLetterClick={handleLetterClick} />
        <Key letter="P" handleLetterClick={handleLetterClick} />
      </KeyboardRow>
      <KeyboardRow>
        <Key letter="A" handleLetterClick={handleLetterClick} />
        <Key letter="S" handleLetterClick={handleLetterClick} />
        <Key letter="D" handleLetterClick={handleLetterClick} />
        <Key letter="F" handleLetterClick={handleLetterClick} />
        <Key letter="G" handleLetterClick={handleLetterClick} />
        <Key letter="H" handleLetterClick={handleLetterClick} />
        <Key letter="J" handleLetterClick={handleLetterClick} />
        <Key letter="K" handleLetterClick={handleLetterClick} />
        <Key letter="L" handleLetterClick={handleLetterClick} />
      </KeyboardRow>
      <KeyboardRow>
        <Key
          letter="->"
          specialClasses="w-20 bg-white rounded-md h-8 flex items-center justify-center"
        />
        <Key letter="Z" handleLetterClick={handleLetterClick} />
        <Key letter="X" handleLetterClick={handleLetterClick} />
        <Key letter="C" handleLetterClick={handleLetterClick} />
        <Key letter="V" handleLetterClick={handleLetterClick} />
        <Key letter="B" handleLetterClick={handleLetterClick} />
        <Key letter="N" handleLetterClick={handleLetterClick} />
        <Key letter="M" handleLetterClick={handleLetterClick} />
        <Key
          letter="<-"
          specialClasses="w-20 bg-white rounded-md h-8 flex items-center justify-center"
          specialClick={handleBackspace}
        />
      </KeyboardRow>
    </div>
  );
};

export default Keyboard;
