import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Input } from "./ui/input";
import { storage } from "@/firebase/config";
import { Progress } from "@/components/ui/progress";

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
    const [progress, setProgress] = useState(0);
    const rand = (Math.random() + Math.random()).toString();

    useEffect(() => {
        if (!image) return;

        if (image.size / 1024 > 500) {
            setError((err) => ({
                ...err,
                url: "Please upload image with size less than 500KB",
            }));
            return;
        }

        const storageRef = ref(storage, `images/${rand}-${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setProgress(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            (error) => {
                setError((err) => ({ ...err, url: error.message }));
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setUrl(downloadURL)
                );
            }
        );
    }, [image]);

    return (
        <>
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setError((err) => ({ ...err, url: "" }));
                    if (e.target.files) setImage(e.target.files[0]);
                }}
            />
            {progress > 0 && progress < 100 && (
                <Progress max={100} value={progress} />
            )}
        </>
    );
}
