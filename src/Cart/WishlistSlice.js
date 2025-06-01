import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../Cart/Cartslice';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
     addToWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.find(p => p.id === item.id);
      if (!exists) state.push(item);
    },
    removeFromWishlist: (state, action) => {
      return state.filter(p => p.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// Thunk to move to cart
export const moveToCart = (item) => (dispatch) => {
  dispatch(removeFromWishlist(item.id));
  dispatch(addToCart({ ...item, quantity: 1 }));
};


export default wishlistSlice.reducer;
