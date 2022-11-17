import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import AppFooter from "src/components/layout/footers/AppFooter";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import { useUserFollowingCountQuery, useUserFollowingsQuery } from "src/query/user/following";

// module
import cn from "classnames";

// utils
import paginationUtil from "src/utils/pagination-util";
import { KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { useUserFolloweeCountQuery, useUserFolloweesQuery } from "src/query/user/followee";

export default function FolloweePage() {
  // get user_id from url
  const { user_id: url_user_id } = useParams<{ user_id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

  const { isLoading: isFolloweeCountLoading, data: followingCountData } = useUserFolloweeCountQuery(url_user_id);
  const { isLoading: isFolloweesLoading, data: followingsData } = useUserFolloweesQuery(url_user_id, pageParam ?? "1");

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
                <Link to="" relative="path">
                  <button className="snack-btn py-4 bg-snack-sky">팔로워</button>
                </Link>
              </div>
              <div>
                <Link to="../following" relative="path">
                  <button className="snack-btn py-4 ">팔로우</button>
                </Link>
              </div>
            </nav>
            <main>
              <div className="p-4">
                {isFolloweesLoading ? (
                  <div> skeleton </div>
                ) : (
                  followingsData?.map((v, i) => (
                    <div className="flex w-full justify-between border-b border-solid border-gray-300 pb-2 mb-4" key={v.id}>
                      <div className="flex ">
                        <div>
                          <Link to={`/${v.user_id}`}>
                            <div className="rounded-full w-16 h-16 bg-gray-300"></div>
                          </Link>
                        </div>
                        <div className="ml-2">
                          <p>
                            <Link to={`/${v.user_id}`}>{v.name}</Link>
                          </p>
                          <p>{v.introduction ?? "-"}</p>
                        </div>
                      </div>
                      <div>
                        <button className="snack-btn">언팔로우</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </main>
          </article>
          {isFolloweeCountLoading ? (
            <div> skeleton </div>
          ) : (
            <article className="bg-white shadow-md rounded-md  w-full flex justify-center">
              <ul className="flex  p-2">
                <li>
                  <button className="w-8 h-8">
                    <KeyboardDoubleArrowLeft />
                  </button>
                </li>
                <li>
                  <button className="w-8 h-8">
                    <KeyboardArrowLeft />
                  </button>
                </li>
                {paginationUtil(followingCountData ?? 0, pageParam === null ? 1 : Number(pageParam), 5).map((v, i) => (
                  <Link key={v} to={`?page=${v}`}>
                    <li>
                      <button className={cn("w-8 h-8", v === Number(pageParam) && "bg-snack-sky", v === 1 && pageParam === null && "bg-snack-sky")}>{v}</button>
                    </li>
                  </Link>
                ))}

                <li>
                  <button className="w-8 h-8">
                    <KeyboardArrowRight />
                  </button>
                </li>
                <li>
                  <button className="w-8 h-8">
                    <KeyboardDoubleArrowRight />
                  </button>
                </li>
              </ul>
            </article>
          )}
        </div>
      </div>
      <AppFooter />
    </AppTemplate>
  );
}
