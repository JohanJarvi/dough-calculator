import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#3F4E4F',
      dark: '#2C3639',
    },
    secondary: {
      main: '#DCD7C9',
      dark: '#A27B5C'
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;