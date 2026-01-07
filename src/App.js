import React, { useState } from "react";
import literaA from './literaA.jpg';
import './App.css';
import {AppCalculator} from './AppCalculator.js';
import {AppHeader} from './AppHeader.js';
import { FontProvider, useFont } from "./FontProvider";

function App() {
  //const [fontSize, setFontSize] = useState(16); // domyślny font-size w px
  const { fontSize } = useFont();

  //const changeFontSize = (size) => {
  //  setFontSize(size);
  //};

  return (
    <div className="App" style={{ fontSize: `${fontSize}px` }}>
      <AppHeader>
          <strong>Autor: Patryk Bonk</strong>
      </AppHeader>
      <AppCalculator/>
    </div>
  );
}

export default App;
