"use server";

import connectDB from "@/database/connectDB";
import { Events } from "@/database/event-model";

export default async function fetchEvents(page: number = 1) {
    try {
        await connectDB();
        const events = await Events.find({
            date: { $gt: new Date() },
        })
            .sort({ date: -1 })
            .skip((page - 1) * 10)
            .limit(10);
        return JSON.stringify(events);
    } catch (error) {
        if (error instanceof Error)
            return {
                error: error.message,
            };
    }
}
