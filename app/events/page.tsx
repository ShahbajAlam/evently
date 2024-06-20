import ShowEvents from "@/components/ShowEvents";
import fetchEventCount from "@/actions/fetchEventCount";
import fetchEvents from "@/actions/fetchEvents";

export default async function page({
    searchParams,
}: {
    searchParams?: {
        page?: number;
    };
}) {
    const eventCount = await fetchEventCount();
    if (!eventCount)
        return <h1 className="text-center uppercase">No upcoming events</h1>;

    const page = Number(searchParams?.page) || 1;
    const events = (await fetchEvents(page)) as string;

    return (
        <main className="min-h-[calc(100dvh-68px)] flex flex-col justify-start items-center">
            <ShowEvents
                isMine={false}
                events={events}
                eventCount={eventCount as number}
            />
        </main>
    );
}
