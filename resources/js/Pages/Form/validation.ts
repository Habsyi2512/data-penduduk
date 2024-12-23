import * as Yup from 'yup';

export const validationSchemabuatKTP = Yup.object({
    forms: Yup.array().of(
        Yup.object({
            no_kk: Yup.string().required('Nomor KK Wajib diisi').length(16, 'Nomor KK harus berisi 16 karakter berupa angka'),
            nama: Yup.string().required('Nama wajib diisi'),
            tempat_lahir: Yup.string().required('Tempat lahir wajib diisi'),
            tanggal_lahir: Yup.string()
                .required('Tanggal lahir wajib diisi')
                .test('is-before-today', 'Tanggal lahir harus sebelum hari ini', (value) => {
                    if (!value) return false; // Jika tanggal lahir kosong, gagal validasi
                    const today = new Date();
                    const birthDate = new Date(value);
                    return birthDate < today; // Validasi tanggal lahir harus sebelum hari ini
                }),
            jenis_kelamin: Yup.object({
                jenis_kelamin: Yup.string().required('Jenis kelamin wajib diisi'),
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
                kewarganegaraan: Yup.string().required('Kewarganegaraan wajib diisi'),
            }).required('Kewarganegaraan wajib diisi'),
            status_hubungan: Yup.object({
                nama_status: Yup.string().required('Status hubungan wajib diisi'),
            }).required('Status hubungan wajib diisi'),
        })
    ),
});

export const validationSchemaEdit = Yup.object({
    forms: Yup.array().of(
        Yup.object({
            no_kk: Yup.string().required('Nomor KK Wajib diisi').length(16, 'NIK harus berisi 16 karakter berupa angka'),
            nama: Yup.string().required('Nama wajib diisi'),
            tempat_lahir: Yup.string().required('Tempat lahir wajib diisi'),
            tanggal_lahir: Yup.string()
                .required('Tanggal lahir wajib diisi')
                .test('is-before-today', 'Tanggal lahir harus sebelum hari ini', (value) => {
                    if (!value) return false;
                    const today = new Date();
                    const birthDate = new Date(value);
                    return birthDate < today; // Validasi tanggal lahir harus sebelum hari ini
                }),
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
        })
    ),
});

export const validationSchemaBuatKK = Yup.object()
    .shape({
        kepala_keluarga_nik: Yup.string().required('NIK kepala keluarga wajib diisi.').min(3, 'Minimal 3 karakter.').max(16, 'NIK berisi maksimal 16 karakter'),
        no_kk_semula: Yup.string().required('Nomor KK wajib diisi.').max(16, 'Nomor KK harus berisi 16 karakter berupa angka'),
        alamat: Yup.string().required('Alamat wajib diisi.').min(10, 'Alamat minimal 10 karakter.'),
        kelurahan: Yup.object().shape({
            name: Yup.string().required('Nama kelurahan/desa wajib diisi.').min(3, 'Nama kelurahan/desa minimal 3 karakter.'),
        }),
        kecamatan: Yup.object().shape({
            name: Yup.string().required('Nama kecamatan wajib diisi.').min(3, 'Nama kecamatan minimal 3 karakter.'),
        }),
        kabupaten: Yup.object().shape({
            name: Yup.string().required('Nama kabupaten wajib diisi.').min(3, 'Nama kabupaten minimal 3 karakter.'),
        }),
        rt: Yup.string()
            .nullable() // Tidak wajib
            .matches(/^\d+$/, 'RT hanya boleh berisi angka') // Memastikan hanya angka
            .length(3, 'RT harus terdiri dari 3 digit'), // Memastikan panjang tepat 3 digit
        rw: Yup.string()
            .nullable() // Tidak wajib
            .matches(/^\d+$/, 'RW hanya boleh berisi angka') // Memastikan hanya angka
            .length(3, 'RW harus terdiri dari 3 digit'),
    })
    .test('rt-rw-rule', 'Jika RT atau RW diisi, maka keduanya wajib diisi', (values) => {
        const { rt, rw } = values || {}; // Pastikan values ada
        if ((rt && !rw) || (!rt && rw)) {
            return false;
        }
        return true;
    });

export const validationSchemaPindahKK = Yup.object().shape({
    nikPemohon: Yup.string()
        .required('NIK Pemohon wajib diisi')
        .matches(/^\d{16}$/, 'NIK harus berupa 16 digit angka'),
    namaPemohon: Yup.string().required('Nama Pemohon wajib diisi'),
    noKKLama: Yup.string()
        .required('No KK Lama wajib diisi')
        .matches(/^\d{16}$/, 'No KK Lama harus berupa 16 digit angka'),

    noKKBaru: Yup.string()
        .required('No KK Baru wajib diisi')
        .matches(/^\d{16}$/, 'No KK Baru harus berupa 16 digit angka'),
    statusHubunganLama: Yup.object().shape({
        name: Yup.string().required('Status Hubungan Keluarga Lama Wajib Diisi'),
    }),
    statusHubunganBaru: Yup.object().shape({
        name: Yup.string().required('Status Hubungan Keluarga Baru Wajib Diisi'),
    }),
});
