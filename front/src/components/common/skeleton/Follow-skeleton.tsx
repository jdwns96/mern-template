import Skeleton from "@mui/material/Skeleton";

export default function FollowSkeleton() {
  return (
    <div className="flex w-full justify-between border-b border-solid border-gray-300  p-3 md:px-5 dark:border-choco-gray-300">
      <div className="flex w-full">
        <div>
          <div className="rounded-full w-16 h-16 bg-gray-300"></div>
        </div>
        <div className="ml-6 grow flex-col justify-center items-center">
          <p>
            <Skeleton animation="wave" height={10} width="40%" style={{ marginBottom: 6 }} />
          </p>
          <p>
            <Skeleton animation="wave" height={10} width="80%" />
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Skeleton animation="wave" height={10} width="200" />
      </div>
    </div>
  );
}
