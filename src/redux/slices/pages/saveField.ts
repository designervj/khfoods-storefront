import { Dispatch } from "@reduxjs/toolkit";
import { updatePageField } from "./pagesSlice";
import { Page } from "./pageType";

export const saveField = (dispatch: Dispatch, currentPages: Page | null, sectionId: string, fieldPath: string, value: string, locale: string = "en"): Promise<void> => {
  return new Promise((resolve) => {
    if (!currentPages) { resolve(); return; }
    dispatch(updatePageField({ sectionId, fieldPath, value, locale }));
    requestAnimationFrame(() => { requestAnimationFrame(() => { resolve(); }); });
  });
};
