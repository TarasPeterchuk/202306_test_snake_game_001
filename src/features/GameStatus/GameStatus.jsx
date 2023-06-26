import { GameState } from './GameStatus.types';
import styles from './GameStatus.module.scss';
import FinishModal from '../FinishModal/FinishModal';

export const GameStatus = ({
  gameState,
  score,
  onReset,
  onTogglePause,
  speed,
}) => (
  <section className={styles.gameStatus}>
    <input type="text" value={gameState} disabled />
    <div className={styles.values}>
      <input type="text" value={'Score'} disabled />
      <input type="number" value={score} disabled />
    </div>
    <div className={styles.values}>
      <input type="text" value={'Speed (every 10)'} disabled />
      <input type="number" value={speed} disabled />
    </div>
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
      {gameState === GameState.GameOver && <FinishModal />}
    </div>
  </section>
);
