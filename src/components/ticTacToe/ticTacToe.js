import React, { useState } from "react";
import Square from "../square/square";
import {
  emptySquares,
  checkWin,
  declareWinner,
  isTie,
} from "../../services/tictactoeService";
import styles from "./ticTacToeBoard.module.scss";

const TicTacToe = ({ amountOfSquares }) => {
  const defaultSquares = (() => {
    return Array.from(Array(amountOfSquares).keys());
  })();
  const width = Math.sqrt(amountOfSquares) * 100;

  const [squares, setSquares] = useState(defaultSquares);

  let originBoard = squares;
  const realPlayer = "x";
  const aiPlayer = "o";

  const handleTurn = (squareIndex) => {
    if (
      typeof originBoard[squareIndex] === "number" &&
      !checkWin(originBoard, realPlayer) &&
      !checkWin(originBoard, aiPlayer)
    ) {
      originBoard[squareIndex] = realPlayer;
      setSquares([...originBoard]);

      if (!isTie(originBoard)) {
        bestMove();
      }
    }
  };

  const bestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < originBoard.length; i++) {
      if (typeof originBoard[i] === "number") {
        let temp = originBoard[i];
        originBoard[i] = aiPlayer;
        let score = minimax(originBoard, 0, false);
        originBoard[i] = temp;
        if (score > bestScore) {
          bestScore = score;
          move = { i };
        }
      }
    }
    originBoard[move.i] = aiPlayer;
    setSquares([...originBoard]);
  };

  const minimax = (board, depth, isMaximizing) => {
    const avalibleSquares = emptySquares(originBoard);

    if (checkWin(board, realPlayer)) {
      return -1;
    } else if (checkWin(board, aiPlayer)) {
      return 1;
    } else if (avalibleSquares.length === 0) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (typeof board[i] === "number") {
          let temp = board[i];
          board[i] = aiPlayer;
          let score = minimax(board, depth + 1, false);
          board[i] = temp;
          bestScore = Math.max(score, bestScore);
        }
      }

      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (typeof board[i] === "number") {
          let temp = board[i];
          board[i] = realPlayer;
          let score = minimax(board, depth + 1, true);
          board[i] = temp;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
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
        : isTie(originBoard)
        ? "Draw"
        : "Playing..."}
    </div>
  );
};

export default TicTacToe;
