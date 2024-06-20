"use server";

import connectDB from "@/database/connectDB";
import { Events } from "@/database/event-model";

export default async function fetchEventById(id: string) {
    try {
        await connectDB();
        const event = await Events.findById(id);
        return JSON.stringify(event);
    } catch (error) {
        if (error instanceof Error)
            return {
                error: error.message,
            };
    }
}
