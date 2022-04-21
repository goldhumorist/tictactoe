import React, { useState } from "react";
import Square from "../square/square";
import styles from "./ticTacToeBoard.module.scss";

const TicTacToeBoard = ({ amountOfSquares }) => {
  const defaultSquares = (() => {
    return Array.from(Array(amountOfSquares).keys());
  })();
  const width = Math.sqrt(amountOfSquares) * 100;

  const [squares, setSquares] = useState(defaultSquares);

  let originBoard = squares;
  const realPlayer = "x";
  const aiPlayer = "o";

  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const handleTurn = (squareIndex) => {
    if (
      typeof originBoard[squareIndex] === "number" &&
      !checkWin(originBoard, realPlayer)
    ) {
      doTurn(squareIndex, realPlayer);
      if (!checkTie() && !checkWin(originBoard, realPlayer)) {
        doTurn(bestSpot(), aiPlayer);
      }
    }
  };
  const doTurn = (squareIndex, player) => {
    originBoard[squareIndex] = player;
    setSquares([...originBoard]);
    const gameWon = checkWin(originBoard, player);

    if (gameWon) declareWinner(gameWon);
  };

  const checkWin = (board, player) => {
    const plays = board.reduce(
      (accum, currentElement, index) =>
        currentElement === player ? accum.concat(index) : accum,
      []
    );

    let gameWon = null;
    for (let [index, win] of winCombination.entries()) {
      if (win.every((element) => plays.indexOf(element) > -1)) {
        gameWon = { index, player };
        break;
      }
    }
    return gameWon;
  };

  const bestSpot = () => {
    return emptySquares()[0];
  };

  const emptySquares = () => {
    return originBoard.filter((square) => typeof square === "number");
  };

  const checkTie = () => {
    if (emptySquares().length === 0) {
      declareWinner("TIE");
      return true;
    }
    return false;
  };
  const declareWinner = (player) => {
    return `Wons - ${player}`;
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
      {checkWin(originBoard, "x")
        ? declareWinner("x")
        : checkWin(originBoard, "o")
        ? declareWinner("x")
        : "Playing..."}
    </div>
  );
};

export default TicTacToeBoard;
