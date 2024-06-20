import ShowEvents from "@/components/ShowEvents";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import fetchUserID from "@/actions/fetchUserID";
import fetchMyEventsCount from "@/actions/fetchMyEventsCount";
import fetchMyEvents from "@/actions/fetchMyEvents";

export default async function page({
    searchParams,
}: {
    searchParams?: {
        page?: number;
    };
}) {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) redirect("/api/auth/login");

    const user = await getUser();
    const _id = await fetchUserID(user?.email as string);

    const eventCount = await fetchMyEventsCount(_id as string);
    if (!eventCount) return <h1>No events</h1>;

    const page = Number(searchParams?.page) || 1;
    const events = (await fetchMyEvents(page, _id as string)) as string;

    return (
        <main className="min-h-[calc(100dvh-68px)] flex flex-col justify-start items-center">
            <ShowEvents events={events} eventCount={eventCount as number} />
        </main>
    );
}
