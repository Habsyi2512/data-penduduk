import { Inertia } from '@inertiajs/inertia';

export const handleEdit = async (selectedId: number, csrfToken: string) => {
    try {
        // Mengirim token CSRF bersama permintaan
        const response = await fetch(route('getPendudukData'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken, // Token CSRF
            },
            body: JSON.stringify({ selected_ids: [selectedId] }), // Kirim hanya ID yang dipilih
        });

        const data = await response.json();

        if (response.ok) {
            console.log('data', data);
            
            // Redirect ke halaman edit dengan data yang didapat
            Inertia.visit(
                route('edit-penduduk', {
                    id: selectedId, // Kirimkan ID yang dipilih
                    data_penduduk: data.data_penduduk, // Kirimkan data penduduk yang didapat
                    agama: data.agama,
                    dataKelamin: data.dataKelamin,
                    dataGolDarah: data.dataGolDarah,
                    dataStatusKawin: data.dataStatusKawin,
                    dataPekerjaan: data.dataPekerjaan,
                    dataKewarganegaraan: data.dataKewarganegaraan,
                }),
            );
        } else {
            console.error('Terjadi kesalahan saat mengambil data');
        }
    } catch (error) {
        console.error('Error saat mengirim request:', error);
    }
};
