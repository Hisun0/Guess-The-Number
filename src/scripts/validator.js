import { setLocale, number } from 'yup';

const validateUserGuess = async (guess) => {
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
  return await schema.validate(userNumber);
};

export default validateUserGuess;
