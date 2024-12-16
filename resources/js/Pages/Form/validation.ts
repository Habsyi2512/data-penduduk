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


export const validationSchemaEdit = Yup.object({
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
                        if (!value) return false;
                        const today = new Date();
                        const birthDate = new Date(value);
                        return birthDate < today; // Validasi tanggal lahir harus sebelum hari ini
                    },
                ),
            jenis_kelamin: Yup.string().required('Jenis kelamin wajib diisi'),
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
                kewarganegaraan: Yup.string().required('Kewarganegaraan wajib diisi'),
            }).required('Kewarganegaraan wajib diisi'),
            alamat: Yup.object({
                id: Yup.string().required('ID Alamat wajib diisi'),
                alamat: Yup.string().required('Alamat wajib diisi'),
                kelurahan_id: Yup.string().required('Kelurahan wajib diisi'),
                kelurahan_nama: Yup.string().required('Kelurahan wajib diisi'),
                kecamatan_nama: Yup.string().required('Kecamatan wajib diisi'),
                kabupaten_nama: Yup.string().required('Kabupaten wajib diisi'),
            }).required('Alamat wajib diisi'),
        })
    ),
});

export const validationSchemaBuatKK = Yup.object().shape({
    alamat: Yup.string()
        .required('Alamat wajib diisi.')
        .min(10, 'Alamat minimal 10 karakter.'),
    kelurahan: Yup.object().shape({
        name: Yup.string()
            .required('Nama kelurahan/desa wajib diisi.')
            .min(3, 'Nama kelurahan/desa minimal 3 karakter.'),
    }),
    kecamatan: Yup.object().shape({
        name: Yup.string()
            .required('Nama kecamatan wajib diisi.')
            .min(3, 'Nama kecamatan minimal 3 karakter.'),
    }),
    kabupaten: Yup.object().shape({
        name: Yup.string()
            .required('Nama kabupaten wajib diisi.')
            .min(3, 'Nama kabupaten minimal 3 karakter.'),
    }),
});