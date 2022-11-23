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

  const { isLoading: isFolloweeCountLoading, data: followeeCountData } = useUserFolloweeCountQuery(url_user_id);
  const { isLoading: isFolloweesLoading, data: followeesData } = useUserFolloweesQuery(url_user_id, pageParam ?? "1");

  const onClickPageIcon = (type: 1 | 2 | 3 | 4) => () => {
    if (followeeCountData === undefined) return null;

    switch (type) {
      case 1:
        setSearchParams({ page: "1" });
        break;
      case 2:
        if (pageParam !== null && Number(pageParam) > 1) {
          setSearchParams({ page: String(Number(pageParam) - 1) });
        }
        break;
      case 3:
        if (Number(pageParam) < Math.ceil(followeeCountData / 10)) {
          setSearchParams({ page: String(Number(pageParam ?? 1) + 1) });
        }
        break;
      case 4:
        if (followeeCountData !== 0) {
          setSearchParams({ page: String(Math.ceil(followeeCountData / 10)) });
        }
        break;
    }
  };

  return (
    <AppTemplate>
      <div className="w-full h-full">
        <div className="max-w-4xl mx-auto mt-6 px-4">
          <article className="bg-white shadow-md rounded-md mb-2">
            <header className="border-b border-solid border-gray-300 p-4">
              <h1 className="text-xl">
                <span className="font-semibold">{url_user_id}</span> 님의 팔로워 목록
              </h1>
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
                  followeesData?.map((v, i) => (
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
            <article className="bg-white shadow-md rounded-md  w-full flex justify-center p-4">
              <ul className="flex  p-2">
                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(1)}>
                    <KeyboardDoubleArrowLeft />
                  </button>
                </li>
                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(2)}>
                    <KeyboardArrowLeft />
                  </button>
                </li>
                {paginationUtil(followeeCountData ?? 0, pageParam === null ? 1 : Number(pageParam), 5).map((v, i) => (
                  <Link key={v} to={`?page=${v}`}>
                    <li className="mx-0.5">
                      <button
                        className={cn(
                          "w-8 h-8 rounded-md hover:bg-gray-100 ",
                          v === Number(pageParam) && "border border-solid border-snack-sky text-snack-sky",
                          v === 1 && pageParam === null && "border border-solid border-snack-sky text-snack-sky",
                        )}
                      >
                        {v}
                      </button>
                    </li>
                  </Link>
                ))}

                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(3)}>
                    <KeyboardArrowRight />
                  </button>
                </li>
                <li className="mx-0.5">
                  <button className="w-8 h-8" onClick={onClickPageIcon(4)}>
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
