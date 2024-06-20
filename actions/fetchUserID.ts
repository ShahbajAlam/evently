"use server";

import connectDB from "@/database/connectDB";
import { Users } from "@/database/user-model";

export default async function fetchUserID(email: string) {
    try {
        await connectDB();
        const _id = await Users.findOne({ email }).select("_id");
        return _id;
    } catch (error) {
        console.log(error);
    }
}
