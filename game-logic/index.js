export const calculateGuessCorrectness = (currentGuess, todaysCryptle) => {
  const currentGuessLetters = currentGuess.split("");
  const todaysCryptleLetters = todaysCryptle.cryptle.split("");

  const newGuessCorrectnessRow = [];

  currentGuessLetters.forEach((letter, index) => {
    if (letter === todaysCryptleLetters[index]) {
      newGuessCorrectnessRow[index] = 1;
    } else if (todaysCryptleLetters.includes(letter)) {
      newGuessCorrectnessRow[index] = -1;
    } else {
      newGuessCorrectnessRow[index] = 0;
    }
  });

  return newGuessCorrectnessRow;
};

export const checkIfGameComplete = (currentGuess, todaysCryptle) =>
  currentGuess === todaysCryptle.cryptle;

export const checkIfValidGuess = (guess, validGuesses, errors, setErrors) => {
  if (guess.length < 6) {
    setErrors([...errors, "Guess must be 6 letters long"]);
    return false;
  }

  const guessLetters = guess.split("");

  const [guessA, guessB, guessC, guessD, guessE, guessF] = guessLetters;

  const firstTickerValid = validGuesses.includes(`${guessA}${guessB}${guessC}`);
  const secondTickerValid = validGuesses.includes(
    `${guessD}${guessE}${guessF}`
  );

  if (firstTickerValid && secondTickerValid) {
    return true;
  } else {
    const newErrors = [];
    if (!firstTickerValid) {
      newErrors.push(
        `${guessA}${guessB}${guessC} is not a valid 3-letter crypto ticker in the top 100`
      );
    }
    if (!secondTickerValid) {
      newErrors.push(
        `${guessD}${guessE}${guessF} is not a valid 3-letter crypto ticker in the top 100`
      );
    }
    setErrors(newErrors);
    return false;
  }
};

export const generateShareText = (
  guessCorrectness,
  todaysCryptle,
  currentGuessNumber
) => {
  const resultText = `Cryptle ${todaysCryptle?.number}: ${currentGuessNumber}/6\n`;
  guessCorrectness.forEach((row) => {
    row.map((item, i, { length }) => {
      if (item === 1) {
        resultText += `🟩`;
      } else if (item === -1) {
        resultText += `🟨`;
      } else {
        resultText += `⬛️`;
      }
      if (i === length - 1) {
        resultText += `\n`;
      }
    });
  });
  return resultText;
};
