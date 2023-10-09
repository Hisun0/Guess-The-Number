export default {
  translation: {
    play: {
      header: 'Game',
      guess: 'Guess',
      restart: 'Restart',
      attempts: {
        header: 'Attempts',
        text: 'This is where your attempts will be displayed',
      },
    },
    menu: {
      header: 'Menu',
      btn: {
        play: 'Play',
        rules: 'Rules',
        settings: 'Settings',
      },
    },
    rules: {
      header: 'Rules',
      paragraph: {
        first: 'This is a game about guessing numbers',
        second:
          'You need to enter a number in the required field. The game will tell you if the number you are looking for is greater or less. You have only 10 attempts, so be accurate!',
        third:
          'if you will win 5 times in a row, you will get a secret game (feature in development...)',
      },
      goodluck: 'Good Luck!',
    },
    settings: {
      header: 'Settings',
      language: {
        header: 'Change language',
        dropdown: {
          btn: 'Language',
          english: 'English',
          russian: 'Russian',
        },
      },
      theme: {
        header: 'Change theme',
        dropdown: {
          btn: 'Theme',
          dark: 'Dark',
          light: 'Light',
        },
      },
    },
    footer: {
      developer: 'Made by Rodion',
    },
    errors: {
      min: 'Number should be equal or more than 1',
      max: 'Number should be equal or less than 100',
      invalidType: 'Value should be a number',
      notAnInteger: 'Value should be an integer',
    },
    warnings: {
      less: 'Wrong! Try a smaller number',
      greater: 'Wrong! Try a bigger number',
    },
  },
};
