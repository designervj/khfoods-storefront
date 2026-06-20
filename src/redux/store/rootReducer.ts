import { combineReducers } from "@reduxjs/toolkit";
import { blueprintReducer } from "../slices/blueprint";
import pagesReducer from "../slices/pages/pagesSlice";
import cartReducer from "../slices/ecommerce/cartSlice";
import authReducer from "../slices/ecommerce/authSlice";
import ordersReducer from "../slices/ecommerce/ordersSlice";

const rootReducer = combineReducers({
  blueprint: blueprintReducer,
  pages: pagesReducer,
  cart: cartReducer,
  auth: authReducer,
  orders: ordersReducer,
});

export default rootReducer;
