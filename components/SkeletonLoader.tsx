import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoader() {
    return (
        <div className="w-full flex flex-col space-y-3">
            <Skeleton className="h-[150px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    );
}
