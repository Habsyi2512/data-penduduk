import { motion } from 'motion/react';
import { SetStateAction } from 'react';
import Bars3Icon from '../icons/Bars3Icon';

export default function Sidebar({
    isOpenSidebar,
    setIsOpenSidebar,
}: {
    isOpenSidebar: boolean;
    setIsOpenSidebar: React.Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <motion.aside
            initial={{ width: 250 }}
            animate={{
                width: isOpenSidebar ? 250 : 0,
            }}
            className="h-full overflow-hidden border-r border-gray-200 bg-blue-900 text-white shadow-lg transition-colors duration-500 dark:border-gray-500/50 dark:bg-gray-800 dark:text-gray-300"
        >
            <nav className="flex items-center justify-between px-4 py-4">
                <button
                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => setIsOpenSidebar((prev) => !prev)}
                >
                    <Bars3Icon className="h-6 w-6 text-gray-300" />
                </button>
            </nav>
            <ul className="space-y-2 p-3 py-6 text-sm">
                <li className="rounded px-3 py-2 hover:bg-blue-800 dark:hover:bg-gray-700">
                    Dashboard
                </li>
                <li className="rounded px-3 py-2 hover:bg-blue-800 dark:hover:bg-gray-700">
                    Data Penduduk
                </li>
                <li className="rounded px-3 py-2 hover:bg-blue-800 dark:hover:bg-gray-700">
                    Laporan
                </li>
            </ul>
        </motion.aside>
    );
}
