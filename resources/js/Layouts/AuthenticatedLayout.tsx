import Sidebar from '@/Components/sidebar/Sidebar';
import { PropsWithChildren, useEffect, useState } from 'react';
import AuthenticatedHeader from './AuthenticatedHeader';

export default function Authenticated({
    children,
}: PropsWithChildren<{  }>) {
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
                <Sidebar
                    setIsOpenSidebar={setIsOpenSidebar}
                    isOpenSidebar={isOpenSidebar}
                />

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
