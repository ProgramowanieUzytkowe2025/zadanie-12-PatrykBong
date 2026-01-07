import { createContext, useContext, useState } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [fontSize, setFontSize] = useState(16);

  return (
    <FontContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  return useContext(FontContext);
}
