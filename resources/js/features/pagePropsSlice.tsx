import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PageProps, createPageProps } from "@/types";

export const pagePropsSlice = createSlice({
    name: "pageProps",
    initialState: {
        pageProps: createPageProps({
            auth: {
                user: null,
            },
            lessons: null,
            lessons_status: null,
        }),
    },
    reducers: {
        updatePageProps: (state, action) => {
            state.pageProps = createPageProps(action.payload);
        },
    },
});

export const { updatePageProps } = pagePropsSlice.actions;

export const selectPageProps = (state: RootState) => state.pageProps.pageProps;

export default pagePropsSlice.reducer;
