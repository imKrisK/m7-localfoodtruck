import { createContext } from 'react';

export const themes = {
  light: {
    foreground: '#333333',
    background: '#BAE2FF',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
  blue: {
    foreground: '#ffffff',
    background: '#007bff',
  },
};

export const MyThemeContext = createContext(themes.light);
