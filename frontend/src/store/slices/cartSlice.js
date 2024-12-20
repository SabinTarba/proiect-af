import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;

      const product = state.cart.find((item) => item.productId === id);

      if (product) {
        product.quantity += 1;
      }

      state.cart = state.cart.map((item) => (item.productId === id ? product : item));
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;

      const product = state.cart.find((item) => item.productId === id);

      if (product) {
        product.quantity -= 1;

        if (product.quantity <= 0) {
          state.cart = state.cart.filter((item) => item.productId !== id);
        } else {
          state.cart = state.cart.map((item) => (item.productId === id ? product : item));
        }
      }

    },
    clearCart: (state) => {
      state.cart = [];
    },
    recomputeCart: (state, action) => {
      const cart = action.payload;
      state.cart = cart;
    }
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, recomputeCart } = cartSlice.actions;

export default cartSlice.reducer;