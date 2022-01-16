import GuessLetter from "./GuessLetter";

const GuessRow = () => {
  return (
    <div className="bg-black w-full h-full">
      <div className="flex flex-row items-center justify-center">
        <GuessLetter />
        <GuessLetter />
        <GuessLetter />
        <GuessLetter />
        <GuessLetter />
        <GuessLetter />
      </div>
    </div>
  );
};

export default GuessRow;
