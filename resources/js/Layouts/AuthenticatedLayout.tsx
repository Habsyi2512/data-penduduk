import Sidebar from '@/Components/sidebar/Sidebar';
import { LoadingContextProvider, useLoadingContext } from '@/context/LoadingContext';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Mosaic } from 'react-loading-indicators';
import AuthenticatedHeader from './AuthenticatedHeader';

export default function Authenticated({ children }: PropsWithChildren<{}>) {
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { loading } = useLoadingContext(); // this is correct as it's inside LoadingContextProvider
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
        <LoadingContextProvider>
            {loading && (
                <div className="fixed left-0 right-0 top-0 z-50 flex h-full items-center justify-center bg-white/20 backdrop-blur-sm">
                    <Mosaic color={'#3b82f6'} />
                </div>
            )}
            <div className="h-screen w-full transition-colors duration-500 dark:bg-gray-900">
                <Toaster position="top-center" />
                <div className="flex h-full w-full">
                    <Sidebar setIsOpenSidebar={setIsOpenSidebar} isOpenSidebar={isOpenSidebar} />
                    <div className="flex h-full flex-1 flex-col">
                        <AuthenticatedHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
                        <main className="flex-1 overflow-y-auto bg-blue-100 px-5 py-6 transition-colors duration-500 dark:bg-gray-800">{children}</main>
                    </div>
                </div>
            </div>
        </LoadingContextProvider>
    );
}
