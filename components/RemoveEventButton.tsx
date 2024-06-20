"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import deleteEventById from "@/actions/deleteEventById";
import { useRouter } from "next/navigation";

export default function RemoveEventButton({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const deleteEvent = async () => {
        try {
            setLoading(true);
            await deleteEventById(id);
            router.replace("/my-events");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="default"
            className="uppercase disabled:brightness-50"
            onClick={deleteEvent}
            disabled={loading}
        >
            {loading ? "Removing..." : "Remove the event"}
        </Button>
    );
}
