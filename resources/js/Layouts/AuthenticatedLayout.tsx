import Bars3Icon from '@/Components/icons/Bars3Icon';
import { motion } from 'motion/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import AuthenticatedHeader from './AuthenticatedHeader';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Apply dark mode class to the root HTML element
    useEffect(() => {
        const root = window.document.documentElement;
        const storedPreference = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(storedPreference);

        if (storedPreference) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const root = window.document.documentElement;
        const newPreference = !isDarkMode;
        setIsDarkMode(newPreference);

        if (newPreference) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('darkMode', String(newPreference));
    };

    return (
        <div className="h-screen w-full bg-blue-50 transition-colors duration-500 dark:bg-gray-900">
            <div className="flex h-full w-full">
                {/* Sidebar */}
                <motion.aside
                    initial={{ width: 250 }}
                    animate={{
                        width: isOpenSidebar ? 250 : 0,
                    }}
                    className="h-full overflow-hidden bg-blue-900 text-white shadow-lg transition-colors duration-500 dark:bg-gray-800 dark:text-gray-300"
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

                {/* Main Content */}
                <div className="flex h-full flex-1 flex-col">
                    {/* Header */}
                    <AuthenticatedHeader
                        isDarkMode={isDarkMode}
                        toggleDarkMode={toggleDarkMode}
                        isOpenSidebar={isOpenSidebar}
                        setIsOpenSidebar={setIsOpenSidebar}
                    />

                    {/* Scrollable Main Content */}
                    <main className="flex-1 overflow-y-auto bg-blue-100 px-5 py-6 transition-colors duration-500 dark:bg-gray-800">
                        
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
