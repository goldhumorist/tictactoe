import React, { useState, useEffect } from "react";
import "./App.scss";
import TicTacToe from "./components/ticTacToe/ticTacToe";

function App() {
  const [amountOfSquaresInRow, setAmountOfSquaresInRow] = useState(3);
  useEffect(() => {
    const usersAmount = Number(
      prompt(
        "Please enter amount of cells in row: \nPlease do not enter more than 3"
      )
    );
    const tempAmountOfSquaresInRow = Number.isInteger(usersAmount)
      ? usersAmount
      : 3;
    setAmountOfSquaresInRow(tempAmountOfSquaresInRow);
  }, []);

  const [component, setComponent] = useState(null);
  const renderField = () => {
    setComponent(
      <TicTacToe amountOfSquares={Math.pow(amountOfSquaresInRow, 2)} />
    );
  };

  return (
    <div className="App">
      {!component ? (
        <section className="main-section">
          <div className="container">
            <h1 className="main-title">TicTacToe</h1>
            <button className="startGameBtn" onClick={() => renderField()}>
              PLAY
            </button>
          </div>
        </section>
      ) : (
        component
      )}
    </div>
  );
}

export default App;
