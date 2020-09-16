import React from 'react';
import Core from './core';
import Header from "./shared/Header";
import { LitteraProvider } from "react-littera";
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const preset = {
  string: {
    en_US: "Text",
    pl_PL: "Tekst",
    de_DE: "Text",
  },
  boolean: {
    en_US: "Switch",
    pl_PL: "Przełącznik",
    de_DE: "Schalter",
  },
  number: {
    en_US: "Number",
    pl_PL: "Liczba",
    de_DE: "Nummer",
  },
  array: {
    en_US: "List",
    pl_PL: "Lista",
    de_DE: "Liste",
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F6406E"
    }
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <LitteraProvider detectLocale preset={preset} initialLocale="pl_PL" locales={["en_US", "pl_PL", "de_DE"]}>
            <Header />
            <Core />
          </LitteraProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
