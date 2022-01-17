const GuessLetter = ({ letter }) => {
  return (
    <div className="w-10 h-10 bg-gray-600 flex items-center justify-center rounded-lg">
      <span className="font-sans text-md">{letter}</span>
    </div>
  );
};

export default GuessLetter;
