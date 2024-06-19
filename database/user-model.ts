import { Schema, model, models } from "mongoose";

export type UserProps = {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
};

const UserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
    },
    { timestamps: true }
);

const Users = models.users || model("users", UserSchema);

export { Users };
