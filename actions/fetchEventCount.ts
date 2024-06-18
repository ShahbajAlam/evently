"use server";

import connectDB from "@/database/connectDB";
import { Events } from "@/database/event-model";

export default async function fetchEventCount() {
    try {
        await connectDB();
        const eventCount = (await Events.countDocuments({})) as number;
        return eventCount;
    } catch (error) {
        console.log(error);
    }
}
