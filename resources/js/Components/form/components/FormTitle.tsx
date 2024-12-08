export default function FormTitle( {title='', index=0}:{title:string, index:number} ) {
    return (
        <h2 className="font-inter text-xl font-bold text-blue-600 dark:text-gray-400">
            {title} {index + 1}
        </h2>
    );
}
