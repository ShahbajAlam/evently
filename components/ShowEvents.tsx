"use client";

import Link from "next/link";
import SingleEvent from "./SingleEvent";
import { PaginationButton } from "./Pagination";
import { EventProps } from "@/database/event-model";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShowEvents({
    eventCount,
    events,
    isMine,
}: {
    eventCount: number;
    events: string;
    isMine: boolean;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const FIRST_PAGE = 1;
    const LAST_PAGE = Math.ceil(eventCount / 10);

    const prevPageHandler = () => {
        if (Number(page) === FIRST_PAGE) return;
        else {
            if (isMine) router.push(`/my-events?page=${page - 1}`);
            else router.push(`/events?page=${page - 1}`);
        }
        if (typeof window != "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const nextPageHandler = () => {
        if (Number(page) === LAST_PAGE) return;
        else {
            if (isMine) router.push(`/my-events?page=${page + 1}`);
            else router.push(`/events?page=${page + 1}`);
        }
        if (typeof window != "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full flex flex-col gap-5 py-4">
            <ul className="grid grid-cols-3 gap-4">
                {JSON.parse(events).map((event: EventProps) => (
                    <Link
                        key={event._id}
                        href={`${isMine ? "my-events" : "events"}/${event._id}`}
                        className="rounded-xl p-4 border shadow-lg"
                    >
                        <SingleEvent {...event} />
                    </Link>
                ))}
            </ul>

            {eventCount > 10 && (
                <PaginationButton
                    page={Number(page)}
                    FIRST_PAGE={FIRST_PAGE}
                    LAST_PAGE={LAST_PAGE}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                />
            )}
        </div>
    );
}
