import { redirect } from "next/navigation";
import fetchUserID from "@/actions/fetchUserID";
import AddEventForm from "@/components/AddEventForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function page() {
    const { isAuthenticated, getUser } = getKindeServerSession();

    if (!(await isAuthenticated())) redirect("/api/auth/login");

    const user = await getUser();
    const _id = await fetchUserID(user?.email as string);

    return <AddEventForm _id={JSON.stringify(_id)} />;
}
