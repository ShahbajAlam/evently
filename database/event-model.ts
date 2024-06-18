import { Schema, model, models } from "mongoose";

export type EventProps = {
    _id?: string;
    title: string;
    description: string;
    image: string;
    city: string;
    country: string;
    date: Date;
    cost: number;
};

const EventSchema = new Schema(
    {
        title: String,
        description: String,
        image: String,
        city: String,
        country: String,
        date: Date,
        cost: Number,
    },
    { timestamps: true }
);

const Events = models.events || model("events", EventSchema);

export { Events };
