//  store/store.js

import { createStore } from 'redux';

// Начальное состояние
const initialState = {
  theme: 'light', // По умолчанию светлая тема
  counter: 0,     // Дополнительный счетчик, если потребуется
};

// Действия
const SET_THEME = 'SET_THEME';
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// Создаем действия
export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

export const decrementCounter = () => ({
  type: DECREMENT_COUNTER,
});

// Редьюсер
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case INCREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

// Создаем store
const store = createStore(reducer);

export default store;