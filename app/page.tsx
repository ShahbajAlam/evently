import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl">Welcome to NextJS starter template</h1>
            <h2>Configured with Kinde and MongoDB</h2>
            <Button variant="destructive">
                <RegisterLink>Get Started</RegisterLink>
            </Button>
        </main>
    );
}
