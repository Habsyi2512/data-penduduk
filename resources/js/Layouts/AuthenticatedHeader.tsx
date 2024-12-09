import Bars3Icon from '@/Components/icons/Bars3Icon';
import MoonIcon from '@/Components/icons/MoonIcon';
import SunIcon from '@/Components/icons/SunIcon';
import { Link, useForm, usePage } from '@inertiajs/react';
import { motion } from 'motion/react';
import { FormEventHandler, SetStateAction } from 'react';

export default function AuthenticatedHeader({
    setIsOpenSidebar,
    isOpenSidebar,
    toggleDarkMode,
    isDarkMode,
}: {
    setIsOpenSidebar: React.Dispatch<SetStateAction<boolean>>;
    isOpenSidebar: boolean;
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}) {
    const { post, processing } = useForm({});
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };
    const user = usePage().props.auth.user;
    return (
        <>
            <header className="sticky left-0 top-0 flex items-center justify-between bg-blue-100/30 px-6 py-4 shadow-md backdrop-blur-lg transition-colors duration-500 dark:bg-gray-800/30">
                <div className="flex items-center gap-x-5">
                    {!isOpenSidebar && (
                        <button
                            className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            onClick={() => setIsOpenSidebar((prev) => !prev)}
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                    )}
                    <h1 className="text-xl font-bold text-blue-600 dark:text-gray-400">
                        Dashboard
                    </h1>
                </div>
                <div className="flex space-x-5">
                    <div className="flex w-auto items-center space-x-2 rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-gray-700 dark:text-gray-300">
                        <SunIcon className="w-4" />
                        <div className="relative flex h-2 w-8 items-center rounded-full bg-blue-200 py-1 dark:bg-gray-200">
                            <motion.button
                                onClick={toggleDarkMode}
                                animate={{
                                    x: isDarkMode ? 3 : 12,
                                }}
                                className="h-4 w-4 rounded-full border border-gray-500/50 bg-blue-600 shadow hover:bg-blue-700 dark:border-gray-500 dark:bg-gray-700"
                            ></motion.button>
                        </div>
                        <MoonIcon className="w-4" />
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                            {user.name}
                        </button>
                        <form onSubmit={submit} action="POST">
                            <Link
                                method="post"
                                as="button"
                                href={route('logout')}
                                className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                Logout
                            </Link>
                        </form>
                    </div>
                </div>
            </header>
        </>
    );
}
