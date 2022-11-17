import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "src/libs/axios";

// 팔로우 목록
export const userFollowingsAPI = (user_id: string | undefined, page: string | null) => client.get(`/user/${user_id}/following?page=${page}`).then((res) => res.data);

export const useUserFollowings = (user_id: string | undefined, page: string | null) => {
  return useQuery(["userFollowings", user_id, page], () => userFollowingsAPI(user_id, page), {
    enabled: !!user_id,
  });
};
