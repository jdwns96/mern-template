import { useMutation, useQuery } from "@tanstack/react-query";
import client from "src/libs/axios";

interface UserResponse {
  id: number;
  user_id: string;
  name: string;
  introduction: string;
  profile_image: string;
  background_image: string;
  followee_cnt: number;
  following_cnt: number;
}

export const userAPI = (user_id: string | undefined) => client.get<UserResponse>(`/user/${user_id}`).then((res) => res.data);
export const userFollowingCheckAPI = (user_id: string | undefined) => client.get(`/user/${user_id}/follow-check`).then((res) => res.data);

export const useUserQuery = (user_id: string | undefined) => {
  return useQuery(["user", user_id], () => userAPI(user_id));
};

export const useUserFollowingCheckQuery = (other_user_id: string | undefined, user_id: string | null) => {
  return useQuery(["user", user_id, "check"], () => userFollowingCheckAPI(other_user_id), {
    refetchOnWindowFocus: true,
    retry: 0,
    enabled: user_id !== null && user_id !== other_user_id,
  });
};
