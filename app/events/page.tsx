import fetchEventCount from "@/actions/fetchEventCount";
import ShowEvents from "@/components/ShowEvents";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Suspense } from "react";

async function Events() {
    const eventCount = await fetchEventCount();
    if (!eventCount) return <h1>No upcoming events</h1>;
    return <ShowEvents eventCount={eventCount as number} />;
}

const arr = Array.from({ length: 9 }, (_, i) => i + 1);

function Fallback() {
    return (
        <div className="w-full grid grid-cols-3 gap-4">
            {arr.map(() => (
                <SkeletonLoader />
            ))}
        </div>
    );
}

export default function page() {
    return (
        <main className="min-h-[calc(100dvh-68px)] flex flex-col justify-start items-center">
            <Suspense fallback={<Fallback />}>
                <Events />
            </Suspense>
        </main>
    );
}
