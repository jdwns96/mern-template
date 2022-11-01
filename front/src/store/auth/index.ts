import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  count: number;
  name: string;
};

const authSlice = createSlice({
  name: "test",

  initialState: {
    count: 0,
    name: "",
  } as State,

  reducers: {
    plus: (state) => {
      state.count += 1;
    },
    minus: (state) => {
      state.count -= 1;
    },
    changeName: {
      reducer: (state, action: PayloadAction<{ name: string }>) => {
        state.name = action.payload.name;
      },
      prepare: (name: string) => ({
        payload: {
          name: name,
        },
      }),
    },
  },
});

// action
export const { plus, minus, changeName } = authSlice.actions;
// reducer
export default authSlice.reducer;
