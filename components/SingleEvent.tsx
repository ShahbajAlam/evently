import { EventProps } from "@/database/event-model";

export default function SingleEvent(props: EventProps) {
    return (
        <li className="flex flex-col gap-1 justify-between">
            <img
                src={props.image}
                alt={props.title}
                className="w-full aspect-video object-cover rounded-lg"
            />

            <h3 className="line-clamp-2">{props.title}</h3>
            <p className="line-clamp-3 text-sm">{props.description}</p>
        </li>
    );
}
