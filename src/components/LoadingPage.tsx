import { Skeleton } from "../shadcdn/skeleton";

const LoadingPage = () => {
  return (
    <div className="mx-5 ">
      <div className="flex">
        <Skeleton className="h-52 w-40 rounded-md m-4" />
        <div className="space-y-2 m-4">
          <Skeleton className="h-4 m-2 w-[10rem]" />
          <Skeleton className="h-4 m-2 w-[8rem]" />
        </div>
      </div>
      <div className="p-2 text-left">
        <Skeleton className="w-[40%] my-4 h-3 rounded-none" />
        <Skeleton className="w-[10%] my-4 h-3 rounded-none" />
        <Skeleton className="w-[30%] my-4 h-3 rounded-none" />
        <Skeleton className="w-[90%] my-4 h-3 rounded-none" />
      </div>
      <div className="p-2 text-left">
        <Skeleton className="w-[40%] my-4 h-3 rounded-none" />
        <Skeleton className="w-[90%] my-4 h-3 rounded-none" />
        <Skeleton className="w-[10%] my-4 h-3 rounded-none" />
        <Skeleton className="w-[30%] my-4 h-3 rounded-none" />
      </div>
    </div>
  );
};

export default LoadingPage;
