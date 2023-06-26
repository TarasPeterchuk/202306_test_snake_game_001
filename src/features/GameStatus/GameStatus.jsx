import { GameState } from './GameStatus.types';
import styles from './GameStatus.module.scss';
import { FinishModal } from '../FinishModal/FinishModal';

export const GameStatus = ({ gameState, score, onReset, onTogglePause }) => (
  <section className={styles.gameStatus}>
    <input type="text" value={gameState} disabled />

    <input type="number" value={score} disabled />

    <div className={styles.wrapper}>
      <button type="reset" onClick={onReset}>
        Reset
      </button>
      <button
        type="button"
        onClick={onTogglePause}
        disabled={gameState === GameState.GameOver}
      >
        {gameState === GameState.Paused ? 'Resume' : 'Pause'}
      </button>
      <FinishModal />
    </div>
  </section>
);
