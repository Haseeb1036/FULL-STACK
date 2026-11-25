
// Name: YOUR NAME
// Registration No: YOUR REGISTRATION NUMBER
// Lab 14 - Wishlist Redux Slice

import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    ids: []
  },

  reducers: {

    toggleWish: (state, action) => {
      const id = action.payload;

      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(
          (item) => item !== id
        );
      } else {
        state.ids.push(id);
      }
    },

    clearWish: (state) => {
      state.ids = [];
    }

  }
});

export const { toggleWish, clearWish } =
  wishlistSlice.actions;

export const selectWishIds = (state) =>
  state.wishlist.ids;

export default wishlistSlice.reducer;
