import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSlideReducer from "./productSlide";

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSlideReducer,
  },
  preloadedState: loadFromLocalStorage(),
});

function saveToLocalStorage(state) {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem("Mern-project", serialState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("Mern-project");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
