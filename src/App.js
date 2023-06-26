import './App.scss';
import { connect } from 'react-redux';
import * as snakeActions from './features/snake.actions';
import { GameStatus } from './features/GameStatus/GameStatus';
import { Board } from './features/Board/Board';
import { Explanation } from './features/Explanation/Explanation';
import { useEffect } from 'react';

const App = ({
  speed,
  score,
  moveSnake,
  onReset,
  onTogglePause,
  changeDirection,
  ...boardProps
}) => {
  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [speed, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          changeDirection(e.key);
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, onTogglePause]);

  return (
    <>
      <main>
        <GameStatus
          score={score}
          speed={speed}
          gameState={boardProps.gameState}
          onReset={onReset}
          onTogglePause={onTogglePause}
        />
        <Board {...boardProps} />
        <Explanation />
      </main>
    </>
  );
};

const mapstate = (state) => ({
  ...state.snake,
  // score: state.snake.snake.length - 1,
});

const mapDispatch = {
  moveSnake: snakeActions.updateBoard,
  onTogglePause: snakeActions.togglePause,
  onReset: snakeActions.resetGame,
  changeDirection: snakeActions.setDirection,
};

export default connect(mapstate, mapDispatch)(App);
