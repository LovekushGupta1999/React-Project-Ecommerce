import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState ={
    carts: [],
    total: 0,
    totalItems: 0,
} 

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const item = state.carts.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.carts.push({ ...action.payload, quantity: 1 });
            }
            state.total += action.payload.price;
            state.totalItems += 1;
        },
        
      
            removeFromCart: (state, action) => {
    //     const index = state.carts.findIndex((item) => item.id === action.payload.id);
        //     if (index != -1) {
        //         const item = state.carts[index];
        //         state.total -= item.price * item.quantity;
        //         state.totalItems -= item.quantity;
            // }
      const id = action.payload;
      state.carts = state.carts.filter(item => item.id !== id);
    },

     increaseQuantity: (state, action) => {
      const item = state.carts.find(i => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
            state.totalItems += 1;
       }  },
    
    decreaseQuantity: (state, action) => {
      const item = state.carts.find(i => i.id === action.payload);
      if(item.quantity==1){
        state.carts = state.carts.filter(i => i.id !== action.payload);
        state.total -= item.price;
      }
      if (item && item.quantity> 1) item.quantity -= 1;
      state.total -= item.price * 1;
            state.totalItems -= 1;
    },

        clearCart: (state) => {
            state.carts = [];
            state.total = 0;
            state.totalItems = 0;
        },
      
    }
})

export const {
    addToCart,
    removeFromCart,
    clearCart,
     decreaseQuantity,
    increaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
