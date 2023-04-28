/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';

export const store = configureStore({
    reducer: { movies: moviesReducer },
});
