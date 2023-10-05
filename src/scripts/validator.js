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
  // if (isNaN(userNumber)) return 'errors.invalidType'; // я просто не понял как через setLocale задать ошибку для NaN

  const schema = number().required().integer().min(1).max(100);
  return await schema.validate(userNumber);
};

export default validateUserGuess;
