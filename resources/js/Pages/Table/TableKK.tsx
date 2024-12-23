import { ArrowPathIcon } from '@/Components/icons/ArrowPathIcon';
import PaginationLinks from '@/Components/pagination/PaginationLinks';
import { Table, TableBody, TableHead, Td, Th, Tr } from '@/Components/table/TableComponents';
import TooltipDemo from '@/Components/tooltip/TooltipDemo';
import { DataKKProps } from '@/interface/pageprops/tabel-kk-props/interface';
import { PaginatedKK } from '@/interface/pagination/interface';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

interface TableProps {
    openModal: (data: DataKKProps) => void;
    setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
    data: PaginatedKK;
    handleSelect: (id: string) => void;
    selectedIds: string[];
}

export default function TableKK({ handleSelect, openModal, setSelectedIds, data, selectedIds }: TableProps) {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    return (
        <Table>
            <TableHead>
                <Tr className="overflow-hidden">
                    <Th className="rounded-tl text-center">
                        <input
                            type="checkbox"
                            checked={selectedRows.length === data.data.length}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    // Pilih semua baris
                                    const allIds = data.data.map((penduduk) => penduduk.no_kk);
                                    setSelectedRows(allIds);
                                } else {
                                    // Hapus semua pilihan
                                    setSelectedRows([]);
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
                        <Td colSpan={13} className="py-4 text-center text-gray-500">
                            Tidak ada data
                            <Link className="mx-auto flex w-fit items-center hover:text-blue-500" href="/dashboard/data-kk">
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
                                    checked={selectedRows.includes(penduduk.no_kk)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setSelectedRows((prevSelectedRows) => {
                                            if (prevSelectedRows.includes(penduduk.no_kk)) {
                                                // Menghapus no_kk dari selectedRows jika checkbox dibersihkan
                                                return prevSelectedRows.filter((item) => item !== penduduk.no_kk);
                                            } else {
                                                // Menambahkan no_kk ke selectedRows jika checkbox dicentang
                                                return [...prevSelectedRows, penduduk.no_kk];
                                            }
                                        });
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 transition duration-200 ease-in-out focus:ring-1 focus:ring-blue-500 focus:ring-offset-2"
                                />
                            </Td>
                            <Td className="text-center">{penduduk.globalIndex}</Td>
                            <Td className="">{penduduk.no_kk}</Td>
                            <Td className="border border-black">{penduduk.village.district.regency.name}</Td>
                            <Td className="">
                                <TooltipDemo content={penduduk.village.district.name} value={penduduk.village.district.name} />
                            </Td>
                            <Td className="">{penduduk.village.name}</Td>
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
    );
}
