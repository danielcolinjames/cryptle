const GuessLetter = ({ letter }) => {
  return (
    <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
      <span className="font-sans text-md">{letter}</span>
    </div>
  );
};

export default GuessLetter;
