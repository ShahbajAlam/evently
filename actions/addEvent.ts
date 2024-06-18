"use server";

import connectDB from "@/database/connectDB";
import { Events } from "@/database/event-model";

export default async function addEvent() {
    try {
        await connectDB();
        await Events.create({
            title: "JS Event",
            date: new Date("2024-05-17"),
        });
    } catch (error) {
        console.log(error);
    }
}
