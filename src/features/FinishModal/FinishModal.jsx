import { connect } from 'react-redux';
import styles from './FinishModal.module.css';
import * as snakeActions from '../snake.actions';

const FinishModal = ({ score, onReset }) => (
  <>
    <label id="popup" className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Your score is</h2>
        <h2>{score}</h2>

        <button type="reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </label>
  </>
);

const mapstate = (state) => ({
  score: state.snake.score,
});

const mapDispatch = {
  onReset: snakeActions.resetGame,
};

export default connect(mapstate, mapDispatch)(FinishModal);
