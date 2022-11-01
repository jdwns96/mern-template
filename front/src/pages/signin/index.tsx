import { Button, Input, Paper, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

import client from "src/libs/axios";
import { useAppDispatch } from "src/store";
import { setAuth } from "src/store/auth";

interface SigninPayload {
  user_id: string;
  password: string;
}

export default function Signin() {
  const dispatch = useAppDispatch();

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

  const onSignin = async () => {
    try {
      const { user_id, password } = inputs;
      console.log(user_id, password);

      const response = await mutateAsync({ user_id, password });
      console.log(response);

      dispatch(setAuth({ ...response.user })); // store
      client.defaults.headers.authorization = `${response.token.accessToken}`; // access
      localStorage.setItem("refresh", response.token.refreshToken); // refresh
    } catch (e) {
      console.dir(e);
    }
  };

  return (
    <>
      <div>
        <Paper style={{}}>
          <div>
            <TextField size="small" label="ID" variant="outlined" name="user_id" value={inputs.user_id} onChange={onChangeInputs} />
          </div>
          <div>
            <TextField size="small" label="PASSWORD" variant="outlined" name="password" value={inputs.password} onChange={onChangeInputs} />
          </div>
          <div>
            {isLoading === true ? (
              <Button disabled variant="outlined" onClick={onSignin}>
                signin
              </Button>
            ) : (
              <Button variant="outlined" onClick={onSignin}>
                signin
              </Button>
            )}

            <Button variant="contained" disableElevation>
              signup
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
