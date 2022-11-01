import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// reducer
import auth from "./auth";

export const store = configureStore({
  reducer: {
    auth,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>; // store 내부 값들을 추론하기 위한 RootState
export type AppDispatch = typeof store.dispatch;

// 기존의 `useDispatch` 와 `useSelector` 사용하지 않고 타입 정의 한 useAppDispatch, useAppSelector 를 사용한다.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
