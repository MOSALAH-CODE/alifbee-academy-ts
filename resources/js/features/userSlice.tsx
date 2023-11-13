import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "@/types";

interface UserState {
    user: User | null;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    } as UserState,
    reducers: {
        updateUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
    },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
