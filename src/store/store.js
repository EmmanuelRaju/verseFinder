import { configureStore } from '@reduxjs/toolkit';
import verseReducer from './verse';

export const store = configureStore({
  reducer: {
    verse: verseReducer
  }
});

