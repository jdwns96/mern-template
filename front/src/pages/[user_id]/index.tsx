import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import { useAppSelector } from "src/store";

import imageTest from "src/assets/images/image-test.jpg";
import cn from "classnames";
import { Add, Edit, ModeEditOutline, Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import AppFooter from "src/components/layout/footers/AppFooter";
import { useUserFollowingCheckQuery, useUserQuery } from "src/query/user";

import { CreatePostModal } from "src/components/_pages/_[user_id]";
import PostModal from "src/components/common/post";

import image from "src/assets/images/image-test.jpg";

export default function DynamicUserIdPage() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  // get user_id from url
  const { user_id: url_user_id } = useParams<{ user_id: string }>();

  const { isLoading, data: userData } = useUserQuery(url_user_id);
  // @TODO
  const { isLoading: isUserFollowingCheckLoading, isError: isUserFollowingCheckError, data: userFollowingCheckData } = useUserFollowingCheckQuery(url_user_id, user_id);

  const onFollow = () => {
    if (!id) {
      console.log("not login");
      alert("로그인이 필요합니다.");
      navigate("/signin");
    }
  };

  const onUnfollowClick = () => {
    console.log("unfollow");
  };

  console.log(userData);
  return (
    <AppTemplate>
      <div className="w-full h-full">
        <div className="max-w-3xl mx-auto mt-6 px-4">
          <article className="bg-white shadow-md rounded-md mb-4 dark:bg-[#3D3D3D]">
            <div className="relative ">
              {/* background */}
              <div className="bg-gray-500 rounded-t-md">
                <div className="relative w-full h-[200px] overflow-hidden rounded-t-md ">
                  <div className="w-full h-full">
                    <img src={imageTest} alt="" className="-z-10 object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              {/* background */}
              {/* profile */}
              <div>
                <div className="absolute w-36 h-36 rounded-full bg-white left-8 bottom-0 overflow-hidden flex justify-center items-center cursor-pointer">
                  <div className="w-[8.5rem] h-[8.5rem] rounded-full bg-black  overflow-hidden ">
                    <img src={imageTest} alt="" className="object-cover w-full h-full " />
                  </div>
                </div>
              </div>
              {/* profile */}
              <div className="py-6"></div>
            </div>
            <main className="py-2 px-6 pb-4 snack-border-b">
              <div>
                <h1 className=" flex justify-between">
                  <p className="text-2xl font-bold ">{userData?.user_id}</p>
                  <div className="flex">
                    {id === userData?.id ? (
                      <>
                        <Link to="/account">
                          <IconButton style={{ color: "inherit" }}>
                            <Settings style={{ color: "inherit" }} />
                          </IconButton>
                        </Link>
                      </>
                    ) : (
                      <>
                        <div>
                          <button className="snack-btn">메세지</button>
                        </div>
                        <div>
                          {isUserFollowingCheckError || !userFollowingCheckData?.isFollowing ? (
                            <button className="snack-btn" onClick={onFollow}>
                              팔로우
                            </button>
                          ) : (
                            <button className="snack-btn bg-snack-blue hover:bg-snack-blue border-snack-blue text-white" onClick={onUnfollowClick}>
                              언팔로우
                            </button>
                          )}
                          {/*  */}
                        </div>
                      </>
                    )}
                  </div>
                </h1>
                <p>
                  <span>{userData?.name}</span>
                </p>
                <p>
                  <span>{userData?.introduction ?? "-"}</span>
                </p>
              </div>
            </main>
            <div className="py-4">
              <div className="flex px-6 text-md">
                <div className="w-full text-center">
                  <span className="cursor-pointer">
                    <span className="text-snack-sky ">포스트</span>
                    <span className="ml-4">0</span>
                  </span>
                </div>
                <div className="w-full text-center">
                  <Link to="followee">
                    <span className="cursor-pointer ">
                      <span className="text-snack-sky ">팔로워</span>
                      <span className="ml-4">{userData?.followee_cnt}</span>
                    </span>
                  </Link>
                </div>
                <div className="w-full text-center">
                  <Link to="following">
                    <span className="cursor-pointer ">
                      <span className="text-snack-sky ">팔로우</span>
                      <span className="ml-4">{userData?.following_cnt}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
          {/* <article className="bg-white shadow-md rounded-md mb-2 dark:bg-[#3D3D3D]">
            <div className="py-4">
              <div className="flex px-6">
                <div className="w-full">
                  <span className="cursor-pointer">
                    <span className="text-snack-sky ">포스트</span>
                    <span className="ml-4">0</span>
                  </span>
                </div>
                <div className="w-full">
                  <Link to="followee">
                    <span className="cursor-pointer">
                      <span className="text-snack-sky ">팔로워</span>
                      <span className="ml-4">{userData?.followee_cnt}</span>
                    </span>
                  </Link>
                </div>
                <div className="w-full">
                  <Link to="following">
                    <span className="cursor-pointer">
                      <span className="text-snack-sky ">팔로우</span>
                      <span className="ml-4">{userData?.following_cnt}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </article> */}
          {/* <article className="bg-white shadow-md rounded-md mb-2">글쓰기</article> */}
          <article className="bg-white shadow-md rounded-md mb-2 dark:bg-[#3D3D3D]">
            <header className="px-6 py-4 pb-2 flex">
              <h1 className="text-lg font-semibold flex justify-between w-full">
                <div className="flex items-center">
                  <span>포스트</span>
                </div>
                {id === userData?.id && (
                  <div>
                    <span
                      className=""
                      onClick={() => {
                        navigate("?modal=post");
                      }}
                    >
                      <IconButton style={{ color: "inherit" }}>
                        <Edit style={{ color: "inherit" }} />
                      </IconButton>
                    </span>
                  </div>
                )}
              </h1>
              <div></div>
            </header>
            <main className="">
              {/* if post exist */}
              <div className="flex px-3">
                <div className="m-2 w-1/3 relative   ">
                  <div className=" pb-[100%] bg-black rounded-md cursor-pointer overflow-hidden">
                    <img src={image} alt="snack" className="absolute top-0 bottom-0 w-full h-full object-cover rounded-md" onClick={() => {
                       navigate("?post=1");
                    }}/>
                  </div>
                </div>
                <div className="m-2 w-1/3 relative   ">
                  <div className=" pb-[100%] bg-black rounded-md cursor-pointer overflow-hidden">
                    <img src={image} alt="snack" className="absolute top-0 bottom-0 w-full h-full object-cover rounded-md" />
                  </div>
                </div>
                <div className="m-2 w-1/3 relative   ">
                  <div className=" pb-[100%] bg-black rounded-md cursor-pointer overflow-hidden">
                    <img src={image} alt="snack" className="absolute top-0 bottom-0 w-full h-full object-cover rounded-md" />
                  </div>
                </div>
              </div>
              {/* if post exist */}
              {/* if post is not exist */}
              {/* <article className="p-8 h-72 flex flex-col justify-center items-center">
                <div className="mb-8">
                  <span
                    className="text-snack-gold-300 cursor-pointer"
                    onClick={() => {
                      navigate("?modal=post");
                    }}
                  >
                    <Add style={{ width: 54, height: 54 }} />
                  </span>
                </div>
                <p className="text-lg">포스트 가 없습니다.</p>
              </article> */}
              {/* if post is not exist  */}
            </main>
            <footer className="p-4"></footer>
          </article>
        </div>
      </div>
      {/* <div>{url_user_id}</div>
      <div>{user_id}</div> */}
      <CreatePostModal />
      <PostModal />
      <AppFooter />
    </AppTemplate>
  );
}
