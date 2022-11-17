import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import AppFooter from "src/components/layout/footers/AppFooter";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import { useUserFollowings } from "src/query/user/following";

export default function FollowingPage() {
  // get user_id from url
  const { user_id: url_user_id } = useParams<{ user_id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

  const { isLoading: isFollowingsLoading, data: followingsData } = useUserFollowings(url_user_id, pageParam ?? "1");
  console.log(followingsData);
  return (
    <AppTemplate>
      <div className="w-full h-full">
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <article className="bg-white shadow-md rounded-md mb-2">
            <header className="border-b border-solid border-gray-300">
              <h1>{url_user_id}</h1>
            </header>
            <nav className="flex">
              <div>
                <Link to="../followee" relative="path">
                  <button>팔로워</button>
                </Link>
              </div>
              <div>
                <Link to="">
                  <button className="bg-snack-sky">팔로우</button>
                </Link>
              </div>
            </nav>
            <main>
              <div className="">
                <div></div>
              </div>
            </main>
          </article>
          <article>
            <div>{/* 페이지 네이션 */}</div>
          </article>
        </div>
      </div>
      <AppFooter />
    </AppTemplate>
  );
}
