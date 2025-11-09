import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "travel-trucks-favorites";

const loadFromStorage = () => {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (ids) => {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    
  }
};

const initialState = {
  ids: loadFromStorage(), 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = String(action.payload);
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((item) => item !== id);
      } else {
        state.ids.push(id);
      }
      saveToStorage(state.ids);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.ids;

export default favoritesSlice.reducer;
