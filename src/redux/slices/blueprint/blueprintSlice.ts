import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BlueprintState, BlueprintPayload, ThemeContext, Theme } from "./blueprintType";
import { fetchBlueprintThunk, updateBlueprintThunk, updateThemeThunk, updateBrandValueThunk, updateBusinessProfileThunk, updateNavigationThunk } from "./blueprintThunk";

const initialState: BlueprintState = {
  payload: null,
  activeThemeContext: "public",
  loading: false,
  updating: false,
  error: null,
  lastFetched: null,
};

const blueprintSlice = createSlice({
  name: "blueprint",
  initialState,
  reducers: {
    setThemeContext: (state, action: PayloadAction<ThemeContext>) => {
      state.activeThemeContext = action.payload;
    },
    applyColorOverride: (state, action: PayloadAction<{ context: ThemeContext; colors: Record<string, string> }>) => {
      const { context, colors } = action.payload;
      const themeKey = context === "public" ? "public_theme" : "admin_theme";
      if (state.payload) {
        const currentTheme = state.payload[themeKey] as Theme;
        state.payload[themeKey] = { ...currentTheme, colors: { ...currentTheme.colors, ...colors } };
      }
    },
    clearBlueprintError: (state) => { state.error = null; },
    resetBlueprint: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlueprintThunk.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchBlueprintThunk.fulfilled, (state, action) => { state.loading = false; state.payload = action.payload.payload; state.lastFetched = new Date().toISOString(); });
    builder.addCase(fetchBlueprintThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
    builder.addCase(updateBlueprintThunk.pending, (state) => { state.updating = true; state.error = null; });
    builder.addCase(updateBlueprintThunk.fulfilled, (state, action) => { state.updating = false; state.payload = action.payload.payload; state.lastFetched = new Date().toISOString(); });
    builder.addCase(updateBlueprintThunk.rejected, (state, action) => { state.updating = false; state.error = action.payload as string; });
    builder.addCase(updateThemeThunk.fulfilled, (state, action) => { state.payload = action.payload.payload; state.lastFetched = new Date().toISOString(); });
    builder.addCase(updateBrandValueThunk.fulfilled, (state, action) => { state.payload = action.payload.payload; state.lastFetched = new Date().toISOString(); });
    builder.addCase(updateBusinessProfileThunk.fulfilled, (state, action) => { state.payload = action.payload.payload; state.lastFetched = new Date().toISOString(); });
    builder.addCase(updateNavigationThunk.fulfilled, (state, action) => { state.payload = action.payload.payload; state.lastFetched = new Date().toISOString(); });
  },
});

export const selectBlueprint = (state: { blueprint: BlueprintState }) => state.blueprint.payload;
export const selectThemeContext = (state: { blueprint: BlueprintState }) => state.blueprint.activeThemeContext;
export const selectPublicTheme = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.public_theme;
export const selectAdminTheme = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.admin_theme;
export const selectActiveTheme = (state: { blueprint: BlueprintState }): Theme | null => {
  const payload = state.blueprint.payload;
  const context = state.blueprint.activeThemeContext;
  if (!payload) return null;
  return context === "public" ? payload.public_theme : payload.admin_theme;
};
export const selectBusinessProfile = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.business_profile;
export const selectPublicNavigation = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.public_navigation;
export const selectAdminNavigation = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.admin_navigation;
export const selectRoutes = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.routes;
export const selectEnabledModules = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.enabled_modules;
export const selectVocabulary = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.vocabulary;
export const selectLocalization = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.localization;
export const selectCommerce = (state: { blueprint: BlueprintState }) => state.blueprint.payload?.commerce;
export const selectBlueprintLoading = (state: { blueprint: BlueprintState }) => state.blueprint.loading;
export const selectBlueprintUpdating = (state: { blueprint: BlueprintState }) => state.blueprint.updating;
export const selectBlueprintError = (state: { blueprint: BlueprintState }) => state.blueprint.error;
export const selectBlueprintLastFetched = (state: { blueprint: BlueprintState }) => state.blueprint.lastFetched;

export const { setThemeContext, applyColorOverride, clearBlueprintError, resetBlueprint } = blueprintSlice.actions;
export default blueprintSlice.reducer;
