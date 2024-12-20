import { InputPendudukProps, TypeFormFieldBuatKK } from '@/interface/interface';

export const formFieldBiodata: InputPendudukProps = {
    no_kk: '',
    nama: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: { id: '', jenis_kelamin: '' },
    gol_darahs: { id: '', gol_darah: '' },
    agama: { id: '', agama: '' },
    status_kawin: { id: '', status: '' },
    pekerjaan: { id: '', pekerjaan: '' },
    kewarganegaraan: { id: '', kewarganegaraan: '' },
};

export const formFieldBuatKK: TypeFormFieldBuatKK = {
    alamat: '',
    kepala_keluarga_nik: '',
    rt: '',
    rw: '',
    no_kk_semula: '',
    kelurahan: { id: '', name: '' },
    kecamatan: { id: '', name: '' },
    kabupaten: { id: '', name: '' },
};
