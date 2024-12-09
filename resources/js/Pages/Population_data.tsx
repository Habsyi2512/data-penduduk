import Box from '@/Components/box/Box';
import { PencilSquareIcon } from '@/Components/icons/PencilSquareIcon';
import PaginationLinks from '@/Components/pagination/PaginationLinks';
import Table from '@/Components/table/Table';
import TableBody from '@/Components/table/TableBody';
import { Td } from '@/Components/table/TableComponents';
import TableHead from '@/Components/table/TableHead';
import Th from '@/Components/table/Th';
import Tr from '@/Components/table/Tr';
import TooltipDemo from '@/Components/tooltip/TooltipDemo';
import { handleEdit } from '@/hooks/Edit/FormHooks';
import { PaginatedPenduduk } from '@/interface/pagination/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

interface PopulationDataProps {
data_penduduk: PaginatedPenduduk;
csrf_token: string;
}

export default function Population_data({
data_penduduk,
csrf_token,
}: PopulationDataProps) {
const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const currentPage = data_penduduk.current_page;
    const perPage = data_penduduk.per_page;

    React.useEffect(() => {
    console.log(data_penduduk);
    console.log('token = ', csrf_token);
    }, [csrf_token]);

    // Fungsi untuk menangani perubahan seleksi
    const handleSelect = (id: number) => {
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

    const handleEditButton = (id: number | string) => {
    // Menggunakan Inertia untuk mengarahkan ke halaman edit
    Inertia.visit(`/penduduk/${id}/edit`, {
    preserveState: true, // Menjaga state halaman tetap ada saat navigasi
    });
    };

    // Menampilkan data yang dipilih di konsol
    React.useEffect(() => {
    if (selectedIds.length > 0) {
    console.log('Data yang dipilih: ', selectedIds);
    }
    }, [selectedIds]);

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
        <Box className="p-2">
            <div className="px-5">
                <h1 className="mb-3 py-2 font-inter text-2xl font-bold text-blue-500">
                    Data Penduduk
                </h1>
            </div>
            <div className="mb-2 flex items-center space-x-5">
                <button onClick={()=> handleEdit(selectedIds[0], csrf_token)}
                    disabled={selectedIds.length < 1}
                        className="flex items-center justify-center space-x-2 rounded bg-blue-500 p-1 px-3 text-white shadow hover:bg-blue-600 active:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300">
                        <PencilSquareIcon className="size-4" />{' '}
                        <span>Edit</span>
                </button>
            </div>
            <Table>
                <TableHead>
                    <Tr className="overflow-hidden">
                        <Th className="rounded-tl pl-5">
                            <input type="checkbox" onChange={(e)=> {
                            if (e.target.checked) {
                            // Pilih semua baris
                            const allIds =
                            data_penduduk.data.map(
                            (penduduk) => penduduk.id,
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
                        <Th>No</Th>
                        <Th>NIK</Th>
                        <Th className="max-w-5">Nama</Th>
                        <Th className="truncate">Tpt. Lahir</Th>
                        <Th>Tgl. Lahir</Th>
                        <Th>Gender</Th>
                        <Th className="truncate">Gol</Th>
                        <Th>Agama</Th>
                        <Th className="">Sts. Kawin</Th>
                        <Th>Pekerjaan</Th>
                        <Th>Kwn</Th>
                        <Th className="rounded-tr">Aksi</Th>
                    </Tr>
                </TableHead>
                <TableBody>
                    {data_penduduk.data.map((penduduk, index) => (
                    <Tr className="bg-slate-100 transition-colors duration-200 ease-in-out hover:bg-slate-200"
                        key={penduduk.id}>
                        <Td className="pl-5">
                            <input type="checkbox" checked={selectedIds.includes( penduduk.id, )} onChange={()=>
                            handleSelect(penduduk.id)
                            }
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                            />
                        </Td>
                        <Td className="text-center">
                            {/* Menghitung nomor urut berdasarkan halaman aktif */}
                            {index + 1 + (currentPage - 1) * perPage}
                        </Td>
                        <Td className="max-w-20 truncate">
                            <TooltipDemo value={penduduk.nik} />
                        </Td>
                        <Td className="w-20 max-w-20 truncate">
                            <TooltipDemo value={penduduk.nama} />
                        </Td>
                        <Td className="max-w-[41px] truncate">
                            {penduduk.tempat_lahir}
                        </Td>
                        <Td className="w-[41px] max-w-[4qpx] truncate">
                            {formatDate(penduduk.tanggal_lahir)}
                        </Td>
                        <Td>{penduduk.jenis_kelamin?.jenis_kelamin}</Td>
                        <Td>{penduduk.gol_darah?.gol_darah}</Td>
                        <Td>{penduduk.agama?.agama}</Td>
                        <Td>{penduduk.status_kawin?.status}</Td>
                        <Td>{penduduk.pekerjaan?.pekerjaan}</Td>
                        <Td className="text-sm">
                            {penduduk.kewarganegaraan?.kewarganegaraan}
                        </Td>
                        <Td className="flex justify-center pr-5">
                            <button onClick={()=>{handleEditButton(penduduk.id)}}
                                className="rounded bg-blue-500 p-1 text-white shadow hover:bg-blue-600 active:bg-blue-500">
                                <PencilSquareIcon className="size-4" />
                            </button>
                        </Td>
                    </Tr>
                    ))}
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
