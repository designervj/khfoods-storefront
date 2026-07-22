import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";

export interface ProductFormState { id: string; name: string; slug: string; price: number; compareAtPrice?: number; images: string[]; [key: string]: any; }

export interface User { id: string; email: string; firstName: string; lastName: string; phone: string; role: "user" | "admin"; wishlist?: ProductFormState[]; }

export interface AuthState { user: User | null; token: string | null; isAuthenticated: boolean; loading: boolean; error: string | null; }

const initialState: AuthState = { user: null, token: null, isAuthenticated: false, loading: false, error: null };

export const loginThunk = createAsyncThunk("auth/login", async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
  try { const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const data = await response.json(); if (!response.ok) throw new Error(data.message); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

export const registerThunk = createAsyncThunk("auth/register", async (userData: { email: string; password: string; firstName: string; lastName: string; phone: string }, { rejectWithValue }) => {
  try { const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userData) }); const data = await response.json(); if (!response.ok) throw new Error(data.message); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

export const fetchMeThunk = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try { const response = await fetch("/api/auth/me"); const data = await response.json(); if (!response.ok) throw new Error(data.message); return data; }
  catch (error: any) { return rejectWithValue(error.message); }
});

export const updateProfileThunk = createAsyncThunk("auth/updateProfile", async ({ userData }: { userData: any }, { rejectWithValue, getState }) => {
  try { const { auth } = getState() as any; const response = await fetch(`/api/auth/update-profile`, { method: "PATCH", headers: { "Content-Type": "application/json", "x-tenant-db": process.env.NEXT_PUBLIC_TENANT_DB || "" }, credentials: "include", body: JSON.stringify({ ...userData, id: auth.user.id }) }); const data = await response.json(); if (!response.ok) throw new Error(data.message || "Profile update failed"); return data.user; }
  catch (error: any) { return rejectWithValue(error.message || "An unexpected error occurred"); }
});

const authSlice = createSlice({
  name: "auth", initialState,
  reducers: {
    logout: (state) => { state.user = null; state.token = null; state.isAuthenticated = false; localStorage.removeItem("token"); },
    clearAuthError: (state) => { state.error = null; },
    toggleWishlist: (state, action: PayloadAction<ProductFormState>) => {
      if (!state.user) return;
      const product = action.payload;
      const wishlist = state.user.wishlist || [];
      const exists = wishlist.find((item) => item.id === product.id);
      if (exists) { state.user.wishlist = wishlist.filter((item) => item.id !== product.id); }
      else { state.user.wishlist = [...wishlist, product]; }
    },
    mockAdminLogin: (state) => {
      state.isAuthenticated = true;
      state.user = { id: "admin-1", email: "admin@khfoods.com", firstName: "Admin", lastName: "User", phone: "123", role: "admin" };
      state.token = "mock-admin-token";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(loginThunk.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; state.isAuthenticated = true; localStorage.setItem("token", action.payload.token); });
    builder.addCase(loginThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    builder.addCase(registerThunk.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(registerThunk.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; state.token = action.payload.token; state.isAuthenticated = true; localStorage.setItem("token", action.payload.token); });
    builder.addCase(registerThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    builder.addCase(fetchMeThunk.fulfilled, (state, action) => { state.user = action.payload.user; state.isAuthenticated = true; });
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => { state.user = action.payload; });
  },
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectWishlist = (state: RootState) => state.auth.user?.wishlist || [];
export const selectIsInWishlist = (state: RootState, productId: string) => { const wishlist = state.auth.user?.wishlist || []; return wishlist.some((item) => item.id === productId); };

export const { logout, clearAuthError, toggleWishlist, mockAdminLogin } = authSlice.actions;
export default authSlice.reducer;
