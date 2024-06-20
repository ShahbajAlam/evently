import { LoaderCircle } from "lucide-react";

export default function loading() {
    return (
        <div className="fixed inset-0 flex justify-center items-center z-10">
            <LoaderCircle className="animate-spin" size={70} color="cyan" />
        </div>
    );
}
