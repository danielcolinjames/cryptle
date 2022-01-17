const KeyboardRow = ({ children }) => {
  return (
    <div className="flex flex-row w-full items-center justify-center space-x-0.5">
      {children}
    </div>
  );
};

export default KeyboardRow;
