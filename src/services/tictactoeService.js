export const emptySquares = (board) => {
  return board.filter((square) => typeof square === "number");
};

export const checkWin = (board, player, winCombination) => {
  // const winCombination = [
  //   [0, 1, 2],
  //   [3, 4, 5],
  //   [6, 7, 8],
  //   [0, 3, 6],
  //   [1, 4, 7],
  //   [2, 5, 8],
  //   [0, 4, 8],
  //   [6, 4, 2],
  // ];

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

export const declareWinner = (player) => {
  return `Wons - ${player}`;
};

export const isTie = (board) => {
  if (emptySquares(board).length === 0) {
    return true;
  }
  return false;
};
