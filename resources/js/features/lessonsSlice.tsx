import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const lessonsSlice = createSlice({
    name: "lessons",
    initialState: {
        lessons: [],
    },
    reducers: {
        updateLessons: (state, action) => {
            state.lessons = action.payload;
        },
    },
});

export const { updateLessons } = lessonsSlice.actions;

export const selectLessons = (state: RootState) => state.lessons.lessons;

export default lessonsSlice.reducer;
