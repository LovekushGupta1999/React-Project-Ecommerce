import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Cart/Cartslice";
import wishlistReducer from "../Cart/WishlistSlice"; // assuming it's located here

const store = configureStore({
  reducer: {
    carts: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
