import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '@/features/favorites/favoritesSlice';
import filterReducer from '../features/filter/filterSlice';
import cartReducer from '../features/cart/cartSlice';
import { loadState, saveState } from '../utils/storage';


export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  saveState('cart', store.getState().cart);
  saveState('favorites', store.getState().favorites);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;