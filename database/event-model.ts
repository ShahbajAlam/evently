import { Schema, model, models } from "mongoose";

export type EventProps = {
    _id?: string;
    title: string;
    description: string;
    image: string;
    address: string;
    date: Date;
    price: number;
    addedBy: any;
};

const EventSchema = new Schema(
    {
        title: String,
        description: String,
        image: String,
        address: String,
        date: Date,
        price: Number,
        addedBy: {
            type: String,
            ref: "users",
        },
    },
    { timestamps: true }
);

const Events = models.events || model("events", EventSchema);

export { Events };
