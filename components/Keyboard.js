import { useState } from "react";
import Key from "./Key";
import KeyboardRow from "./KeyboardRow";

const Keyboard = ({
  handleLetterClick,
  handleBackspace,
  handleConfirmGuess,
}) => {
  return (
    <div className="w-full space-y-0.5 absolute bottom-4 right-0 left-0 max-w-2xl mx-auto">
      <KeyboardRow className="px-5">
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
      <KeyboardRow className="px-10">
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
      <KeyboardRow className="px-1">
        <Key
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          }
          specialClick={handleConfirmGuess}
          specialClasses="bg-green-300"
        />
        <Key letter="Z" handleLetterClick={handleLetterClick} />
        <Key letter="X" handleLetterClick={handleLetterClick} />
        <Key letter="C" handleLetterClick={handleLetterClick} />
        <Key letter="V" handleLetterClick={handleLetterClick} />
        <Key letter="B" handleLetterClick={handleLetterClick} />
        <Key letter="N" handleLetterClick={handleLetterClick} />
        <Key letter="M" handleLetterClick={handleLetterClick} />
        <Key
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
              />
            </svg>
          }
          specialClick={handleBackspace}
          specialClasses="bg-red-300"
        />
      </KeyboardRow>
    </div>
  );
};

export default Keyboard;
