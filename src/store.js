import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import snakeReducer from './features/snake.reduces';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  snake: snakeReducer,
});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
