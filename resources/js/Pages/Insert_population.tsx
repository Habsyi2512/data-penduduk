import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

export default function Insert_population(props: any) {
const {
jenis_kelamin = [],
agama = [],
gol_darah = [],
kewarganegaraan = [],
pekerjaan = [],
status_kawin = [],
} = props;

const [form, setForm] = useState({
kelamin_id: '',
agama_id: '',
gol_darah_id: '',
kewarganegaraan_id: '',
pekerjaan_id: '',
status_kawin_id: '',
nik: '',
nama: '',
tempat_lahir: '',
tanggal_lahir: '',
});

const handleChange = (
e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mengirim data ke backend menggunakan Inertia
    Inertia.post('/population-data', form, {
    preserveScroll: true,
    onFinish: () => setForm({ ...form, nik: '' }),
    });
    };
    
    return (
    <AuthenticatedLayout>
        <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h1 className="mb-6 text-center text-2xl font-semibold">
                Insert Data Penduduk
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* NIK */}
                <div>
                    <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
                        NIK
                    </label>
                    <input id="nik" name="nik" type="text" pattern="\d{16}" value={form.nik}
                        onChange={handleChange} required
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <small className="text-xs text-gray-500">
                        Format NIK: 16 digit angka
                    </small>
                </div>

                {/* Nama */}
                <div>
                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                        Nama Lengkap
                    </label>
                    <input name="nama" id="nama" value={form.nama} onChange={handleChange}
                        placeholder="Masukkan Nama Lengkap" required
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Tempat Lahir */}
                <div>
                    <label htmlFor="tempat_lahir" className="block text-sm font-medium text-gray-700">
                        Tempat Lahir
                    </label>
                    <input id="tempat_lahir" name="tempat_lahir" value={form.tempat_lahir} onChange={handleChange}
                        placeholder="Masukkan Tempat Lahir" required
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Tanggal Lahir */}
                <div>
                    <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">
                        Tanggal Lahir
                    </label>
                    <input id="tanggal_lahir" name="tanggal_lahir" type="date" value={form.tanggal_lahir}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                {/* Jenis Kelamin */}
                <div>
                    <label htmlFor="kelamin_id" className="block text-sm font-medium text-gray-700">
                        Jenis Kelamin
                    </label>
                    <select id="kelamin_id" name="kelamin_id" value={form.kelamin_id} onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih Jenis Kelamin</option>
                        {jenis_kelamin.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.jenis_kelamin}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Golongan Darah */}
                <div>
                    <label htmlFor="gol_darah_id" className="block text-sm font-medium text-gray-700">
                        Golongan Darah
                    </label>
                    <select id="gol_darah_id" name="gol_darah_id" value={form.gol_darah_id} onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih Golongan Darah</option>
                        {gol_darah.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.gol_darah}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Agama */}
                <div>
                    <label htmlFor="agama_id" className="block text-sm font-medium text-gray-700">
                        Agama
                    </label>
                    <select id="agama_id" name="agama_id" value={form.agama_id} onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih Agama</option>
                        {agama.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.agama}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Status Kawin */}
                <div>
                    <label htmlFor="status_kawin_id" className="block text-sm font-medium text-gray-700">
                        Status Kawin
                    </label>
                    <select id="status_kawin_id" name="status_kawin_id" value={form.status_kawin_id}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih Status</option>
                        {status_kawin.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.status}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Pekerjaan */}
                <div>
                    <label htmlFor="pekerjaan_id" className="block text-sm font-medium text-gray-700">
                        Pekerjaan
                    </label>
                    <select id="pekerjaan_id" name="pekerjaan_id" value={form.pekerjaan_id} onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih Pekerjaan</option>
                        {pekerjaan.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.pekerjaan}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Kewarganegaraan */}
                <div>
                    <label htmlFor="kewarganegaraan_id" className="block text-sm font-medium text-gray-700">
                        Kewarganegaraan
                    </label>
                    <select id="kewarganegaraan_id" name="kewarganegaraan_id" value={form.kewarganegaraan_id}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Pilih Kewarganegaraan</option>
                        {kewarganegaraan.map((item: any) => (
                        <option key={item.id} value={item.id}>
                            {item.kewarganegaraan}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="mt-4 text-center">
                    <button type="submit"
                        className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </AuthenticatedLayout>
    );
    }
