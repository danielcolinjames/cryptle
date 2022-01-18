import classNames from "classnames";

const KeyboardRow = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "flex flex-row w-full items-center justify-center space-x-0.5",
        className
      )}
    >
      {children}
    </div>
  );
};

export default KeyboardRow;
