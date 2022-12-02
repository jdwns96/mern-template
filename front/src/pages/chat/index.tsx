import { useAppDispatch, useAppSelector } from "src/store";

import AppTemplate from "src/components/layout/templates/AppTemplate";

import { useEffect, useState } from "react";

import cn from "classnames";

import { ArrowRight, ChatBubbleOutline, MoreHoriz, MoreVert, ThumbUpOffAlt } from "@mui/icons-material";

export default function ChatPage() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  const [sideComponent, setSideComponent] = useState<boolean>(true);

  const onToggle = () => {
    setSideComponent(!sideComponent);
  };

  return (
    <AppTemplate>
      <section className="fixed top-0 bottom-0 left-0 right-0 pt-[52px] pb-[56px] md:pb-0">
        <section className="relative w-full h-full max-w-5xl mx-auto md:px-3 md:pt-4 md:pb-4">
          <main className="relative w-full h-full md:mb-2 md:rounded-md bg-white md:flex dark:bg-[#3D3D3D] choco-border">
            <div
              className={cn("absolute top-0 bottom-0 w-full h-full max-w-[300px] bg-blue-50 pr-6", "md:relative md:pr-0 md:left-0 md:shrink-0", sideComponent ? "left-0 " : "left-[-276px] w-[300px]")}
            >
              <div className={cn("absolute top-0 bottom-0 w-full h-full pr-6", "md:pr-0")}>
                <div className="h-full overflow-y-auto">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo debitis doloremque nemo dignissimos quis, molestias reprehenderit dolorum veritatis hic incidunt
                  similique soluta laboriosam accusamus illum perferendis sequi quisquam? Quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo debitis doloremque nemo
                  dignissimos quis, molestias reprehenderit dolorum veritatis hic incidunt similique soluta laboriosam accusamus illum perferendis sequi quisquam? Quas. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Accusantium explicabo debitis doloremque nemo dignissimos quis, molestias reprehenderit dolorum veritatis hic incidunt similique soluta laboriosam
                  accusamus illum perferendis sequi quisquam? Quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo debitis doloremque nemo dignissimos quis, molestias
                  reprehenderit dolorum veritatis hic incidunt similique soluta laboriosam accusamus illum perferendis sequi quisquam? Quas.
                </div>
              </div>
              <nav className="absolute top-0 bottom-0 right-0 w-6  md:hidden flex justify-center items-center choco-border-l choco-border-r bg-[#F8F9F9]" onClick={onToggle}>
                {sideComponent ? <ArrowRight className="transform rotate-180" /> : <ArrowRight />}
              </nav>
            </div>
            <div className="w-full h-full bg-red-50 pl-6 md:pl-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo debitis doloremque nemo dignissimos quis, molestias reprehenderit dolorum veritatis hic incidunt similique
              soluta laboriosam accusamus illum perferendis sequi quisquam? Quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo debitis doloremque nemo dignissimos
              quis, molestias reprehenderit dolorum veritatis hic incidunt similique soluta laboriosam accusamus illum perferendis sequi quisquam? Quas. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Accusantium explicabo debitis doloremque nemo dignissimos quis, molestias reprehenderit dolorum veritatis hic incidunt similique soluta laboriosam accusamus illum
              perferendis sequi quisquam? Quas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo debitis doloremque nemo dignissimos quis, molestias reprehenderit dolorum
              veritatis hic incidunt similique soluta laboriosam accusamus illum perferendis sequi quisquam? Quas.
            </div>
          </main>

          {/* <main className="relative w-full h-full md:mb-2 md:rounded-md bg-white md:flex dark:bg-[#3D3D3D] choco-border">
            <article
              className={cn(
                "flex relative shadow-md md:shadow-none shrink-0 transition-all z-50  md:relative w-full max-w-[300px] h-full md:choco-border-r bg-red-50 top-0 md:left-0",
                sideComponent ? "left-0" : "left-[-300px]",
              )}
            >
              <div className="w-full h-full bg-green-200 overflow-y-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ducimus ratione necessitatibus similique dolores consectetur reprehenderit commodi, in iste perferendis deleniti
                asperiores fugit est iure illo officiis eveniet officia sint.
              </div>
              <nav className="shrink-0 grow  md:hidden  w-6 choco-border-r choco-border-l  flex justify-center items-center bg-[#F8F9F9]" onClick={onToggle}>
                {sideComponent ? <ArrowRight className="transform rotate-180" /> : <ArrowRight />}
              </nav>
            </article>
            <article className="pl-[23px] grow absolute md:relative top-0 md:pl-0 w-full h-full bg-blue-100 shrink-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aperiam eveniet, obcaecati iure exercitationem aut delectus asperiores ipsam ut itaque consequuntur, ab voluptate quia.
              Dolores at minima aliquam voluptatum quaerat?
            </article>
          </main> */}
        </section>
      </section>
    </AppTemplate>
  );
}
