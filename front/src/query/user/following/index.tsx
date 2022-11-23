import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "src/libs/axios";

type UserFollowingsResponse = {
  id: number;
  user_id: string;
  name: string;
  introduction: string | null;
  profile_image: string | null;
};

// 페이지네이션에 필요한 전체 페이지 수
export const userFollowingCountAPI = async (user_id: string | undefined) => client.get<number>(`/user/${user_id}/following/count`).then((res) => res.data);
// 팔로우 목록
export const userFollowingsAPI = (user_id: string | undefined, page: string | null) => client.get<UserFollowingsResponse[]>(`/user/${user_id}/following?page=${page}`).then((res) => res.data);

// 팔로우 & 언팔로우
export const userFollowing = () => client.get(``).then((res) => res.data);
export const userUnFollowing = () => client.get(``).then((res) => res.data);

export const useUserFollowingCountQuery = (user_id: string | undefined) => {
  return useQuery(["following", user_id], () => userFollowingCountAPI(user_id));
};

export const useUserFollowingsQuery = (user_id: string | undefined, page: string | null) => {
  return useQuery(["following", user_id, page], () => userFollowingsAPI(user_id, page), {
    enabled: !!user_id,
  });
};
