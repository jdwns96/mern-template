import { Button, Input, Paper, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignTemplate from "src/components/layout/templates/SignTemplate";

import client from "src/libs/axios";
import { useAppDispatch } from "src/store";
import { setAuth } from "src/store/auth";
import toast, { Toaster } from "react-hot-toast";

interface SigninPayload {
  user_id: string;
  password: string;
}

export default function Signin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    user_id: "",
    password: "",
  });

  const { isLoading, isSuccess, isError, mutateAsync } = useMutation((payload: SigninPayload) =>
    client
      .post("/login", {
        ...payload,
      })
      .then((res) => res.data),
  );

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((ps) => {
      return {
        ...ps,
        [name]: value,
      };
    });
  };

  const onSignin = async (evt: React.FormEvent<EventTarget>) => {
    try {
      evt.preventDefault();
      const { user_id, password } = inputs;
      console.log(user_id, password);

      const response = await mutateAsync({ user_id, password });
      console.log(response);

      dispatch(setAuth({ ...response.user })); // store
      client.defaults.headers.authorization = `${response.token.accessToken}`; // access
      localStorage.setItem("refresh", response.token.refreshToken); // refresh
      navigate("/"); // redirect
    } catch (e) {
      console.dir(e);
      toast("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <SignTemplate>
      <section className="flex h-full min-h-screen items-center">
        <div className="mx-auto w-96">
          <Paper className="p-8">
            <form action="" onSubmit={onSignin}>
              <div>
                <input className="snack-input" name="user_id" value={inputs.user_id} onChange={onChangeInputs} />
              </div>
              <div>
                <input className="snack-input" name="password" value={inputs.password} onChange={onChangeInputs} />
              </div>
              <div>
                {isLoading === true ? (
                  <button className="snack-btn" disabled onClick={onSignin}>
                    <span>signin</span>
                  </button>
                ) : (
                  <button className="snack-btn" onClick={onSignin} type="submit">
                    <span>signin</span>
                  </button>
                )}

                <button className="snack-btn" type="button">
                  <span>signup</span>
                </button>
              </div>
            </form>
          </Paper>
        </div>
      </section>
      <Toaster position="bottom-center" />
    </SignTemplate>
  );
}
