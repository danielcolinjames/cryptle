const Key = ({ letter, specialClasses, handleLetterClick, specialClick }) => {
  if (specialClasses) {
    return (
      <button onClick={specialClick} className={specialClasses}>
        {letter}
      </button>
    );
  }
  return (
    <button
      onClick={() => handleLetterClick(letter)}
      className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded-md"
    >
      <span className="font-sans text-md">{letter}</span>
    </button>
  );
};

export default Key;
