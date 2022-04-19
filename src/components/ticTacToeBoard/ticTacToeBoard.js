import React, { useState } from "react";
import Square from "../square/square";
import styles from "./ticTacToeBoard.module.scss";

const TicTacToeBoard = ({ amountOfSquares }) => {
  const defaultSquares = (() => {
    return new Array(amountOfSquares).fill(0);
  })();
  const width = Math.sqrt(amountOfSquares) * 100;

  const [squares, setSquares] = useState(defaultSquares);

  const handleTurn = (index) => {
    let newSquares = squares;
    newSquares[index] = "x";
    setSquares([...newSquares]);
  };

  return (
    <div className={styles.container}>
      <div style={{ width: width }} className={styles.board}>
        {squares.map((currentSquare, index) => (
          <Square
            key={index}
            x={currentSquare === "x" ? 1 : 0}
            o={currentSquare === "o" ? 1 : 0}
            onClick={() => handleTurn(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TicTacToeBoard;
