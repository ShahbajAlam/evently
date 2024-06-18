import Link from "next/link";
import { ToggleThemeButton } from "./ToggleThemeButton";

export default async function Navbar() {
    return (
        <nav className="p-4 flex justify-between items-center sticky top-0">
            <Link href="/">
                <h1 className="text-3xl font-bold">Logo</h1>
            </Link>
            <ToggleThemeButton />
        </nav>
    );
}
