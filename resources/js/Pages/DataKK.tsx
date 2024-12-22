import Box from '@/Components/box/Box';
import Button from '@/Components/button/Button';
import { ArrowPathIcon } from '@/Components/icons/ArrowPathIcon';
import DetailKKModal from '@/Components/modal/DetailKKModal';
import TooltipDemo from '@/Components/tooltip/TooltipDemo';
import { dataKabupaten } from '@/data/dataKabupaten';
import useTableKK from '@/hooks/useTableKK';
import { PopulationDataProps } from '@/interface/pageprops/tabel-kk-props/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import React from 'react';
import SearchForm from './Form/search/SearchForm';
import TableKK from './Table/TableKK';

export default function DataKK({ data, filters }: PopulationDataProps) {
    const { selectedIds, setSelectedIds, dataSelectedModal, openModalDetailKK, openModal, closeModal, handleSelect } = useTableKK();

    return (
        <Authenticated>
            {openModalDetailKK && <DetailKKModal onClose={closeModal} data={dataSelectedModal} />}

            <Box className="p-2">
                <div className="px-5">
                    <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">Data Kartu Keluarga</h1>
                </div>
                <div className="mb-2 flex items-center justify-between space-x-5">
                    <form method="GET" className="flex items-center space-x-2">
                        <select name="kabupaten" className="rounded border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" defaultValue={filters['kabupaten'] || ''}>
                            <option value="">Semua</option>
                            {dataKabupaten.map((kabupaten) => (
                                <option key={kabupaten.id} value={kabupaten.id}>
                                    {kabupaten.nama}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                            Filter
                        </button>
                    </form>
                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                e.preventDefault();
                                router.get('/dashboard/data-kk');
                            }}
                        >
                            <TooltipDemo content={'Refresh'} value={<ArrowPathIcon className="w-5" />} />
                        </Button>
                        <SearchForm placeHolder="Ketikkan no. kk" queryKey="no_kk" route="/dashboard/data-kk" />
                    </div>
                </div>
                <TableKK data={data} selectedIds={selectedIds} handleSelect={handleSelect} openModal={openModal} setSelectedIds={setSelectedIds} />
            </Box>
        </Authenticated>
    );
}
