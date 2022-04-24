import React, { useState, useEffect } from "react";
import "./App.scss";
import TicTacToe from "./components/ticTacToe/ticTacToe";

function App() {
  // !!! For now this part is not needed !!!

  // const [amountOfSquaresInRow, setAmountOfSquaresInRow] = useState(3);
  // useEffect(() => {
  //   const usersAmount = Number(prompt("Please enter amount of cells in row:"));
  //   const tempAmountOfSquaresInRow = Number.isInteger(usersAmount)
  //     ? usersAmount
  //     : 3;
  //   setAmountOfSquaresInRow(tempAmountOfSquaresInRow);
  // }, []);

  // !!! For now this part is not needed !!!

  const [component, setComponent] = useState(null);
  const renderField = () => {
    setComponent(<TicTacToe amountOfSquares={Math.pow(3, 2)} />);
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
