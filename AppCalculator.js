import React, { useState, useEffect, useReducer } from "react";
import { AppActionButton } from "./AppActionButton";
import { AppCalculationHistory } from "./AppCalculationHistory";
import { useKalkulator } from "./useKalkulator";

const initialStatus = "Brak";

function statusReducer(state, action) {
  switch (action.type) {
    case "SET_NUMBER_A":
      return "Zmodyfikowano wartość liczby A";
    case "SET_NUMBER_B":
      return "Zmodyfikowano wartość liczby B";
    case "CALCULATION":
      return "Wykonano obliczenia";
    case "LOAD_HISTORY":
      return "Przywrócono historyczny stan";
    case "RESET":
      return "Brak";
    default:
      return state;
  }
}

export function AppCalculator() {
    const {
        numberA,
        setNumberA,
        numberB,
        setNumberB,
        wynik,
        biggerNumber,
        history,
        handleAdd,
        handleSubtract,
        handleMultiply,
        handleDivide,
        loadFromHistory
    } = useKalkulator();

    const [status, dispatchStatus] = useReducer(statusReducer, initialStatus);

    const handleChangeA = (value) => {
        setNumberA(value);
        dispatchStatus({ type: "SET_NUMBER_A" });
    };

    const handleChangeB = (value) => {
        setNumberB(value);
        dispatchStatus({ type: "SET_NUMBER_B" });
    };

    const handleAddClick = () => {
        handleAdd();
        dispatchStatus({ type: "CALCULATION" });
    };

    const handleSubtractClick = () => {
        handleSubtract();
        dispatchStatus({ type: "CALCULATION" });
    };

    const handleMultiplyClick = () => {
        handleMultiply();
        dispatchStatus({ type: "CALCULATION" });
    };

    const handleDivideClick = () => {
        handleDivide();
        dispatchStatus({ type: "CALCULATION" });
    };

    const handleLoadFromHistory = (index) => {
        loadFromHistory(index);
        dispatchStatus({ type: "LOAD_HISTORY" });
    };

    return(
        <div>
                <label>Pole A:</label>
                <input type="number" value={numberA} onChange={(e) => handleChangeA(e.target.value)}/>
                <label>Pole B:</label>
                <input type="number" value={numberB} onChange={(e) => handleChangeB(e.target.value)}/>
                
                <div style={{ margin: "10px 0" }}>
                    <AppActionButton label="Dodaj" onClick={handleAddClick} />
                    <AppActionButton label="Odejmij" onClick={handleSubtractClick} />
                    <AppActionButton label="Mnoż" onClick={handleMultiplyClick} />
                    <AppActionButton label="Dziel" onClick={handleDivideClick} />    
                </div>

                <input type="text" value={biggerNumber} readOnly/>

                <label>Wynik:</label>
                <input type="text" value={wynik} readOnly/>

                <p><strong>Ostatnie działanie:</strong> {status}</p>

                <AppCalculationHistory history={history}  onLoad={handleLoadFromHistory}/>
        </div>
    )
}