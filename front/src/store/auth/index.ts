import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  id: number | null;
  user_id: string | null;
  name: string | null;
};

const initialState = {
  id: null,
  user_id: null,
  name: null,
} as State;

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id;
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
    },
    removeAuth: (state) => {
      state = initialState;
    },
  },
});

// action
export const { setAuth, removeAuth } = authSlice.actions;
// reducer
export default authSlice.reducer;
