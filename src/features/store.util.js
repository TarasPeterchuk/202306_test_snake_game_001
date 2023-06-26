export const isValidDirectionChange = (currentDirection, newDirection) => {
  return (
    (currentDirection === 'ArrowUp' && newDirection !== 'ArrowDown') ||
    (currentDirection === 'ArrowDown' && newDirection !== 'ArrowUp') ||
    (currentDirection === 'ArrowLeft' && newDirection !== 'ArrowRight') ||
    (currentDirection === 'ArrowRight' && newDirection !== 'ArrowLeft')
  );
};

export const isSnakeCollision = (snake) => {
  const head = snake[0];
  return snake.slice(1).includes(head);
};

export const moveSnake = (snake, nRows, nCols, direction) => {
  const head = snake[0];
  // eslint-disable-next-line default-case
  switch (direction) {
    case 'ArrowUp':
      snake.unshift(head - nCols);
      if (snake[0] < 0) snake[0] += nCols * nRows;
      break;
    case 'ArrowDown':
      snake.unshift(head + nCols);
      if (snake[0] >= nCols * nRows) snake[0] -= nCols * nRows;
      break;
    case 'ArrowLeft':
      snake.unshift(head - 1);
      if (head % nCols === 0) snake[0] += nCols;
      break;
    case 'ArrowRight':
      snake.unshift(head + 1);
      if (head % nCols === nCols - 1) snake[0] -= nCols;
      break;
  }
  return snake;
};

export const getRandomPos = (nRows, nCols) =>
  Math.floor(Math.random() * nRows * nCols - 1);
