import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(){
    return (
    <div className="flex flex-col gap-4 p-3">
        <div className="flex gap-4 items-center">
            <Skeleton className="rounded-xl h-[1.8rem] bg-gray-200 w-[1.8rem]"/>
            <Skeleton className="rounded-xl h-[1.5rem] bg-gray-200 w-[8rem]"/>
        </div>
            <Skeleton className="rounded-xl h-[1.5rem] bg-gray-200 w-[10rem]"/>
        <div className="grid grid-row-5 gap-3"  >
        <Skeleton className="p-2 h-[1.5rem] bg-gray-200 "></Skeleton>
        <Skeleton className="p-2 h-[1.5rem] bg-gray-200 "></Skeleton>
        <Skeleton className="p-2 h-[1.5rem] bg-gray-200 "></Skeleton>
        <Skeleton className="p-2 w-[50rem] bg-gray-200 h-[1.5rem]"></Skeleton>
    </div>
    </div>
    
    )
}