import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import filterReducer from '../features/filter/filterSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;