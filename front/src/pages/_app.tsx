import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { plus, minus, changeName } from "src/store/auth";

export default function App() {
  const dispatch = useAppDispatch();
  const { count, name } = useAppSelector((store) => store.auth);

  const [input, setInput] = useState("");

  const onPlus = () => {
    dispatch(plus());
  };
  const onMinus = () => {
    dispatch(minus());
  };

  return (
    <>
      <div>
        {count}
        <button onClick={onPlus}>+</button>
        <button onClick={onMinus}>-</button>
      </div>
      <div>
        {name}
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch(changeName(input));
          }}
        >
          변경
        </button>
      </div>
    </>
  );
}
