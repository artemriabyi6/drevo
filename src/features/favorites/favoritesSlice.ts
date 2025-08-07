import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number ;
  image: string;
}

interface FavoritesState {
  likedItems: Product[];
  lastAddedItem: Product | null;
  lastRemovedId: number | null;
}

const loadFavoritesState = (): FavoritesState => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return { likedItems: [], lastAddedItem: null, lastRemovedId: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load favorites state', err);
    return { likedItems: [], lastAddedItem: null, lastRemovedId: null };
  }
};

const initialState: FavoritesState = loadFavoritesState();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.likedItems.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingIndex === -1) {
        state.likedItems.push(action.payload);
        state.lastAddedItem = action.payload;
        state.lastRemovedId = null;
      } else {
        const removedItem = state.likedItems[existingIndex];
        state.likedItems.splice(existingIndex, 1);
        state.lastRemovedId = removedItem.id;
        state.lastAddedItem = null;
      }
    },
    
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const existingIndex = state.likedItems.findIndex(
        item => item.id === action.payload
      );
      
      if (existingIndex !== -1) {
        state.likedItems.splice(existingIndex, 1);
        state.lastRemovedId = action.payload;
        state.lastAddedItem = null;
      }
    },
    
    clearWishlist: (state) => {
      state.likedItems = [];
      state.lastAddedItem = null;
      state.lastRemovedId = null;
    },
     hydrateFavorites: (state, action: PayloadAction<FavoritesState>) => {
      return action.payload;
    },
  },
});

export const { 
  toggleFavorite,
  removeFromWishlist,
  clearWishlist,
  hydrateFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;