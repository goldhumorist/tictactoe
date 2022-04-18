import React, { useState } from "react";
import Square from "../square/square";
import styles from "./ticTacToeBoard.module.scss";

const TicTacToeBoard = ({ amountOfSquares }) => {
  const squares = (() => {
    return new Array(amountOfSquares).fill(0);
  })();
  const width = Math.sqrt(amountOfSquares) * 100;

  return (
    <div className={styles.container}>
      <div style={{ width: width }} className={styles.board}>
        {squares.map((square, index) => (
          <Square key={index} />
        ))}
      </div>
    </div>
  );
};

export default TicTacToeBoard;
