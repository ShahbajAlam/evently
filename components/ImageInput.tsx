import { Input } from "./ui/input";
import { Progress } from "@/components/ui/progress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function ImageInput({
    setUrl,
    setError,
}: {
    setUrl: Dispatch<SetStateAction<string>>;
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
    const [image, setImage] = useState<File>();

    useEffect(() => {
        if (!image) return;

        if (image.size / 1024 > 500) {
            setError((err) => ({
                ...err,
                url: "Please upload image with size less than 500KB",
            }));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setUrl(e.target?.result as string);
        };
    }, [image]);

    return (
        <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
                setError((err) => ({ ...err, url: "" }));
                if (e.target.files) setImage(e.target.files[0]);
            }}
        />
    );
}
