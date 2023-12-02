import { createTheme } from '@material-ui/core/styles';
import { ColorPalette } from './ColorPalette';

export default createTheme({
  palette: {
    primary: {
      main: ColorPalette.$azure07
    },
    secondary: {
      main: ColorPalette.$alert05
    },
    error: {
      main: ColorPalette.$alert01
    },
    text: {
      primary: ColorPalette.$graphite10,
      secondary: ColorPalette.$graphite07,
      disabled: ColorPalette.$graphite04,
      hint: ColorPalette.$graphite06
    },
    background: {
      default: '#EBF1F4',
      paper: ColorPalette.$white
    },
    type: 'light'
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: ColorPalette.$azure07,
        color: ColorPalette.$white
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: ColorPalette.$graphite02,
        color: ColorPalette.$graphite06
      }
    }
  }
});