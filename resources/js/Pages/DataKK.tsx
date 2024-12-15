import Box from '@/Components/box/Box';
import Button from '@/Components/button/Button';
import { ArrowPathIcon } from '@/Components/icons/ArrowPathIcon';
import { PencilSquareIcon } from '@/Components/icons/PencilSquareIcon';
import DetailKKModal from '@/Components/modal/DetailKKModal';
import PaginationLinks from '@/Components/pagination/PaginationLinks';
import Table from '@/Components/table/Table';
import TableBody from '@/Components/table/TableBody';
import TableHead from '@/Components/table/TableHead';
import Td from '@/Components/table/Td';
import Th from '@/Components/table/Th';
import Tr from '@/Components/table/Tr';
import TooltipDemo from '@/Components/tooltip/TooltipDemo';
import { dataDefaultSelectedModal } from '@/data/dataSelectedModal';
import { DataKKProps } from '@/interface/pageprops/tabel-kk-props/interface';
import { PaginatedKK } from '@/interface/pagination/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import SearchForm from './Form/search/SearchForm';

interface PopulationDataProps {
    data: PaginatedKK;
}

export default function DataKK({ data }: PopulationDataProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [dataSelectedModal, setDataSelectedModal] = useState<DataKKProps>(
        dataDefaultSelectedModal,
    );
    const [openModalDetailKK, setOpenModalDetailKK] = useState(false);

    const currentPage = data.current_page;
    const perPage = data.per_page;

    const openModal = (data: DataKKProps) => {
        setOpenModalDetailKK(true);
        setDataSelectedModal(data);
    };

    const closeModal = () => {
        setOpenModalDetailKK(false);
        setDataSelectedModal(dataDefaultSelectedModal);
    };

    // Fungsi untuk menangani perubahan seleksi
    const handleSelect = (id: string) => {
        setSelectedIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(id)) {
                return prevSelectedIds.filter(
                    (selectedId) => selectedId !== id,
                ); // Menghapus ID jika sudah terpilih
            } else {
                return [...prevSelectedIds, id]; // Menambahkan ID jika belum terpilih
            }
        });
    };

    const handleEditButton = () => {
        router.get(
            route('penduduk.edit'),
            { id: selectedIds },
            {
                replace: true,
            },
        );
    };

    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    }

    return (
        <Authenticated>
            {openModalDetailKK && (
                <DetailKKModal onClose={closeModal} data={dataSelectedModal} />
            )}

            <Box className="p-2">
                <div className="px-5">
                    <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">
                        Data Kartu Keluarga
                    </h1>
                </div>
                <div className="mb-2 flex items-center justify-between space-x-5">
                    <button
                        onClick={handleEditButton}
                        disabled={selectedIds.length < 1}
                        className="flex items-center justify-center space-x-2 rounded bg-blue-500 p-1 px-3 text-white shadow hover:bg-blue-600 active:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        <PencilSquareIcon className="size-4" />
                        <span>Edit</span>
                    </button>
                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLButtonElement,
                                    MouseEvent
                                >,
                            ) => {
                                e.preventDefault();
                                router.get('/dashboard/data-kk');
                            }}
                        >
                            <TooltipDemo
                                content={'Refresh'}
                                value={<ArrowPathIcon className="w-5" />}
                            />
                        </Button>
                        <SearchForm />
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <Tr className="overflow-hidden">
                            <Th className="rounded-tl text-center">
                                <input
                                    type="checkbox"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            // Pilih semua baris
                                            const allIds = data.data.map(
                                                (penduduk) => penduduk.no_kk,
                                            );
                                            setSelectedIds(allIds);
                                        } else {
                                            // Hapus semua pilihan
                                            setSelectedIds([]);
                                        }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                                />
                            </Th>
                            <Th className="text-center">No</Th>
                            <Th className="">No. KK</Th>
                            <Th className="">Kabupaten</Th>
                            <Th className="">Kecamatan</Th>
                            <Th>Kelurahan</Th>
                        </Tr>
                    </TableHead>

                    <TableBody>
                        {data.data.length === 0 ? (
                            <Tr>
                                <Td
                                    colSpan={13}
                                    className="py-4 text-center text-gray-500"
                                >
                                    Tidak ada data
                                    <Link
                                        className="mx-auto flex w-fit items-center hover:text-blue-500"
                                        href="/dashboard/data-kk"
                                    >
                                        <ArrowPathIcon className="w-5" />
                                        Refresh
                                    </Link>
                                </Td>
                            </Tr>
                        ) : (
                            data.data.map((penduduk, index) => (
                                <Tr
                                    className="bg-slate-100 transition-colors duration-200 ease-in-out hover:bg-slate-200"
                                    key={penduduk.no_kk}
                                    onDoubleClick={() => {
                                        openModal(penduduk);
                                    }}
                                >
                                    <Td className="text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(
                                                penduduk.no_kk,
                                            )}
                                            onChange={() =>
                                                handleSelect(penduduk.no_kk)
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                                        />
                                    </Td>
                                    <Td className="text-center">
                                        {index +
                                            1 +
                                            (currentPage - 1) * perPage}
                                    </Td>
                                    <Td className="">{penduduk.no_kk}</Td>
                                    <Td className="border border-black">
                                        {
                                            penduduk.alamat.village.district
                                                .regency.name
                                        }
                                    </Td>
                                    <Td className="">
                                        <TooltipDemo
                                            content={
                                                penduduk.alamat.village.district
                                                    .name
                                            }
                                            value={
                                                penduduk.alamat.village.district
                                                    .name
                                            }
                                        />
                                    </Td>
                                    <Td className="">
                                        {penduduk.alamat.village.name}
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </TableBody>

                    <tfoot className="w-full">
                        <tr className="w-full">
                            <td colSpan={13} className="rounded-b bg-white p-2">
                                <PaginationLinks links={data.links} />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Box>
        </Authenticated>
    );
}
