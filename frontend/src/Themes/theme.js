import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#252329',
    },
    secondary: {
      main: '#120F13',
    },
  },
});

export default darkTheme;
