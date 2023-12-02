import { createTheme } from '@material-ui/core/styles';
import { ColorPalette } from './ColorPalette';

export default createTheme({
  palette: {
    primary: {
      main: ColorPalette.$azure04
    },
    secondary: {
      main: ColorPalette.$alert05
    },
    error: {
      main: ColorPalette.$alert01
    },
    text: {
      primary: ColorPalette.$slate01,
      secondary: ColorPalette.$slate03,
      disabled: ColorPalette.$slate05,
      hint: ColorPalette.$slate05
    },
    background: {
      default: ColorPalette.$slate08,
      paper: ColorPalette.$slate07
    },
    type: 'dark'
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
        backgroundColor: ColorPalette.$slate09,
        color: ColorPalette.$slate03
      }
    }
  }
});