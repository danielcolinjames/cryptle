import GuessLetter from "./GuessLetter";

const GuessRow = () => {
  return (
    <div className="flex flex-row items-center justify-center space-x-1">
      <GuessLetter />
      <GuessLetter />
      <GuessLetter />
      <GuessLetter />
      <GuessLetter />
      <GuessLetter />
    </div>
  );
};

export default GuessRow;
