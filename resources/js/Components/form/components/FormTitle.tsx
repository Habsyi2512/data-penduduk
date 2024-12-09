export default function FormTitle({
    title = '',
    index = 0,
    showIndex = true,
}: {
    title: string;
    index: number;
    showIndex?: boolean;
}) {
    return (
        <h2 className="font-inter text-xl font-bold text-blue-600 dark:text-gray-400">
            {title} {showIndex && index + 1}
        </h2>
    );
}
