export default function page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    );
}
