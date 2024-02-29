import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d0d2db',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export const customColors = {
  loginGradient: {
    bg: '#090a2b',
    fg: '#0b5250'
  },
  wordsGradient: {
    bg: '#0c0b43',
    fg: '#3d2525'
  },
  quizGradient: {
    bg: '#16010b',
    fg: '#141e46'
  },
}

export default theme;