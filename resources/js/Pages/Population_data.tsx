import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface data_pendudukProps {
id: number;
nik: string;
nama: string;
tempat_lahir: string;
tanggal_lahir: string;
kelamin: string;
gol_darah: string;
agama: string;
status_kawin: string;
pekerjaan: string;
kewarganegaraan: string;
}


export default function Population_data({data_penduduk}: {data_penduduk: data_pendudukProps[]}) {
function formatDate(dateString : string){
const options: Intl.DateTimeFormatOptions = {
year: 'numeric',
month: 'long',
day: 'numeric',
};
const date = new Date(dateString);
return date.toLocaleDateString('id-ID', options);
}
return (
<AuthenticatedLayout>
    <div className="p-4">
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
                            Golongan Darah
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
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data_penduduk.map((penduduk: any, index: number) => (
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
                            {formatDate(penduduk.tanggal_lahir)}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.jenis_kelamin?.jenis_kelamin}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.gol_darah?.gol_darah}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.agama?.agama}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.status_kawin?.status}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.pekerjaan?.pekerjaan}
                        </td>
                        <td className="border border-gray-400 px-4 py-2">
                            {penduduk.kewarganegaraan?.kewarganegaraan}
                            {console.log(penduduk)}
                        </td>
                        <td>
                            <a href="#">Edit</a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</AuthenticatedLayout>
);
}
