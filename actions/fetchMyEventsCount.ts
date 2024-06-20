"use server";

import connectDB from "@/database/connectDB";
import { Events } from "@/database/event-model";

export default async function fetchMyEventsCount(_id: string) {
    try {
        await connectDB();
        const eventCount = (await Events.countDocuments({
            addedBy: _id,
            date: { $gt: new Date() },
        })) as number;
        return eventCount;
    } catch (error) {
        console.log(error);
    }
}
