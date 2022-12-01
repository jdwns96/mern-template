import { useAppDispatch, useAppSelector } from "src/store";

import AppTemplate from "src/components/layout/templates/AppTemplate";

import { useEffect, useState } from "react";

import cn from "classnames";

import { ArrowRight, ChatBubbleOutline, MoreHoriz, MoreVert, ThumbUpOffAlt } from "@mui/icons-material";

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
            <article className={cn(" transition-all z-50 absolute md:relative w-80 h-full md:choco-border-r bg-red-50 top-0  md:left-0", sideComponent ? "left-0" : "left-[-20rem]")}>
              <div className="w-full h-full bg-green-200 overflow-y-auto"></div>
              <nav className="grow md:hidden absolute -right-6 top-0 bottom-0 w-6  flex justify-center items-center bg-gray-300" onClick={onToggle}>
                {sideComponent ? <ArrowRight className="transform rotate-180" /> : <ArrowRight />}
              </nav>
            </article>
            <article></article>
          </main>
          {/* <AppFooter /> */}
        </section>
      </section>
    </AppTemplate>
  );
}
