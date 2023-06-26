export const SET_DIRECTION = 'SET_DIRECTION';
export const TOGGLE_PAUSE = 'TOGGLE_PAUSE';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_BOARD = 'UPDATE_BOARD';

export const setDirection = (direction) => {
  return {
    type: SET_DIRECTION,
    payload: { direction },
  };
};

export const togglePause = () => {
  const action = {
    type: TOGGLE_PAUSE,
  };
  return action;
};

export const resetGame = () => {
  const action = {
    type: RESET_GAME,
  };
  return action;
};

export const updateBoard = () => {
  const action = {
    type: UPDATE_BOARD,
  };
  return action;
};
