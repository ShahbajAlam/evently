"use client";

import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DateInput({
    setDate,
    setError,
}: {
    setDate: Dispatch<SetStateAction<string>>;
    setError: Dispatch<
        SetStateAction<{
            title: string;
            description: string;
            date: string;
            price: string;
            address: string;
            url: string;
        }>
    >;
}) {
    const [date, setdate] = React.useState<Date>();

    React.useEffect(() => {
        if (!date) return;

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        setDate(`${year}-${month + 1}-${day}`);
    }, [date]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal border-slate-500",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(e) => {
                        setError((err) => ({ ...err, date: "" }));
                        setdate(e);
                    }}
                    initialFocus
                    className="w-full"
                    disabled={{
                        before: new Date(),
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
