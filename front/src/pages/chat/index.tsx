import { useAppDispatch, useAppSelector } from "src/store";

import AppTemplate from "src/components/layout/templates/AppTemplate";

import { useEffect, useState } from "react";

import cn from "classnames";

import { ArrowRight, ChatBubbleOutline, Image, MoreHoriz, MoreVert, Send as SendIcon, ThumbUpOffAlt } from "@mui/icons-material";

import { Send, Receive, TimeLine } from "src/components/common/message";

export default function ChatPage() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  const [sideComponent, setSideComponent] = useState<boolean>(false);

  const onToggle = () => {
    setSideComponent(!sideComponent);
  };

  return (
    <AppTemplate>
      <section className="fixed top-0 bottom-0 left-0 right-0 pt-[52px] pb-[56px] md:pb-0">
        <section className="relative w-full h-full max-w-5xl mx-auto md:px-3 md:pt-4 md:pb-4">
          <main className="relative w-full h-full md:mb-2 md:rounded-md bg-white md:flex dark:bg-[#3D3D3D] choco-border">
            <div
              className={cn(
                "absolute top-0 bottom-0 w-full h-full max-w-[300px] pr-6 transition-all",
                "md:relative md:pr-0 md:left-0 md:shrink-0 md:transition-none",
                sideComponent ? "left-0 " : "left-[-276px] w-[300px]",
              )}
            >
              <div className={cn("z-50 absolute top-0 bottom-0 w-full h-full pr-6", "md:pr-0")}>
                <div className="h-full overflow-y-auto bg-white md:choco-border-r rounded-l-md"></div>
              </div>
              <nav className="z-50 absolute top-0 bottom-0 right-0 w-6  md:hidden flex justify-center items-center choco-border-l choco-border-r bg-[#F8F9F9]" onClick={onToggle}>
                {sideComponent ? <ArrowRight className="transform rotate-180" /> : <ArrowRight />}
              </nav>
            </div>
            <div className="relative w-full h-full pl-6 md:pl-0 flex flex-col">
              <header className="px-4 h-16 choco-border-b shrink-0">
                <div className="h-full flex items-center">
                  <div className="w-8 h-8 rounded-full choco-border"></div>
                  <div className="ml-4">
                    <span>아이디</span>
                  </div>
                </div>
                <div></div>
              </header>
              <main className="w-full h-full overflow-y-auto px-4 flex flex-col">
                <div className="pt-4">
                  <Receive value={{ id: "text", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium", image: "asd" }} />
                  <Send value={{ id: "text", text: "Lorem ipsum dolor sit amet consectetur adipi" }} />
                  <TimeLine time={new Date()} />
                </div>
              </main>
              <nav className="p-4">
                <form
                  action=""
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="rounded-lg choco-border flex p-1 items-center">
                    <div className="h-full">
                      <button type="button">
                        <span className="cursor-pointer px-2 text-choco-silver-300">
                          <Image />
                        </span>
                      </button>
                    </div>
                    <div className="grow flex items-center">
                      <textarea className="w-full h-full p-2 outline-none focus:outline-none resize-none max-h-10" placeholder="메세지 보내기" />
                    </div>
                    <div>
                      <button type="submit">
                        <span className="cursor-pointer px-2  text-choco-sky">
                          <SendIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </nav>
            </div>
          </main>
        </section>
      </section>
    </AppTemplate>
  );
}
