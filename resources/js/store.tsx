import { configureStore } from "@reduxjs/toolkit";
import pagePropsReducer from "./features/pagePropsSlice";
import bookLessonReducer from "./features/bookLessonSlice";

const rootReducer = {
    pageProps: pagePropsReducer,
    bookLesson: bookLessonReducer,
};
// Load state from local storage when initializing the store
const persistedState = localStorage.getItem("reduxState")
    ? JSON.parse(localStorage.getItem("reduxState")!)
    : {};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Save state to local storage whenever it changes
store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
