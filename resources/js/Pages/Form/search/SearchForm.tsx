import { MagnifyingGlassIcon } from '@/Components/icons/MagnifyGlassIcon';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

const SearchForm = ({
    queryKey = 'search',
    route = 'population',
    placeHolder = 'Ketikkan Nama...'
}: {
    queryKey?: string;
    placeHolder?: string;
    route?: string;
}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route, {
            [queryKey]: searchTerm,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex h-full">
            <div className="flex w-full items-center overflow-hidden rounded border bg-white">
                <div className="flex items-center pl-3">
                    <label htmlFor="search">
                        <MagnifyingGlassIcon className="w-5 text-gray-700" />
                    </label>
                    <input
                        autoComplete="off"
                        id="search"
                        type="search"
                        name="search"
                        placeholder={placeHolder}
                        className="border-none bg-transparent ring-0 focus:ring-0"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <button
                    type="submit"
                    className="flex h-full flex-1 items-center justify-center bg-blue-500 px-2 py-1 text-white"
                >
                    Cari
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
