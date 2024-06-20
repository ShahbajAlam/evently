"use client";

import { FormEvent, useRef, useState } from "react";
import addEvent from "@/actions/addEvent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddressSearch } from "@/components/AddressSearch";
import ImageInput from "@/components/ImageInput";
import { DateInput } from "@/components/DateInput";
import { toast } from "sonner";
import mongoose from "mongoose";

function ShowError({ error }: { error: string }) {
    return <p className="text-sm text-red-500">{error}</p>;
}

export default function AddEventForm({ _id }: { _id: string }) {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState({
        title: "",
        description: "",
        date: "",
        price: "",
        address: "",
        url: "",
    });
    const formRef = useRef<HTMLFormElement>(null);

    function reset() {
        setTitle("");
        setDescription("");
        setPrice("");
        formRef.current?.reset();
    }

    async function handleAddEvent(e: FormEvent) {
        e.preventDefault();

        if (!title) {
            setError((e) => ({ ...e, title: "This field is required" }));
            return;
        }
        if (!description) {
            setError((e) => ({ ...e, description: "This field is required" }));
            return;
        }
        if (!url) {
            setError((e) => ({ ...e, url: "This field is required" }));
            return;
        }
        if (!date) {
            setError((e) => ({ ...e, date: "This field is required" }));
            return;
        }
        if (!price) {
            setError((e) => ({ ...e, price: "This field is required" }));
            return;
        }
        if (price && Number(price) < 0) {
            setError((e) => ({ ...e, price: "Price can not be negative" }));
            return;
        }
        if (!address) {
            setError((e) => ({ ...e, address: "This field is required" }));
            return;
        }

        try {
            setLoading(true);
            await addEvent({
                title,
                address,
                date: new Date(date),
                description,
                image: url,
                price: Number(price),
                addedBy: mongoose.Types.ObjectId.createFromHexString(_id),
            });
            reset();
            toast("Event has been added");
            setFormSubmitted(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <h2 className="text-center uppercase">Add your event</h2>

            <form
                ref={formRef}
                onSubmit={handleAddEvent}
                className="w-[75%] flex flex-col gap-3 bg-zinc-500 dark:bg-zinc-700 p-6 rounded-2xl"
            >
                <Input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                        setError((err) => ({ ...err, title: "" }));
                        setTitle(e.target.value);
                    }}
                />
                {error.title && <ShowError error={error.title} />}

                <Textarea
                    placeholder="Description"
                    rows={5}
                    value={description}
                    onChange={(e) => {
                        setError((err) => ({ ...err, description: "" }));
                        setDescription(e.target.value);
                    }}
                />
                {error.description && <ShowError error={error.description} />}

                <ImageInput
                    setUrl={setUrl}
                    setError={setError}
                    formSubmitted={formSubmitted}
                />
                {error.url && <ShowError error={error.url} />}

                <AddressSearch
                    setAddress={setAddress}
                    setError={setError}
                    formSubmitted={formSubmitted}
                />
                {error.address && <ShowError error={error.address} />}

                <div className="flex gap-6">
                    <div className="basis-1/2">
                        <Input
                            type="number"
                            value={price}
                            min={0}
                            placeholder="Ticket price"
                            onChange={(e) => {
                                setError((err) => ({ ...err, price: "" }));
                                setPrice(e.target.value);
                            }}
                        />
                        {error.price && <ShowError error={error.price} />}
                    </div>

                    <div className="basis-1/2">
                        <DateInput
                            setDate={setDate}
                            setError={setError}
                            formSubmitted={formSubmitted}
                        />
                        {error.date && <ShowError error={error.date} />}
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={loading}
                    className="self-end disabled:brightness-75"
                >
                    {loading ? "ADDING..." : "ADD EVENT"}
                </Button>
            </form>
        </div>
    );
}
