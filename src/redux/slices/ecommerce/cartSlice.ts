import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export interface CartItem { id: string; productId: string; name: string; price: number; quantity: number; image: string; variantId?: string; variantName?: string; maxQuantity: number; }

export interface CartState { items: CartItem[]; couponCode: string | null; discount: number; loading: boolean; error: string | null; isCartOpen: boolean; }

const initialState: CartState = { items: [], couponCode: null, discount: 0, loading: false, error: null, isCartOpen: false };

export const fetchCartThunk = createAsyncThunk("cart/fetch", async (_, { rejectWithValue }) => {
  try { const response = await fetch("/api/cart"); const data = await response.json(); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

export const addToCartThunk = createAsyncThunk("cart/add", async (item: Omit<CartItem, "id">, { rejectWithValue }) => {
  try { const response = await fetch("/api/cart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) }); const data = await response.json(); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

export const updateCartItemThunk = createAsyncThunk("cart/update", async ({ id, quantity }: { id: string; quantity: number }, { rejectWithValue }) => {
  try { const response = await fetch(`/api/cart/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quantity }) }); const data = await response.json(); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

export const removeCartItemThunk = createAsyncThunk("cart/remove", async (id: string, { rejectWithValue }) => {
  try { const response = await fetch(`/api/cart/${id}`, { method: "DELETE" }); const data = await response.json(); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

export const applyCouponThunk = createAsyncThunk("cart/coupon", async (code: string, { rejectWithValue }) => {
  try { const response = await fetch("/api/cart/coupon", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) }); const data = await response.json(); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

const cartSlice = createSlice({
  name: "cart", initialState,
  reducers: {
    clearCart: (state) => { state.items = []; state.couponCode = null; state.discount = 0; },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity <= item.maxQuantity && quantity > 0) item.quantity = quantity;
    },
    removeItem: (state, action: PayloadAction<string>) => { state.items = state.items.filter((i) => i.id !== action.payload); },
    addToCart: (state, action: PayloadAction<Omit<CartItem, "id">>) => {
      const existingItem = state.items.find(i => i.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, id: Date.now().toString() });
      }
    },
    openCart: (state) => { state.isCartOpen = true; },
    closeCart: (state) => { state.isCartOpen = false; },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartThunk.fulfilled, (state, action) => { state.items = action.payload.items; state.couponCode = action.payload.couponCode; state.discount = action.payload.discount; });
    builder.addCase(addToCartThunk.fulfilled, (state, action) => { state.items = action.payload.items; });
    builder.addCase(updateCartItemThunk.fulfilled, (state, action) => { state.items = action.payload.items; });
    builder.addCase(removeCartItemThunk.fulfilled, (state, action) => { state.items = action.payload.items; });
    builder.addCase(applyCouponThunk.fulfilled, (state, action) => { state.couponCode = action.payload.code; state.discount = action.payload.discount; });
  },
});

export const selectCartItems = (state: RootState) => state.cart?.items || [];
export const selectCartTotal = (state: RootState) => (state.cart?.items || []).reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartItemCount = (state: RootState) => (state.cart?.items || []).reduce((sum, item) => sum + item.quantity, 0);
export const selectCartDiscount = (state: RootState) => state.cart?.discount || 0;
export const selectCartLoading = (state: RootState) => state.cart?.loading || false;
export const selectIsCartOpen = (state: RootState) => state.cart?.isCartOpen || false;

export const { clearCart, updateQuantity, removeItem, addToCart, openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
