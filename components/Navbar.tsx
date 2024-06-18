import Link from "next/link";
import { Suspense } from "react";
import { ToggleThemeButton } from "./ToggleThemeButton";
import {
    LogoutLink,
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

async function UserButton() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (await isAuthenticated()) {
        const user = await getUser();

        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <img
                        src={user?.picture as string}
                        alt={`${user?.given_name}'s profile picture`}
                        className="w-10 aspect-square rounded-full"
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                >
                    <Link href="/add-event">
                        <DropdownMenuItem className="cursor-pointer">
                            Add Event
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer">
                        My Events
                    </DropdownMenuItem>
                    <LogoutLink className="text-red-400">
                        <DropdownMenuItem className="cursor-pointer">
                            Log Out
                        </DropdownMenuItem>
                    </LogoutLink>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}

export default async function Navbar() {
    return (
        <nav className="py-2 flex justify-between items-center sticky top-0">
            <Link href="/">
                <h1>
                    <span className="bg-gradient-to-r from-[#d4a523] to-[#F37335] text-transparent bg-clip-text">
                        Evently
                    </span>
                </h1>
            </Link>
            <div className="flex gap-4">
                <ToggleThemeButton />
                <Suspense fallback={null}>
                    <UserButton />
                </Suspense>
            </div>
        </nav>
    );
}
