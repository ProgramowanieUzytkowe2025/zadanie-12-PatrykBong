import { useState, useEffect } from "react";

export function useKalkulator() {
  const [history, setHistory] = useState(() => {
    const saved = sessionStorage.getItem("kalkulatorHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.history || [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [numberA, setNumberA] = useState(() => {
    const saved = sessionStorage.getItem("kalkulatorHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.numberA || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const [numberB, setNumberB] = useState(() => {
    const saved = sessionStorage.getItem("kalkulatorHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.numberB || "";
      } catch {
        return "";
      }
    }
    return "";
  });

  const [wynik, setWynik] = useState(() => {
    const saved = sessionStorage.getItem("kalkulatorHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.wynik ?? null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [biggerNumber, setBiggerNumber] = useState(() => {
    const saved = sessionStorage.getItem("kalkulatorHistory");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const a = parsed.numberA ?? "";
        const b = parsed.numberB ?? "";
        if (a === "" || b === "") return null;
        if (Number(a) > Number(b)) return "liczba A jest większa";
        if (Number(b) > Number(a)) return "liczba B jest większa";
        return "liczba A i B są równe";
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    sessionStorage.setItem(
      "kalkulatorHistory",
      JSON.stringify({ history, numberA, numberB, wynik })
    );
  }, [history, numberA, numberB, wynik]);

  function whatBigger(a, b) {
    if (a === "" || b === "") return null;
    a = Number(a);
    b = Number(b);
    if (a > b) return "liczba A jest większa";
    if (b > a) return "liczba B jest większa";
    return "liczba A i B są równe";
  }

  function addHistory(a, b, operation, result) {
    setHistory(prev => [...prev, { a, b, operation, result }]);
  }

  function handleAdd() {
    if (numberA === "" || numberB === "") {
      setWynik("jedno z pól jest puste");
      return;
    }
    const result = Number(numberA) + Number(numberB);
    setWynik(result);
    addHistory(numberA, numberB, "+", result);
  }

  function handleSubtract() {
    if (numberA === "" || numberB === "") {
      setWynik("jedno z pól jest puste");
      return;
    }
    const result = Number(numberA) - Number(numberB);
    setWynik(result);
    addHistory(numberA, numberB, "-", result);
  }

  function handleMultiply() {
    if (numberA === "" || numberB === "") {
      setWynik("jedno z pól jest puste");
      return;
    }
    const result = Number(numberA) * Number(numberB);
    setWynik(result);
    addHistory(numberA, numberB, "*", result);
  }

  function handleDivide() {
    if (numberA === "" || numberB === "") {
      setWynik("jedno z pól jest puste");
      return;
    }
    if (Number(numberB) === 0) {
      setWynik("Błąd: dzielenie przez 0");
      return;
    }
    const result = Number(numberA) / Number(numberB);
    setWynik(result);
    addHistory(numberA, numberB, "/", result);
  }

  function loadFromHistory(index) {
    const item = history[index];
    setNumberA(item.a);
    setNumberB(item.b);
    setWynik(item.result);
    setBiggerNumber(whatBigger(item.a, item.b));
    setHistory(prev => prev.slice(0, index + 1));
  }

  useEffect(() => {
    setBiggerNumber(whatBigger(numberA, numberB));
  }, [numberA, numberB]);

  return {
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
  };
}
