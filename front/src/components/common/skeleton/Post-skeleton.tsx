import Skeleton from "@mui/material/Skeleton";

export default function PostSkeleton() {
  return (
    <article className="w-full bg-white dark:bg-[#3D3D3D] rounded-lg shadow-md mb-6">
      <header className="p-3">
        <div className="w-full h-full flex justify-between items-center">
          <div className="flex items-center w-full">
            <Skeleton animation="wave" variant="circular" width={36} height={36} />
            <div className="ml-3 text-md font-semibold grow">
              <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="40%" />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="flex-none relative w-full h-full pb-[100%] overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 right-0 ">
            <Skeleton sx={{ height: "100%" }} animation="wave" variant="rectangular" />
          </div>
        </div>
        <div>
          <ul className="flex p-1 px-2">
            <li className="p-2">
              <span className="cursor-pointer">
                <Skeleton animation="wave" variant="circular" width={28} height={28} />
              </span>
            </li>
            <li className="p-2">
              <span className="cursor-pointer">
                <Skeleton animation="wave" variant="circular" width={28} height={28} />
              </span>
            </li>
          </ul>
          <div className="p-2 px-4">
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="40%" />
          </div>
        </div>
      </main>
      <footer className="px-4 py-2">
        <Skeleton animation="wave" height={10} width="10%" />
      </footer>
    </article>
  );
}
