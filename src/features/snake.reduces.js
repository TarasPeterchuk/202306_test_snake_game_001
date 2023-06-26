import { GameState } from './GameStatus/GameStatus.types';
import {
  SET_DIRECTION,
  TOGGLE_PAUSE,
  RESET_GAME,
  UPDATE_BOARD,
} from './snake.actions';
import {
  getRandomPos,
  getRandomWeight,
  isSnakeCollision,
  isValidDirectionChange,
  moveSnake,
} from './store.util';
import { DEFAULT_N_COLS, DEFAULT_N_ROWS } from './store.config';

const initialState = {
  speed: 1,
  score: 0,
  nRows: DEFAULT_N_ROWS,
  nCols: DEFAULT_N_COLS,
  snake: [Math.floor((DEFAULT_N_ROWS * DEFAULT_N_COLS) / 2)],
  food: getRandomPos(DEFAULT_N_ROWS, DEFAULT_N_COLS),
  foodWeight: getRandomWeight(),
  direction: 'ArrowUp',
  gameState: GameState.InProgress,
};

const snakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTION: {
      const { direction } = action.payload;
      if (!isValidDirectionChange(state.direction, direction)) {
        return state;
      }

      return {
        ...state,
        direction,
      };
    }

    case RESET_GAME: {
      const newState = {
        ...state,
        speed: 1,
        score: 0,
        snake: [Math.floor((state.nRows * state.nCols) / 2)],
        food: getRandomPos(state.nRows, state.nCols),
        foodWeight: getRandomWeight(),
        direction: 'ArrowUp',
        gameState: GameState.InProgress,
      };

      return newState;
    }

    case TOGGLE_PAUSE: {
      let newGameState = state.gameState;
      if (state.gameState === GameState.InProgress) {
        newGameState = GameState.Paused;
      } else if (state.gameState === GameState.Paused) {
        newGameState = GameState.InProgress;
      }

      return {
        ...state,
        gameState: newGameState,
      };
    }

    case UPDATE_BOARD: {
      if (state.gameState !== GameState.InProgress) {
        return state;
      }

      const snake = moveSnake(
        state.snake,
        state.nRows,
        state.nCols,
        state.direction
      );

      let newSnake = [...state.snake];
      let newFood = state.food;
      let newScore = state.score;
      let newFoodWeight = state.foodWeight;
      let newSpeed = state.speed;

      if (snake[0] === state.food) {
        newScore = state.score + state.foodWeight;
        newSnake = snake;
        newFood = getRandomPos(state.nRows, state.nCols);
        newFoodWeight = getRandomWeight();
        newSpeed = Math.floor((state.score + state.foodWeight) / 50) + 1;
      } else {
        newSnake.pop();
      }

      let newGameState = state.gameState;
      if (isSnakeCollision(snake)) {
        newGameState = GameState.GameOver;
      }

      return {
        ...state,
        snake: newSnake,
        score: newScore,
        food: newFood,
        foodWeight: newFoodWeight,
        speed: newSpeed,
        gameState: newGameState,
      };
    }
    default:
      return state;
  }
};

export default snakeReducer;
