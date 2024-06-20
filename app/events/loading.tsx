import { SkeletonLoader } from "@/components/SkeletonLoader";

const arr = Array.from({ length: 9 }, (_, i) => i + 1);

export default function Loading() {
    return (
        <div className="w-full grid grid-cols-3 gap-4">
            {arr.map(() => (
                <SkeletonLoader />
            ))}
        </div>
    );
}
