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
      !checkWin(originBoard, realPlayer) &&
      !checkWin(originBoard, aiPlayer)
    ) {
      doTurn(squareIndex, realPlayer);
      if (!checkTie()) {
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

  const emptySquares = (board) => {
    return board.filter((square) => typeof square === "number");
  };

  const checkTie = () => {
    if (emptySquares(originBoard).length === 0) {
      return true;
    }
    return false;
  };
  const declareWinner = (player) => {
    return `Wons - ${player}`;
  };

  const bestSpot = () => {
    return minMax(originBoard, aiPlayer).index;
  };
  const minMax = (newBoard, player) => {
    const avalibleSquares = emptySquares(newBoard);

    if (checkWin(newBoard, player)) {
      return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
      return { score: 10 };
    } else if (avalibleSquares.length === 0) {
      return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < avalibleSquares.length; i++) {
      const move = {};
      move.index = newBoard[avalibleSquares[i]];
      newBoard[avalibleSquares[i]] = player;

      if (player === aiPlayer) {
        const result = minMax(newBoard, realPlayer);
        move.score = result.score;
      } else {
        const result = minMax(newBoard, aiPlayer);
        move.score = result.score;
      }
      newBoard[avalibleSquares[i]] = move.index;
      moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
      let bestScore = -Infinity;

      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = Infinity;

      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
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
        ? declareWinner("o")
        : checkTie()
        ? "TIE"
        : "Playing..."}
    </div>
  );
};

export default TicTacToeBoard;
