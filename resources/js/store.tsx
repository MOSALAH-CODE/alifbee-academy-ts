import { configureStore } from "@reduxjs/toolkit";
import pagePropsReducer from "./features/pagePropsSlice";

const rootReducer = {
    pageProps: pagePropsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
