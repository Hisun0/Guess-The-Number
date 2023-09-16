const validateUserGuess = (guess) => {
  const errors = [];
  const numberGuess = Number(guess);

  if (isNaN(numberGuess) || guess === '') errors.push('Not a number!');
  if (numberGuess > 100)
    errors.push('Your number bigger than limit (limit is 100)');
  if (numberGuess < 1)
    errors.push('Your number lower than minimum (minimum is 1)');

  return errors;
};

export default validateUserGuess;
