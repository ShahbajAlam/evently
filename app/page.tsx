import Link from "next/link";
import hero from "@/public/hero.png";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="min-h-[calc(100dvh-68px)] flex flex-col justify-center items-center">
            <div className="flex justify-between items-center">
                <div className="basis-1/2 flex flex-col justify-center gap-6">
                    <h1>
                        Elevate your events with{" "}
                        <span className="bg-gradient-to-r from-[#d4a523] to-[#F37335] text-transparent bg-clip-text">
                            Evently
                        </span>
                        . From concept to execution, we specialize in creating
                        unforgettable experiences. Let's craft something
                        extraordinary together
                    </h1>
                    <Link href="/events" className="self-start">
                        <Button variant="default">Explore Events</Button>
                    </Link>
                </div>
                <div className="basis-1/2 flex justify-end">
                    <img
                        src={hero.src}
                        alt="Hero image"
                        className="w-[80%] aspect-auto"
                    />
                </div>
            </div>
        </main>
    );
}
