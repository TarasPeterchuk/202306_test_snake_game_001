import styles from './Explanation.module.scss';
import { Square } from '../Square/Square';
import { SquareValue } from '../Square/Square.types';

export const Explanation = () => (
  <div className={styles.explanationCover}>
    <div className={styles.explanation}>
      <Square value={SquareValue.FoodOne} />1 point
    </div>
    <div className={styles.explanation}>
      <Square value={SquareValue.FoodTwo} />2 points
    </div>
    <div className={styles.explanation}>
      <Square value={SquareValue.FoodFive} />5 points
    </div>
  </div>
);
