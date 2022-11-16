import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
export const userFollowingAPI = () => client.patch(`/user/following`).then((res) => res.data); // 유저 팔로잉 신청
export const userUnfollowingAPI = () => client.delete(`/user/following`).then((res) => res.data); // 유저 언팔로우 신청

export const useUserQuery = (user_id: string | undefined) => {
  return useQuery(["user", user_id], () => userAPI(user_id));
};
//@TODO 나중에 수정을 해야할것 같은데..
export const useUserFollowingCheckQuery = (other_user_id: string | undefined, user_id: string | null) => {
  return useQuery(["user", user_id, "check"], () => userFollowingCheckAPI(other_user_id), {
    retry: 0,
    enabled: user_id !== null && user_id !== other_user_id,
  });
};
export const useUserFollowingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(userFollowingAPI, {
    onSuccess(data, variables, context) {
      // queryClient.invalidateQueries(["user", variables.other_user_id, "check"]);
    },
  });
};
export const useUserUnfollowingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(userUnfollowingAPI, {
    onSuccess(data, variables, context) {
      // queryClient.invalidateQueries(["user", variables.other_user_id, "check"]);
    },
  });
};
