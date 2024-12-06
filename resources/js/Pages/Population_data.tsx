import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useEffect } from 'react';

interface AgamaProps {
    id: string;
    name: string;
}

export default function Population_data({agamas}: {agamas: AgamaProps[]}) {
    useEffect(()=>{
        console.log('agama = ', agamas);
    },[agamas])
// Mengambil data population_data yang diterima dari controller
return (
<AuthenticatedLayout>
    {/* <div className="p-4">
        <h1 className="mb-4 text-xl font-bold">Data Penduduk</h1>
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-400">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">
                            No
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            NIK
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Nama
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Tempat Lahir
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Tanggal Lahir
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Kelamin
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Agama
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Status Kawin
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Pekerjaan
                        </th>
                        <th className="border border-gray-400 px-4 py-2">
                            Kewarganegaraan
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {population_data.map(
                    (penduduk: any, index: number) => (
                    <tr key={penduduk.id}>
                        <td className="border border-gray-400 px-4 py-2">
                            {index + 1}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.nik}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.nama}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.tempat_lahir}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.tanggal_lahir}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.jenis_kelamin?.nama}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.agama?.nama}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.status_kawin?.nama}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.pekerjaan?.nama}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.kewarganegaraan?.nama}
                        </td>
                    </tr>
                    ),
                    )}
                </tbody>
            </table>
        </div>
    </div> */}

    <div>
        <h1>Data Agama</h1>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Agama</th>
                </tr>
            </thead>
            <tbody>
                {/* Menggunakan map() untuk iterasi array agamas */}
               
    
            </tbody>
        </table>
    </div>
</AuthenticatedLayout>
);
}
