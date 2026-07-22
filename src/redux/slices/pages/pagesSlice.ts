import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagesState, Page, PageBlock, ContentItem } from "./pageType";
import homePageData from "@/lib/data/pages/homePage.json";
import shopPageData from "@/lib/data/pages/shopPage.json";
import cartPageData from "@/lib/data/pages/cartPage.json";
import checkoutPageData from "@/lib/data/pages/checkoutPage.json";
import wishlistPageData from "@/lib/data/pages/wishlistPage.json";
import aboutPageData from "@/lib/data/pages/aboutPage.json";
import contactPageData from "@/lib/data/pages/contactPage.json";
import faqPageData from "@/lib/data/pages/faqPage.json";
import termsPageData from "@/lib/data/pages/termsPage.json";
import privacyPageData from "@/lib/data/pages/privacyPage.json";
import returnsPageData from "@/lib/data/pages/returnsPage.json";
import nutritionPageData from "@/lib/data/pages/nutritionPage.json";
import processPageData from "@/lib/data/pages/processPage.json";
import productDetailPageData from "@/lib/data/pages/productDetailPage.json";

const initialState: PagesState = {
  allPages: [homePageData, shopPageData, cartPageData, checkoutPageData, wishlistPageData, aboutPageData, nutritionPageData, processPageData, contactPageData, faqPageData, termsPageData, privacyPageData, returnsPageData, productDetailPageData] as Page[],
  currentPages: null,
  isAllPageFetched: false,
  isError: false,
  isLoading: false,
  isEditablePage: false,
};

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const deepSetValue = (obj: any, path: string[], value: any): boolean => {
  if (path.length === 0) return false;
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) current[path[i]] = {};
    current = current[path[i]];
    if (typeof current !== "object") return false;
  }
  current[path[path.length - 1]] = value;
  return true;
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setCurrentPageBySlug: (state, action: PayloadAction<string>) => {
      const slug = action.payload;
      const foundPage = state.allPages.find((page) => page.slug === slug);
      state.currentPages = foundPage ? deepClone(foundPage) : null;
    },
    setEditableMode: (state, action: PayloadAction<boolean>) => { state.isEditablePage = action.payload; },
    updatePageField: (state, action: PayloadAction<{ sectionId: string; fieldPath: string; value: string; locale?: string }>) => {
      const { sectionId, fieldPath, value, locale = "en" } = action.payload;
      if (!state.currentPages || !state.currentPages.sections) return;
      const sectionIndex = state.currentPages.sections.findIndex((s) => s.id === sectionId);
      if (sectionIndex === -1) return;
      const pathParts = fieldPath.split(".");
      const updatedCurrentPages = deepClone(state.currentPages);
      const sectionToUpdate = updatedCurrentPages.sections[sectionIndex];
      const success = deepSetValue(sectionToUpdate, pathParts, value);
      if (success) {
        state.currentPages = updatedCurrentPages;
        const pageIndex = state.allPages.findIndex((p) => p.slug === updatedCurrentPages.slug);
        if (pageIndex !== -1) {
          const updatedAllPages = deepClone(state.allPages);
          const allPageSection = updatedAllPages[pageIndex].sections.find((s) => s.id === sectionId);
          if (allPageSection) { deepSetValue(allPageSection, pathParts, value); }
          state.allPages = updatedAllPages;
        }
      }
    },
    refreshCurrentPage: (state) => {
      if (state.currentPages) {
        const refreshed = state.allPages.find((p) => p.slug === state.currentPages?.slug);
        if (refreshed) state.currentPages = deepClone(refreshed);
      }
    },
  },
});

export const { setCurrentPageBySlug, setEditableMode, updatePageField, refreshCurrentPage } = pagesSlice.actions;
export default pagesSlice.reducer;
