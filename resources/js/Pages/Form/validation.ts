import * as Yup from 'yup';

export const validationSchema = Yup.object({
    forms: Yup.array().of(
        Yup.object({
            nik: Yup.string()
                .required('NIK Wajib diisi')
                .length(16, 'NIK harus berisi 16 karakter berupa angka'),
            nama: Yup.string().required('Nama wajib diisi'),
            tempat_lahir: Yup.string().required('Tempat lahir wajib diisi'),
            tanggal_lahir: Yup.string()
                .required('Tanggal lahir wajib diisi')
                .test(
                    'is-before-today',
                    'Tanggal lahir harus sebelum hari ini',
                    (value) => {
                        if (!value) return false; // Jika tanggal lahir kosong, gagal validasi
                        const today = new Date();
                        const birthDate = new Date(value);
                        return birthDate < today; // Validasi tanggal lahir harus sebelum hari ini
                    },
                ),
            jenis_kelamin: Yup.object({
                jenis_kelamin: Yup.string().required(
                    'Jenis kelamin wajib diisi',
                ),
            }).required(),
            gol_darahs: Yup.object({
                gol_darah: Yup.string().required('Golongan darah wajib diisi'),
            }).required('Golongan darah wajib diisi'),
            agama: Yup.object({
                agama: Yup.string().required('Agama wajib diisi'),
            }).required('Agama wajib diisi'),
            status_kawin: Yup.object({
                status: Yup.string().required('Status kawin wajib diisi'),
            }).required('Status kawin wajib diisi'),
            pekerjaan: Yup.object({
                pekerjaan: Yup.string().required('Pekerjaan wajib diisi'),
            }).required('Pekerjaan wajib diisi'),
            kewarganegaraan: Yup.object({
                kewarganegaraan: Yup.string().required(
                    'Kewarganegaraan wajib diisi',
                ),
            }).required('Kewarganegaraan wajib diisi'),
            alamat: Yup.object({
                alamat: Yup.string().required('Alamat wajib diisi'),
                kelurahan_id: Yup.string().required('Kelurahan wajib diisi'),
                kelurahan_nama: Yup.string().required('Kelurahan wajib diisi'),
                kecamatan_nama: Yup.string().required('Kecamatan wajib diisi'),
                kabupaten_nama: Yup.string().required('Kabupaten wajib diisi'),
            }).required('Alamat wajib diisi'),
        }),
    ),
});
