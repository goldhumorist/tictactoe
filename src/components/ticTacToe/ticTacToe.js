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

  const getWinCombination = (board) => {
    const winAmount = Math.sqrt(amountOfSquares);
    const result = [];
    let tempHorizontal = [];
    let tempVertical = [];
    let tempCross = [];

    for (let i = 0; i <= board.length; i++) {
      if (i === 0 || i % winAmount !== 0) {
        tempHorizontal.push(i);
      } else {
        result.push(tempHorizontal);
        tempHorizontal = [];
        tempHorizontal.push(i);
      }
    }

    for (let i = 0; i < winAmount; i++) {
      tempVertical.push(i);
      for (let j = i; j < amountOfSquares - winAmount; j += winAmount) {
        tempVertical.push(j + winAmount);
      }

      result.push(tempVertical);
      tempVertical = [];
    }

    for (let i = 0; i < winAmount; i += winAmount - 1) {
      tempCross.push(i);
      if (i === 0) {
        for (let j = i; j <= amountOfSquares - winAmount; j += winAmount + 1) {
          tempCross.push(j + (winAmount + 1));
        }

        result.push(tempCross);
        tempCross = [];
      } else {
        for (
          let j = i;
          j <= amountOfSquares - winAmount - 1;
          j += winAmount - 1
        ) {
          tempCross.push(j + (winAmount - 1));
        }
        result.push(tempCross);

        tempCross = [];
      }
    }
    return result;
  };

  let winCombination = null;
  winCombination = winCombination
    ? winCombination
    : getWinCombination(originBoard);
  console.log(winCombination);

  const handleTurn = (squareIndex) => {
    if (
      typeof originBoard[squareIndex] === "number" &&
      !checkWin(originBoard, realPlayer, winCombination) &&
      !checkWin(originBoard, aiPlayer, winCombination)
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

    if (checkWin(board, realPlayer, winCombination)) {
      return -1;
    } else if (checkWin(board, aiPlayer, winCombination)) {
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
      <div className={styles.gameStatus}>
        {checkWin(originBoard, "x", winCombination)
          ? declareWinner("x")
          : checkWin(originBoard, "o", winCombination)
          ? declareWinner("o")
          : isTie(originBoard)
          ? "Draw"
          : "Playing..."}
      </div>
    </div>
  );
};

export default TicTacToe;
