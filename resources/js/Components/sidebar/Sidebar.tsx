import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Bars3Icon from '../icons/Bars3Icon';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

export default function Sidebar({ isOpenSidebar, setIsOpenSidebar }: { isOpenSidebar: boolean; setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { url } = usePage();
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);

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
            title: 'Data',
            url: '',
            subMenu: [
                {
                    title: 'Biodata',
                    url: '/population',
                },
                {
                    title: 'Kartu Keluarga',
                    url: '/dashboard/data-kk',
                },
            ],
        },
        {
            title: 'Layanan Kependudukan',
            url: '',
            subMenu: [
                {
                    title: 'Registrasi KK',
                    url: '/dashboard/buat-kk',
                },
                {
                    title: 'Registrasi KTP',
                    url: '/dashboard/tambah-penduduk',
                },
                {
                    title: 'Registrasi KTP dan KK',
                    url: '/dashboard',
                },
                {
                    title: 'Pindah KK',
                    url: '/dashboard/pindah-kk',
                },
            ],
        },
        {
            title: 'Managemen Data',
            url: '',
            subMenu: [
                {
                    title: ' Data Agama',
                    url: '/dashboard/data-agama',
                },
                {
                    title: ' Data Golongan Darah',
                    url: '/dashboard/data-gol-darah',
                },
                {
                    title: ' Data Status Kawin',
                    url: '/dashboard/data-status-kawin',
                },
                {
                    title: ' Data Pekerjaan',
                    url: '/dashboard/data-pekerjaan',
                },
                {
                    title: ' Data Warganegara',
                    url: '/dashboard/data-kewarganegaraan',
                },
            ],
        },
        {
            title: 'Arsip Data Hapus',
            url: '',
            subMenu: [
                {
                    title: 'Biodata',
                    url: '/dashboard/arsip-biodata',
                },
            ],
        },
        {
            title: 'Permohonan',
            url: '/dashboard/permohonan',
        },
    ];

    const handleToggleSubMenu = (index: number) => {
        setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
    };

    return (
        <motion.aside
            initial={{ width: 250 }}
            animate={{ width: isOpenSidebar ? 250 : 0 }}
            className="hidden h-full overflow-hidden border-r border-gray-200 bg-blue-900 text-white shadow-lg transition-colors duration-500 dark:border-gray-500/50 dark:bg-gray-800 dark:text-gray-300 xl:block"
        >
            <nav className="flex items-center justify-between px-4 py-4">
                <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600" onClick={() => setIsOpenSidebar((prev) => !prev)}>
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
                                    className={`flex w-full items-center justify-between truncate rounded px-3 py-2 hover:bg-blue-800 dark:hover:bg-gray-700 ${
                                        menu.url === url || menu.subMenu?.some((subMenu) => subMenu.url === url) ? 'bg-blue-800 dark:bg-gray-700' : ''
                                    }`}
                                >
                                    {menu.title}
                                    <span>{openSubMenuIndex === index ? <ChevronDownIcon className="w-3" /> : <ChevronRightIcon className="w-3" />}</span>
                                </button>
                                <ul className={`overflow-y-auto pl-3 transition-all duration-300 ease-in-out ${openSubMenuIndex === index ? 'mt-2 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    {menu.subMenu.map((subMenu, subIndex) => (
                                        <li key={subIndex} className="mb-2">
                                            <Link href={subMenu.url} className={`inline-block ${subMenu.url == url && 'bg-blue-800 dark:bg-gray-700'} w-full rounded px-3 py-2 text-xs hover:bg-blue-700 dark:hover:bg-gray-600`}>
                                                {subMenu.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <Link href={menu.url} className={`inline-block w-full rounded px-3 py-2 hover:bg-blue-800 dark:hover:bg-gray-700 ${url == menu.url && 'bg-blue-800 dark:bg-gray-700'}`}>
                                {menu.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </motion.aside>
    );
}
