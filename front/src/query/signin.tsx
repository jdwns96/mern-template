import { useMutation } from "@tanstack/react-query";
import client from "src/libs/axios";

export interface SigninPayload {
  user_id: string;
  password: string;
}

export const signinAPI = (payload: SigninPayload) => client.post("/login", { ...payload }).then((res) => res.data);

export const useSigninMutation = () => {
  return useMutation(signinAPI);
};
