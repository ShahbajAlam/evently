"use server";

import connectDB from "@/database/connectDB";
import { Users } from "@/database/user-model";

export default async function fetchUserID(email: string) {
    try {
        await connectDB();
        const _id = await Users.findOne({ email }).select("_id");
        return JSON.stringify(_id._id).slice(1, -1);
    } catch (error) {
        console.log(error);
    }
}
