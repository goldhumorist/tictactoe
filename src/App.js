import { useState, useEffect } from "react";
import "./App.scss";
import TicTacToeBoard from "./components/ticTacToeBoard/ticTacToeBoard";

function App() {
  const [amountOfSquaresInRow, setAmountOfSquaresInRow] = useState(3);
  useEffect(() => {
    setAmountOfSquaresInRow(
      Number(prompt("Please enter amount of cells in row:"))
    );
  }, []);

  return (
    <div className="App">
      <TicTacToeBoard amountOfSquares={Math.pow(amountOfSquaresInRow, 2)} />
    </div>
  );
}

export default App;
