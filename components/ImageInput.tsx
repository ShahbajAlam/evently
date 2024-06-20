import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase/config";
import { TrashIcon } from "lucide-react";

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
    const [loaded, setLoaded] = useState(false);
    const rand = (Math.random() + Math.random()).toString();
    const [imageRef, setImageRef] = useState("");

    useEffect(() => {
        if (!image) return;

        if (image.size / 1024 > 150) {
            setError((err) => ({
                ...err,
                url: "Please upload image with size less than 150KB",
            }));
            return;
        }

        const storageRef = ref(storage, `images/${rand}-${image.name}`);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            () => {},
            (error) => {
                setError((err) => ({ ...err, url: error.message }));
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                    setLoaded(true);
                    setImageRef(`images/${rand}-${image.name}`);
                });
            }
        );
    }, [image]);

    const deleteImage = () => {
        const desertRef = ref(storage, imageRef);

        deleteObject(desertRef)
            .then(() => {
                setLoaded(false);
                setImage(undefined);
                setUrl("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex items-center">
            <Input
                className={`basis-[${
                    image ? "95" : "100"
                }%] disabled:cursor-not-allowed`}
                type="file"
                accept="image/*"
                onChange={(e) => {
                    setError((err) => ({ ...err, url: "" }));
                    if (e.target.files) setImage(e.target.files[0]);
                }}
                disabled={loaded}
                title={loaded ? "Delete the existing image to upload new" : ""}
            />
            {loaded && (
                <TrashIcon
                    className="basis-[5%] cursor-pointer"
                    role="button"
                    onClick={deleteImage}
                />
            )}
        </div>
    );
}
