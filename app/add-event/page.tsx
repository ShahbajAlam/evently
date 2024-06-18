import addEvent from "@/actions/addEvent";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
    return (
        <form action={addEvent}>
            <Button type="submit">ADD EVENT</Button>
        </form>
    );
}
