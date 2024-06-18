import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "evently",
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log(error);
    }
}
