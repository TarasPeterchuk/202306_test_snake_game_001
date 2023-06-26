import { SquareValue } from './Square.types';
import styles from './Square.module.scss';

export const Square = ({ value, direction }) => (
  <div
    className={styles.square}
    data-value={value === SquareValue.SnakeHead ? direction : value}
  />
);
