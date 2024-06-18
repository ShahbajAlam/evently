"use server";

import connectDB from "@/database/connectDB";
import { Events } from "@/database/event-model";

export default async function fetchEvents(page: number = 1) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const dateString = `${year}-${month}-${date}`;

    try {
        await connectDB();
        const events = await Events.find({ date: { $gt: dateString } })
            .skip(page - 1)
            .limit(10);
        return JSON.stringify(events);
    } catch (error) {
        if (error instanceof Error)
            return {
                error: error.message,
            };
    }
}
