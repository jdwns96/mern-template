import { useMutation, useQuery } from "@tanstack/react-query";
import client from "src/libs/axios";

interface UserResponse {
  id: number;
  user_id: string;
  name: string;
  introduction: string;
  profile_image: string;
  background_image: string;
}

export const userAPI = (user_id: string | undefined) => client.get<UserResponse>(`/user/${user_id}`).then((res) => res.data);

export const useUserQuery = (user_id: string | undefined) => {
  return useQuery(["user", user_id], () => userAPI(user_id));
};
