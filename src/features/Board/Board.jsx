import { Square } from '../Square/Square';
import { SquareValue } from '../Square/Square.types';
import styles from './Board.module.scss';

export const Board = ({ nRows, nCols, food, snake, direction, foodWeight }) => {
  const boardStyle = {
    '--n-rows': nRows,
    '--n-cols': nCols,
  };

  const getSnakeValue = (i) => {
    if (snake[0] === i) return SquareValue.SnakeHead;
    if (snake.includes(i)) return SquareValue.SnakeBody;
    if (i === food && foodWeight === 1) return SquareValue.FoodOne;
    if (i === food && foodWeight === 5) return SquareValue.FoodFive;
    if (i === food && foodWeight === 10) return SquareValue.FoodTen;
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
