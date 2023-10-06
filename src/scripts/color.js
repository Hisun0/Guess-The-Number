const getColorFromCssVariable = (theme, color) => {
  const colors = {
    dark: {
      primary: '#00aaff',
      danger: '#ff3444',
      success: '#198753',
    },
    light: {
      primary: '#266ea6',
      danger: '#dc3545',
      success: '#198753',
    },
  };
  return colors[theme][color];
};

export default getColorFromCssVariable;
