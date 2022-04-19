import React from "react";
import styles from "./square.module.scss";

const Square = (SquareProps) => {
  return (
    <div className={styles.square} {...SquareProps}>
      {SquareProps.x ? "X" : SquareProps.o ? "O" : ""}
    </div>
  );
};

export default Square;
