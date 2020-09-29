import { createMuiTheme } from '@material-ui/core/styles';

export const theme = (props) => createMuiTheme({
  palette: {
    type: props.appConfig.themeType,
    background: {
      paper: props.appConfig.themeType === 'dark' ? '#3810ae' : '#FFFF',
    },
    innerCard: {
      light: '#FFFF',
      dark: '#461eb7',
    },
    outterCard: {
      light: '#FFFF',
      dark: '#3810ae',
    },
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xs: 0, sm: 450, md: 600, lg: 900, xl: 1200, test: 1120,
    },
  },
});
