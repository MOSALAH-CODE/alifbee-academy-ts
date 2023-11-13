import { configureStore } from "@reduxjs/toolkit";
import pagePropsReducer from "./features/pagePropsSlice";
import userReducer from "./features/userSlice";
import lessonsReducer from "./features/lessonsSlice";

const rootReducer = {
    pageProps: pagePropsReducer,
    user: userReducer,
    lessons: lessonsReducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
