import { useAppDispatch, useAppSelector } from "src/store";

// components
import Snack from "src/components/common/snack";

import AppTemplate from "src/components/layout/templates/AppTemplate";
import AppFooter from "src/components/layout/footers/AppFooter";
import InfinitySpin from "src/components/common/load/InfinitySpin";
import { useEffect, useState } from "react";

import client from "src/libs/axios";
import { IconButton } from "@mui/material";
import { MoreHoriz, MoreVert } from "@mui/icons-material";

export default function HomePage() {
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
            {data.map((v, i) => (
              <article className="w-full bg-white dark:bg-[#3D3D3D] rounded-lg shadow-md" key={i}>
                <header className="p-3">
                  <div className="w-full h-full flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full choco-border"></div>
                      <div className="ml-3 text-md font-semibold">
                        <p>아이디</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <span className="text-choco-bronze-300">
                          <IconButton>
                            <MoreHoriz />
                          </IconButton>
                        </span>
                      </div>
                    </div>
                  </div>
                </header>
                <main>
                  <div className="w-full"></div>
                </main>
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
