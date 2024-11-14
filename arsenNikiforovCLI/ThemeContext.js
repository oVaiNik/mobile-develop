import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Темная тема по умолчанию

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const themeColors = {
    dark: {
      background: '#36393F',
      text: '#FFFFFF',
      primary: '#7289DA',
      secondary: '#2F3136',
      accent: '#5865F2',
    },
    light: {
      background: '#FFFFFF',
      text: '#000000',
      primary: '#7289DA',
      secondary: '#F2F3F5',
      accent: '#5865F2',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
