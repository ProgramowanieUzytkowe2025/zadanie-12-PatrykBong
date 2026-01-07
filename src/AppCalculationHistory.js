import React from "react";

export function AppCalculationHistory({ history, onLoad }) {
  if (!history || history.length === 0) {
    return <p>Brak wykonanych działań.</p>;
  }

  return (
    <table border="1" style={{ marginTop: "20px", width: "100%", textAlign: "center" }}>
      <thead>
        <tr>
          <th>Liczba A</th>
          <th>Liczba B</th>
          <th>Operacja</th>
          <th>Wynik</th>
          <th>Akcja</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => (
          <tr key={index}>
            <td>{item.a}</td>
            <td>{item.b}</td>
            <td>{item.operation}</td>
            <td>{item.result}</td>
            <td> <button onClick={() => onLoad(index)}>Wczytaj</button> </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}