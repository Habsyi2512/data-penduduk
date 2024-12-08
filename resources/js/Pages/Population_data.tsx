import PaginationLinks from '@/Components/pagination/PaginationLinks';
import Table from '@/Components/table/Table';
import TableBody from '@/Components/table/TableBody';
import { Td } from '@/Components/table/TableComponents';
import TableHead from '@/Components/table/TableHead';
import Th from '@/Components/table/Th';
import Tr from '@/Components/table/Tr';
import { PaginatedPenduduk } from '@/interface/pagination/interface';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';

interface PopulationDataProps {
    data_penduduk: PaginatedPenduduk;
}

export default function Population_data({
    data_penduduk,
}: PopulationDataProps) {
    // State untuk menyimpan ID yang dipilih
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    React.useEffect(() => {
        console.log(data_penduduk);
    }, []);

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
            <div className="p-4">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                    Data Penduduk
                </h1>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHead>
                            <Tr>
                                <Th>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // Pilih semua baris
                                                const allIds =
                                                    data_penduduk.data.map(
                                                        (penduduk) =>
                                                            penduduk.id,
                                                    );
                                                setSelectedIds(allIds);
                                            } else {
                                                // Hapus semua pilihan
                                                setSelectedIds([]);
                                            }
                                        }}
                                    />
                                </Th>
                                <Th>No</Th>
                                <Th>NIK</Th>
                                <Th>Nama</Th>
                                <Th>Tempat Lahir</Th>
                                <Th>Tanggal Lahir</Th>
                                <Th>Kelamin</Th>
                                <Th>Golongan Darah</Th>
                                <Th>Agama</Th>
                                <Th>Status Kawin</Th>
                                <Th>Pekerjaan</Th>
                                <Th>Kewarganegaraan</Th>
                                <Th>Aksi</Th>
                            </Tr>
                        </TableHead>
                        <TableBody>
                            {data_penduduk.data.map((penduduk, index) => (
                                <Tr key={penduduk.id}>
                                    <Td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(
                                                penduduk.id,
                                            )}
                                            onChange={() =>
                                                handleSelect(penduduk.id)
                                            }
                                        />
                                    </Td>
                                    <Td>{index + 1}</Td>
                                    <Td>{penduduk.nik}</Td>
                                    <Td>{penduduk.nama}</Td>
                                    <Td>{penduduk.agama.agama}</Td>
                                    <Td>
                                        {formatDate(penduduk.tanggal_lahir)}
                                    </Td>
                                    <Td>
                                        {penduduk.jenis_kelamin?.jenis_kelamin}
                                    </Td>
                                    <Td>{penduduk.gol_darah?.gol_darah}</Td>
                                    <Td>{penduduk.agama?.agama}</Td>
                                    <Td>{penduduk.status_kawin?.status}</Td>
                                    <Td>{penduduk.pekerjaan?.pekerjaan}</Td>
                                    <Td>
                                        {
                                            penduduk.kewarganegaraan
                                                ?.kewarganegaraan
                                        }
                                    </Td>
                                    <Td>
                                        <a href="#">Edit</a>
                                    </Td>
                                </Tr>
                            ))}
                        </TableBody>
                    </Table>

                    <PaginationLinks links={data_penduduk.links} />
                </div>
            </div>
        </Authenticated>
    );
}
