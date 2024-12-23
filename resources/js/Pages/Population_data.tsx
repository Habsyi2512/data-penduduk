import Box from '@/Components/box/Box';
import Button from '@/Components/button/Button';
import { ArrowPathIcon } from '@/Components/icons/ArrowPathIcon';
import { TrashIcon } from '@/Components/icons/TrashIcon';
import ConfirmDiscardModalAll from '@/Components/modal/ConfirmDiscardModalAll';
import PaginationLinks from '@/Components/pagination/PaginationLinks';
import Table from '@/Components/table/Table';
import TableBody from '@/Components/table/TableBody';
import { Td } from '@/Components/table/TableComponents';
import TableHead from '@/Components/table/TableHead';
import Th from '@/Components/table/Th';
import Tr from '@/Components/table/Tr';
import TooltipDemo from '@/Components/tooltip/TooltipDemo';
import { useLoadingContext } from '@/context/LoadingContext';
import { PaginatedPenduduk } from '@/interface/pagination/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SearchForm from './Form/search/SearchForm';

interface PopulationDataProps {
    data_penduduk: PaginatedPenduduk;
    csrf_token: string;
}

export default function Population_data({ data_penduduk, csrf_token }: PopulationDataProps) {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [openModalDiscard, setOpenModalDiscard] = useState(false);
    const { setLoading } = useLoadingContext();

    const currentPage = data_penduduk.current_page;
    const perPage = data_penduduk.per_page;

    function formatDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', options);
    }

    const handleDelete = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                if (selectedRows.length > 0) {
                    router.put(
                        route('penduduk.delete'),
                        { id: selectedRows }, // Data yang dikirim
                        {
                            onSuccess: (message) => {
                                const successMessage = message.props.flash.success;
                                toast.success(successMessage);
                                setLoading(false);
                            },

                            onError: (errors) => {
                                console.error('Terjadi kesalahan:', errors);
                            },
                        }
                    );
                }
                setSelectedRows([]);
            } catch (e) {
                console.error('Form submit error:', e);
            }
        }, 500);
    };

    return (
        <Authenticated>
            <ConfirmDiscardModalAll onClick={handleDelete} state={openModalDiscard} setState={setOpenModalDiscard} />
            <Box className="p-2">
                <div className="px-5">
                    <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">Data Penduduk</h1>
                </div>
                <div className="mb-2 flex items-center justify-between space-x-5">
                    <Button
                        onClick={() => {
                            setOpenModalDiscard(true);
                        }}
                        btnColor="red"
                        disabled={selectedRows.length < 1}
                        className="flex text-sm items-center justify-center space-x-2"
                    >
                        <TrashIcon className="size-4" />
                        <span>Remove</span>
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                                e.preventDefault();
                                router.get('/population');
                            }}
                        >
                            <TooltipDemo content={'Refresh'} value={<ArrowPathIcon className="w-5" />} />
                        </Button>
                        <SearchForm />
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <Tr className="overflow-hidden">
                            <Th className="rounded-tl pl-5">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.length === data_penduduk.data.length && selectedRows.length != 0}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            // Pilih semua baris
                                            const allIds = data_penduduk.data.map((penduduk) => penduduk.nik);
                                            setSelectedRows(allIds);
                                        } else {
                                            // Hapus semua pilihan
                                            setSelectedRows([]);
                                        }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                                />
                            </Th>
                            <Th>No</Th>
                            <Th>NIK</Th>
                            <Th className="">Nama</Th>
                            <Th className="truncate">Tpt. Lahir</Th>
                            <Th>Tgl. Lahir</Th>
                            <Th>Gender</Th>
                            <Th className="truncate">Gol</Th>
                            <Th>Agama</Th>
                            <Th className="">Sts. Kawin</Th>
                            <Th>Pekerjaan</Th>
                            <Th>Kwn</Th>
                        </Tr>
                    </TableHead>

                    <TableBody>
                        {data_penduduk.data.length === 0 ? (
                            <Tr>
                                <Td colSpan={13} className="py-4 text-center text-gray-500">
                                    Tidak ada data
                                    <Link className="mx-auto flex w-fit items-center hover:text-blue-500" href="/population">
                                        <ArrowPathIcon className="w-5" />
                                        Refresh
                                    </Link>
                                </Td>
                            </Tr>
                        ) : (
                            data_penduduk.data.map((penduduk, index) => (
                                <Tr className="bg-slate-100 transition-colors duration-200 ease-in-out hover:bg-slate-200" key={penduduk.nik}>
                                    <Td className="pl-5">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(penduduk.nik)}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                setSelectedRows((prevSelectedRows) => {
                                                    if (prevSelectedRows.includes(penduduk.nik)) {
                                                        // Menghapus no_kk dari selectedRows jika checkbox dibersihkan
                                                        return prevSelectedRows.filter((item) => item !== penduduk.nik);
                                                    } else {
                                                        // Menambahkan no_kk ke selectedRows jika checkbox dicentang
                                                        return [...prevSelectedRows, penduduk.nik];
                                                    }
                                                });
                                            }}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                                        />
                                    </Td>
                                    <Td>{index + 1 + (currentPage - 1) * perPage}</Td>
                                    <Td className="max-w-20 truncate">
                                        <TooltipDemo content={penduduk.nik} value={penduduk.nik} />
                                    </Td>
                                    <Td className="w-20 max-w-20 truncate">
                                        <TooltipDemo content={penduduk.nama} value={penduduk.nama} />
                                    </Td>
                                    <Td className="max-w-[41px] truncate">
                                        <TooltipDemo content={penduduk.tempat_lahir} value={penduduk.tempat_lahir} />
                                    </Td>
                                    <Td className="w-[41px] max-w-[4qpx] truncate">{formatDate(penduduk.tanggal_lahir)}</Td>
                                    <Td>{penduduk.jenis_kelamin?.jenis_kelamin}</Td>
                                    <Td>{penduduk.gol_darah?.gol_darah}</Td>
                                    <Td>{penduduk.agama?.agama}</Td>
                                    <Td>{penduduk.status_kawin?.status}</Td>
                                    <Td>{penduduk.pekerjaan?.pekerjaan}</Td>
                                    <Td className="text-sm">{penduduk.kewarganegaraan?.kewarganegaraan}</Td>
                                </Tr>
                            ))
                        )}
                    </TableBody>

                    <tfoot className="w-full">
                        <tr className="w-full">
                            <td colSpan={13} className="rounded-b bg-white p-2">
                                <PaginationLinks links={data_penduduk.links} />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Box>
        </Authenticated>
    );
}
