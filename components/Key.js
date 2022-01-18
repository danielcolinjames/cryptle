import classNames from "classnames";
import useKeypress from "react-use-keypress";

const Key = ({
  letter,
  handleLetterClick,
  specialClick,
  specialClasses,
  icon,
}) => {
  useKeypress([`${letter?.toLowerCase()}`, `${letter?.toUpperCase()}`], (e) => {
    if (!!letter && !specialClick && e.key.toUpperCase() === letter) {
      handleLetterClick(letter);
    }
  });

  if (specialClick) {
    return (
      <button
        onClick={specialClick}
        className={classNames(
          "w-14 rounded-md flex items-center justify-center px-2 py-3 md:px-4 md:py-4",
          specialClasses
        )}
      >
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
      className="bg-gray-400 flex items-center justify-center rounded-lg w-12 md:w-full py-3.5 outline-none focus:outline-none focus:bg-gray-50"
    >
      <span className="font-sans text-md font-black text-sm md:text-lg">
        {letter}
      </span>
    </button>
  );
};

export default Key;
