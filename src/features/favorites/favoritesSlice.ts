import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  likedIds: number[];
  lastAddedId: number | null;
}

const initialState: FavoritesState = {
  likedIds: [],
  lastAddedId: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.likedIds.indexOf(action.payload);
      if (index === -1) {
        state.likedIds.push(action.payload);
        state.lastAddedId = action.payload;
      } else {
        state.likedIds.splice(index, 1);
        state.lastAddedId = null;
      }
    },
    resetLastAdded: (state) => {
      state.lastAddedId = null;
    },
  },
});

export const { toggleFavorite, resetLastAdded } = favoritesSlice.actions;
export default favoritesSlice.reducer;