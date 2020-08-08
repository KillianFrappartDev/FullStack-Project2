import { createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#252329",
//     },
//     secondary: {
//       main: "#120F13",
//     },
//   },
//   background: {
//       default: "#252329",
//       paper: "#000000"
//   }
// });

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#252329",
    },
    secondary: {
        main: "#120F13"
    }
  },
});

export default darkTheme;