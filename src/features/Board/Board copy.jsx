import { Square } from '../Square/Square';
import { SquareValue } from '../Square/Square.types';
import styles from './Board.module.scss';

export const Board = ({ nRows, nCols, food, snake, direction }) => {
  const boardStyle = {
    '--n-rows': nRows,
    '--n-cols': nCols,
  };

  const getSnakeValue = (i) => {
    if (snake[0] === i) return SquareValue.SnakeHead;
    if (snake.includes(i)) return SquareValue.SnakeBody;

    if (i === food) return SquareValue.Food;
    return SquareValue.Empty;
  };

  return (
    <div className={styles.board} style={boardStyle}>
      {Array(nRows * nCols)
        .fill(null)
        .map((_, i) => (
          <Square key={i} value={getSnakeValue(i)} direction={direction} />
        ))}
    </div>
  );
};
