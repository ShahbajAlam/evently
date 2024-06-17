import { ToggleThemeButton } from "./ToggleThemeButton";

export default async function Navbar() {
    return (
        <nav className="p-4 flex justify-between items-center sticky top-0">
            <h1 className="text-3xl font-bold">Logo</h1>
            <ToggleThemeButton />
        </nav>
    );
}
