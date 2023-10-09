import { setLocale, number } from 'yup';

const validateUserGuess = (guess) => {
  setLocale({
    number: {
      min: 'errors.min',
      max: 'errors.max',
      integer: 'errors.notAnInteger',
    },
  });

  const userNumber = Number(guess);

  const schema = number()
    .typeError('errors.invalidType') // setLocale почему то не работал для typeError, поэтому вот так
    .integer()
    .min(1)
    .max(100);

  return new Promise((resolve, reject) => {
    schema
      .validate(userNumber)
      .then((userGuess) => resolve(userGuess))
      .catch((err) => reject(err));
  });
};

export default validateUserGuess;
