import React from 'react';
import Core from './core';
import Header from "./shared/Header";
import { LitteraProvider } from "react-littera";

function App() {
  return (
    <div className="App">
      <LitteraProvider initialLocale="pl_PL" locales={[ "en_US", "pl_PL", "de_DE" ]}>
        <Header />
        <Core />
      </LitteraProvider>
    </div>
  );
}

export default App;
