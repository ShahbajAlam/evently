"use server";

import connectDB from "@/database/connectDB";
import { Events, EventProps } from "@/database/event-model";
import { revalidatePath } from "next/cache";

export default async function addEvent(data: EventProps) {
    try {
        await connectDB();
        await Events.create({ ...data });
        revalidatePath("/", "page");
    } catch (error) {
        console.log(error);
    }
}
