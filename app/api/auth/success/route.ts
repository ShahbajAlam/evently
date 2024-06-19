import connectDB from "@/database/connectDB";
import { Users } from "@/database/user-model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const redirectURL = process.env.KINDE_SITE_URL as string;

    if (!user) return NextResponse.redirect(redirectURL);

    try {
        await connectDB();
        const userID = await Users.findOne({ email: user?.email }).select(
            "_id"
        );

        if (!userID) {
            await Users.create({
                firstName: user?.given_name,
                lastName: user?.family_name,
                email: user?.email,
            });
        }
        return NextResponse.redirect(redirectURL);
    } catch (error) {
        return NextResponse.json({ message: "Error in adding user" });
    }
}
