import { Input } from "./ui/input";
import useOnclickOutside from "react-cool-onclickoutside";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

type AddressSearchProps = {
    setAddress: Dispatch<SetStateAction<string>>;
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
};

export const AddressSearch = ({ setAddress, setError }: AddressSearchProps) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    const ref = useOnclickOutside(() => clearSuggestions());

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError((err) => ({ ...err, address: "" }));
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }: { description: any }) =>
        () => {
            setValue(description, false);
            setAddress(description);
            clearSuggestions();
        };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li
                    key={place_id}
                    className="my-2 cursor-pointer"
                    onClick={handleSelect(suggestion)}
                >
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    return (
        <div ref={ref}>
            <Input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Event location"
            />

            {status === "OK" && (
                <ul className="px-2 py-4">{renderSuggestions()}</ul>
            )}
        </div>
    );
};
