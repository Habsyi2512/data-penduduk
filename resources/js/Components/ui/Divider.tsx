export default function Divider({ isOpen=true }: { isOpen?: boolean }) {
    return isOpen && <hr className="border-blue-200 dark:border-gray-800" />;
}
