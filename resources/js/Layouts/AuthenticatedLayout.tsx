import Sidebar from '@/Components/sidebar/Sidebar';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AuthenticatedHeader from './AuthenticatedHeader';

export default function Authenticated({ children }: PropsWithChildren<{}>) {
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { flash } = usePage<PageProps>().props;

    // useEffect(() => {
    //     if (flash.success) {
    //         toast.success(flash.success);
    //     }
    // }, [flash.success]);

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
    );
}
