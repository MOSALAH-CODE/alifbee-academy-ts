import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Lesson } from "@/types"; // Import the Lesson type

// Define the type for the action payload
type SetBookLessonPayload = Lesson | null;

export const bookLessonSlice = createSlice({
    name: "bookLesson",
    initialState: {
        lesson: null as SetBookLessonPayload, // Use the SetBookLessonPayload type
    },
    reducers: {
        setBookLesson: (state, action: PayloadAction<SetBookLessonPayload>) => {
            state.lesson = action.payload;
        },
        updateBookLesson: (state, action: PayloadAction<Lesson>) => {
            state.lesson = action.payload;
        },
        resetBookLesson: (state) => {
            state.lesson = null;
        },
    },
});

export const { setBookLesson, updateBookLesson, resetBookLesson } =
    bookLessonSlice.actions;

export const selectBookLesson = (state: RootState) => state.bookLesson.lesson;

export default bookLessonSlice.reducer;
