// import { createSlice } from "@reduxjs/toolkit";
import { GameState } from './GameStatus/GameStatus.types';
// import { StoreType } from "./store.types";
import {
  SET_DIRECTION,
  TOGGLE_PAUSE,
  RESET_GAME,
  UPDATE_BOARD,
} from './snake.actions';
import {
  getRandomPos,
  isSnakeCollision,
  isValidDirectionChange,
  moveSnake,
} from './store.util';
import { DEFAULT_N_COLS, DEFAULT_N_ROWS } from './store.config';
// import { Direction } from "../components/Square/Square.types";

const initialState = {
  speed: 200,
  nRows: DEFAULT_N_ROWS,
  nCols: DEFAULT_N_COLS,
  snake: [Math.floor((DEFAULT_N_ROWS * DEFAULT_N_COLS) / 2)],
  food: getRandomPos(DEFAULT_N_ROWS, DEFAULT_N_COLS),
  direction: 'ArrowUp',
  gameState: GameState.InProgress,
};

const snakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTION: {
      const { direction } = action.payload;
      if (!isValidDirectionChange(state.direction, direction)) {
        return state; // No changes, return the current state
      }

      return {
        ...state,
        direction,
      };
    }

    case RESET_GAME: {
      const newState = {
        ...state,
        speed: 200,
        snake: [Math.floor((state.nRows * state.nCols) / 2)],
        food: getRandomPos(state.nRows, state.nCols),
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
      let newSpeed = state.speed;

      if (snake[0] === state.food) {
        newSnake = snake;
        newFood = getRandomPos(state.nRows, state.nCols);
        newSpeed *= 0.9;
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
        food: newFood,
        speed: newSpeed,
        gameState: newGameState,
      };
    }
    default:
      return state;
  }
};

// reducers: {
//   setDirection: (state, action) => {
//     const direction = action.payload;
//     if (!isValidDirectionChange(state.direction, direction)) return;

//     state.direction = direction;
//   },

// resetGame: (state) => {
//   state.snake = [Math.floor((state.nRows * state.nCols) / 2)];
//   state.food = getRandomPos(state.nRows, state.nCols);
//   state.direction = 'ArrowUp';
//   state.gameState = GameState.InProgress;
// },

//     updateBoard: (state) => {
//       if (state.gameState !== GameState.InProgress) return;

//       const snake = moveSnake(
//         state.snake,
//         state.nRows,
//         state.nCols,
//         state.direction
//       );

//       if (snake[0] === state.food) {
//         state.snake = snake;
//         state.food = getRandomPos(state.nRows, state.nCols);
//         state.speed *= 0.9;
//       } else {
//         state.snake.pop();
//       }

//       if (isSnakeCollision(snake)) state.gameState = GameState.GameOver;
//     },

//     togglePause: (state) => {
//       if (state.gameState === GameState.InProgress)
//         state.gameState = GameState.Paused;
//       else if (state.gameState === GameState.Paused)
//         state.gameState = GameState.InProgress;
//     },
//   },
// });

// export const { setDirection, togglePause, resetGame, updateBoard } =
//   SnakeSlice.actions;

export default snakeReducer;
