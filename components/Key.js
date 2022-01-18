import useKeypress from "react-use-keypress";

const Key = ({
  letter,
  specialClasses,
  handleLetterClick,
  specialClick,
  icon,
}) => {
  useKeypress([`${letter?.toLowerCase()}`, `${letter?.toUpperCase()}`], (e) => {
    console.log(letter);
    if (!!letter && !specialClick && e.key.toUpperCase() === letter) {
      handleLetterClick(letter);
    }
  });

  if (specialClasses) {
    return (
      <button onClick={specialClick} className={specialClasses}>
        {icon}
      </button>
    );
  }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleLetterClick(letter);
      }}
      className="bg-gray-300 flex items-center justify-center rounded-md px-3 py-2 md:px-4 md:py-3 outline-none focus:outline-none focus:bg-gray-50"
    >
      <span className="font-sans text-md font-black text-sm md:text-lg">
        {letter}
      </span>
    </button>
  );
};

export default Key;
