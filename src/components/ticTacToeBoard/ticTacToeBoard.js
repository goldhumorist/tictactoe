import React from "react";
import Square from "../square/square";
import styles from "./ticTacToeBoard.module.scss";

const TicTacToeBoard = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
};

export default TicTacToeBoard;
