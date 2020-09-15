import React from 'react';
import Core from './core';
import Header from "./shared/Header";
import { LitteraProvider } from "react-littera";
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <LitteraProvider initialLocale="pl_PL" locales={[ "en_US", "pl_PL", "de_DE" ]}>
          <Header />
          <Core />
        </LitteraProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
