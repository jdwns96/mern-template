import React from "react";
import { useParams } from "react-router-dom";
import AppTemplate from "src/components/layout/templates/AppTemplate";
import { useAppSelector } from "src/store";

import imageTest from "src/assets/images/image-test.jpg";
import cn from "classnames";
import { ModeEditOutline } from "@mui/icons-material";
import AppFooter from "src/components/layout/footers/AppFooter";

export default function DynamicUserIdPage() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  // get user_id from url
  const { user_id: url_user_id } = useParams<{ user_id: string }>();

  return (
    <AppTemplate>
      <div className="w-full h-full">
        <div className="max-w-3xl mx-auto mt-6 px-4">
          <article className="bg-white shadow-md rounded-md mb-2">
            <div className="relative ">
              {/* background */}
              <div className="bg-gray-500 rounded-t-md">
                <div className="relative w-full h-[200px] overflow-hidden rounded-t-md ">
                  <div className="">
                    <img src={imageTest} alt="" className="-z-10" />
                  </div>
                </div>
              </div>
              {/* background */}
              {/* profile */}
              <div>
                <div className="absolute w-36 h-36 rounded-full bg-white left-8 bottom-0 overflow-hidden flex justify-center items-center">
                  <div className="w-[8.5rem] h-[8.5rem] rounded-full bg-black  overflow-hidden ">
                    <img src={imageTest} alt="" className="object-cover" />
                  </div>
                </div>
              </div>
              {/* profile */}
              <div className="py-6"></div>
            </div>
            <main className="py-2 px-6 pb-4">
              <div>
                <h1 className=" flex justify-between">
                  {/* @TODO 계정 정보를 서버에서 요청 받고 불러와야함, state 사용 x */}
                  <span className="text-2xl font-bold ">{user_id}</span>
                  {url_user_id === user_id && (
                    <div className={cn("block")}>
                      <button className="snack-btn ml-4">
                        <ModeEditOutline />
                      </button>
                    </div>
                  )}
                </h1>
                <p>
                  <span>이름</span>
                </p>
                <p>
                  <span>설명</span>
                </p>
              </div>
              <div className="flex">
                <div>
                  <button className="snack-btn">메세지</button>
                </div>
                <div>
                  <button className="snack-btn">팔로우</button>
                </div>
              </div>
            </main>
          </article>
          <article className="bg-white shadow-md rounded-md mb-2">
            <div className="py-4">
              <div className="flex px-6">
                <div className="w-full">
                  <span className="cursor-pointer">
                    <span className="text-snack-sky ">스낵</span>
                    <span className="ml-4">0</span>
                  </span>
                </div>
                <div className="w-full">
                  <span className="cursor-pointer">
                    <span className="text-snack-sky ">팔로워</span>
                    <span className="ml-4">0</span>
                  </span>
                </div>
                <div className="w-full">
                  <span className="cursor-pointer">
                    <span className="text-snack-sky ">팔로우</span>
                    <span className="ml-4">0</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
          {/* <article className="bg-white shadow-md rounded-md mb-2">글쓰기</article> */}
          <article className="bg-white shadow-md rounded-md mb-2">
            <header className="px-6 py-4 flex">
              <h1 className="text-lg font-semibold">
                <span>스낵</span>
              </h1>
              <div></div>
            </header>
            <div className="">1</div>
          </article>
        </div>
      </div>
      {/* <div>{url_user_id}</div>
      <div>{user_id}</div> */}
      <AppFooter />
    </AppTemplate>
  );
}
