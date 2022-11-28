import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  id: number | null;
  user_id: string | null;
  name: string | null;
  introduction: string | null;
  profile_image: string | null;
  background_image: string | null;
};

const initialState = {
  id: null,
  user_id: null,
  name: null,
  introduction: null,
  profile_image: null,
  background_image: null,
} as State;

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.id = action.payload.id;
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
      state.introduction = action.payload.introduction;
      state.profile_image = action.payload.profile_image;
      state.background_image = action.payload.background_image;
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
