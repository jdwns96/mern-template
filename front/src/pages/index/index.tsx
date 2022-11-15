import { useAppDispatch, useAppSelector } from "src/store";

// components
import Snack from "src/components/common/snack";

import AppTemplate from "src/components/layout/templates/AppTemplate";
import AppFooter from "src/components/layout/footers/AppFooter";
import InfinitySpin from "src/components/common/load/InfinitySpin";
import { useEffect, useState } from "react";

import client from "src/libs/axios";

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
            <div>
              <button
                className="snack-btn"
                onClick={async () => {
                  const res = await client.get("/test");
                  console.log(res);
                }}
              >
                text btn
              </button>
            </div>
            {data.map((v, i) => (
              <Snack key={i} />
            ))}
          </main>
          <InfinitySpin />
          <AppFooter />
        </section>
      </section>
    </AppTemplate>
  );
}
