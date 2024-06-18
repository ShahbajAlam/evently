import { Button } from "@/components/ui/button";
import {
    LoginLink,
    RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
    return (
        <main className="min-h-[calc(100dvh-84px)] flex flex-col justify-center items-center">
            <h1>Welcome to NextJS + shadcn ui starter template</h1>
            <h2>Configured with Kinde and MongoDB</h2>
            <div className="flex justify-center items-center gap-6">
                <Button>
                    <RegisterLink>Register</RegisterLink>
                </Button>
                <Button>
                    <LoginLink>Login</LoginLink>
                </Button>
            </div>
        </main>
    );
}
