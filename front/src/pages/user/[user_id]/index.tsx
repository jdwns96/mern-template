import React from "react";
import { useParams } from "react-router-dom";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import { useAppSelector } from "src/store";

export default function DynamicUserIdPage() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  // get user_id from url
  const { user_id: url_user_id } = useParams<{ user_id: string }>();

  return (
    <AppTemplate>
      <div>{url_user_id}</div>
      <div>{user_id}</div>
    </AppTemplate>
  );
}
