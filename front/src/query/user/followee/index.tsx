import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "src/libs/axios";

type UserFolloweeResponse = {
  id: number;
  user_id: string;
  name: string;
  introduction: string | null;
  profile_image: string | null;
};

// 페이지네이션에 필요한 전체 페이지 수
export const userFolloweeCountAPI = async (user_id: string | undefined) => client.get<number>(`/user/${user_id}/followee/count`).then((res) => res.data);
export const userFolloweesAPI = (user_id: string | undefined, page: string | null) => client.get<UserFolloweeResponse[]>(`/user/${user_id}/followee?page=${page}`).then((res) => res.data);

export const useUserFolloweeCountQuery = (user_id: string | undefined) => {
  return useQuery(["followee", user_id], () => userFolloweeCountAPI(user_id));
};
export const useUserFolloweesQuery = (user_id: string | undefined, page: string | null) => {
  return useQuery(["followee", user_id, page], () => userFolloweesAPI(user_id, page), {
    enabled: !!user_id,
  });
};
