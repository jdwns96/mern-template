import { useAppDispatch, useAppSelector } from "src/store";

import AppTemplate from "src/components/layout/templates/AppTemplate";
import AppFooter from "src/components/layout/footers/AppFooter";
import InfinitySpin from "src/components/common/load/InfinitySpin";
import { useEffect, useState } from "react";

import client from "src/libs/axios";
import { IconButton } from "@mui/material";
import { ChatBubbleOutline, MoreHoriz, MoreVert, ThumbUpOffAlt } from "@mui/icons-material";

import Carousel from "src/components/common/carousel";
import MoreContent from "src/components/common/more";

import img from "src/assets/images/image-test.jpg";

import { PostSkeleton } from "src/components/common/skeleton";

import withAccess from "src/hoc/withAccess";

function HomePage() {
  const { id, user_id, name } = useAppSelector((store) => store.auth);

  // infinity scroll
  const [page, setPage] = useState(1); // page number
  const [isFetch, setIsFetch] = useState(false); // fetch status

  const [data, setData] = useState<any[]>([]);

  const fetchDatas = () => {
    setData((prev) => {
      return [...prev, ...new Array(10).fill(0)];
    });
    setIsFetch(false);
    setPage((p) => p + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setIsFetch(true);
        console.log("스크롤링?");
      }
    };
    setIsFetch(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetch /*&& hasNextPage */) fetchDatas();
    // else if (!hasNextPage) setFetching(false)
  }, [isFetch]);

  return (
    <AppTemplate>
      <section className="w-full h-full">
        <section className="w-full h-full max-w-xl mx-auto px-3">
          <main className="pt-8">
            {/* <div>
              <button
                className="snack-btn"
                onClick={async () => {
                  const res = await client.get("/test");
                  console.log(res);
                }}
              >
                text btn
              </button>
            </div> */}
            {/* {new Array(10).fill(0).map((_, i) => (
              <PostSkeleton />
            ))} */}
            {data.map((v, i) => (
              <article className="w-full bg-white dark:bg-[#3D3D3D] rounded-lg shadow-md mb-6" key={i}>
                <header className="p-3">
                  <div className="w-full h-full flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-9 h-9 rounded-full choco-border"></div>
                      <div className="ml-3 text-md font-semibold">
                        <p>아이디</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className="text-choco-bronze-300 dark:text-choco-text-dark">
                          <IconButton style={{ color: "inherit" }}>
                            <MoreHoriz />
                          </IconButton>
                        </span>
                      </div>
                    </div>
                  </div>
                </header>
                <main>
                  <Carousel images={[img, img]} />
                  <div>
                    <ul className="flex p-1 px-2">
                      <li className="p-2">
                        <span className="cursor-pointer">
                          <ThumbUpOffAlt style={{ width: 28, height: 28 }} />
                        </span>
                      </li>
                      <li className="p-2">
                        <span className="cursor-pointer">
                          <ChatBubbleOutline style={{ width: 26, height: 26 }} />
                        </span>
                      </li>
                    </ul>
                  </div>
                  {/* content area */}
                  <div className="p-2 px-4">
                    <MoreContent
                      text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, deserunt harum! Quia doloremque molestiae aliquid laborum, ut eos, ratione culpa ullam quasi deleniti quod!
                      Ipsam, illo placeat. Iste, exercitationem doloremque.`}
                    />
                    {/* comment area */}
                    <ul>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </main>
                <footer className="px-4 py-2">
                  <span className="text-xs font-semibold">2일전</span>
                </footer>
              </article>
            ))}
          </main>
          <InfinitySpin />
          <AppFooter />
        </section>
      </section>
    </AppTemplate>
  );
}

export default withAccess(HomePage);
