// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8a2be2', // Set your primary color here
    },
    secondary: {
      main: '#ffffff', // Set your secondary color here
    },
    customGreen: {
      main: '#00FF00', // Set your custom green color here
    },

  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontWeightBold: 700,
  },
  spacing: 8, // Define a base spacing unit (8px in this example)
  margins: {
    margin1x: '8px', // Custom margin value
    margin2x: '16px', // Custom margin value
    // Add more margin values as needed
  },
});

export default theme;
