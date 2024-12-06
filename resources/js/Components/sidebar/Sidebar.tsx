import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Bars3Icon from '../icons/Bars3Icon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

export default function Sidebar({
    isOpenSidebar,
    setIsOpenSidebar,
}: {
    isOpenSidebar: boolean;
    setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { url } = usePage();
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(
        null,
    );

    const menus: {
        title: string;
        url: string;
        subMenu?: { title: string; url: string }[];
    }[] = [
        {
            title: 'Dashboard',
            url: '/dashboard',
        },
        {
            title: 'Data Penduduk',
            url: '/population',
            subMenu: [
                {
                    title: 'Tambah Penduduk',
                    url: '/dashboard/tambah-penduduk',
                },
                {
                    title: 'Hapus Penduduk',
                    url: '/dashboard/hapus-penduduk',
                },
            ],
        },
        {
            title:'Managemen Data',
            url: '/managemen-data',
        },
        {
            title: 'Laporan',
            url: '/laporan',
        },
    ];

    const handleToggleSubMenu = (index: number) => {
        setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
    };

    return (
        <motion.aside
            initial={{ width: 250 }}
            animate={{ width: isOpenSidebar ? 250 : 0 }}
            className="h-full overflow-hidden border-r border-gray-200 bg-blue-900 text-white shadow-lg transition-colors duration-500 dark:border-gray-500/50 dark:bg-gray-800 dark:text-gray-300"
        >
            <nav className="flex items-center justify-between px-4 py-4">
                <button
                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setIsOpenSidebar((prev) => !prev)}
                >
                    <Bars3Icon className="h-6 w-6 text-gray-300" />
                </button>
            </nav>
            <ul className="space-y-2 p-3 py-6 text-sm">
                {menus.map((menu, index) => (
                    <li key={index} className="relative">
                        {menu.subMenu ? (
                            <>
                                <button
                                    onClick={() => handleToggleSubMenu(index)}
                                    className={`flex truncate w-full items-center justify-between rounded px-3 py-2 hover:bg-blue-800 dark:hover:bg-gray-700 ${
                                        menu.url === url ||
                                        menu.subMenu?.some(
                                            (subMenu) => subMenu.url === url,
                                        )
                                            ? 'bg-blue-800 dark:bg-gray-700'
                                            : ''
                                    }`}
                                >
                                    {menu.title}
                                    <span>
                                        {openSubMenuIndex === index ? (
                                            <ChevronDownIcon className="w-3" />
                                        ) : (
                                            <ChevronRightIcon className="w-3" />
                                        )}
                                    </span>
                                </button>
                                <ul
                                    className={`overflow-hidden pl-6 transition-all duration-300 ease-in-out ${
                                        openSubMenuIndex === index
                                            ? 'max-h-40 mt-2 opacity-100'
                                            : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    {menu.subMenu.map((subMenu, subIndex) => (
                                        <li key={subIndex}>
                                            <a
                                                href={subMenu.url}
                                                className={`inline-block ${subMenu.url == url && 'bg-blue-800 dark:bg-gray-700'} w-full rounded px-3 py-2 hover:bg-blue-700 dark:hover:bg-gray-600`}
                                            >
                                                {subMenu.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <a
                                href={menu.url}
                                className={`inline-block w-full rounded px-3 py-2 hover:bg-blue-800 dark:hover:bg-gray-700 ${url == menu.url && 'bg-blue-800 dark:bg-gray-700'}`}
                            >
                                {menu.title}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </motion.aside>
    );
}
