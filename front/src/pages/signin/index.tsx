import { Button, Input, Paper, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignTemplate from "src/components/layout/templates/SignTemplate";

import client from "src/libs/axios";
import { useAppDispatch } from "src/store";
import { setAuth } from "src/store/auth";
import toast, { Toaster } from "react-hot-toast";
import { EggAlt } from "@mui/icons-material";

interface SigninPayload {
  user_id: string;
  password: string;
}

export default function Signin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    user_id: "foo",
    password: "123",
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
                <div className="py-0 ">
                  <div className="py-4 px-4 flex justify-center items-center mb-4 bg-edge-blue rounded-md">
                    <p className="text-snack-sky">
                      <EggAlt style={{ width: 48, height: 48 }} />
                    </p>
                    <p className="font-extrabold ml-2 text-3xl text-snack-sky">SNACK</p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="mb-2">
                  {/* <label htmlFor="" className="block text-gray-500 font-semibold  mb-1  pr-4 mt-3 text-sm">
                    아이디 혹은 이메일
                  </label> */}
                  <input className="snack-input" name="user_id" value={inputs.user_id} onChange={onChangeInputs} placeholder="아이디 혹은 이메일" />
                </div>
                <div>
                  {/* <label htmlFor="" className="block text-gray-500 font-semibold  mb-1  pr-4 mt-3 text-sm">
                    비밀번호
                  </label> */}
                  <input className="snack-input" type="password" name="password" value={inputs.password} onChange={onChangeInputs} placeholder="비밀번호" />
                </div>
              </div>
              <div className="flex">
                <div className="w-full mr-1">
                  {isLoading === true ? (
                    <button className="snack-btn w-full flex justify-center items-center" disabled onClick={onSignin}>
                      <span>signin</span>
                    </button>
                  ) : (
                    <button className="snack-btn w-full flex justify-center items-center" onClick={onSignin} type="submit">
                      <span>signin</span>
                    </button>
                  )}
                </div>
                <div className="w-full ml-1">
                  <button className="snack-btn  w-full flex justify-center items-center" type="button">
                    <span>signup</span>
                  </button>
                </div>
              </div>
            </form>
          </Paper>
        </div>
      </section>
      <Toaster position="bottom-center" />
    </SignTemplate>
  );
}
