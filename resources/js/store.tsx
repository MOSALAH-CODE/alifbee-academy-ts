import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers } from "@reduxjs/toolkit";

import pagePropsReducer from "./features/pagePropsSlice";
import bookLessonReducer from "./features/bookLessonSlice";

const rootReducer = combineReducers({
    pageProps: pagePropsReducer,
    bookLesson: bookLessonReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store); // Create a persistor object

export type RootState = ReturnType<typeof store.getState>;
