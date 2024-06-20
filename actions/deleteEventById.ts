"use server";

import connectDB from "@/database/connectDB";
import { Events } from "@/database/event-model";

export default async function deleteEventById(id: string) {
    try {
        await connectDB();
        await Events.findByIdAndDelete(id);
    } catch (error) {
        if (error instanceof Error)
            return {
                error: error.message,
            };
    }
}
