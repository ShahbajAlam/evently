import ShowEvents from "@/components/ShowEvents";
import fetchEventCount from "@/actions/fetchEventCount";

export default async function page() {
    const eventCount = await fetchEventCount();
    if (!eventCount) return <h1>No upcoming events</h1>;

    return (
        <main className="min-h-[calc(100dvh-68px)] flex flex-col justify-start items-center">
            <ShowEvents eventCount={eventCount as number} />
        </main>
    );
}
