import { InputPendudukProps, TypeFormFieldBuatKK, TypeFormFieldPindahKK } from '@/interface/interface';

const BaseEntity = {
    id: '',
    name: '',
};

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
    status_hubungan: { id: '', nama_status: '' },
};

export const formFieldBuatKK: TypeFormFieldBuatKK = {
    alamat: '',
    kepala_keluarga_nik: '',
    rt: '',
    rw: '',
    no_kk_semula: '',
    kelurahan: { ...BaseEntity },
    kecamatan: { ...BaseEntity },
    kabupaten: { ...BaseEntity },
};

export const formFieldPindahKK: TypeFormFieldPindahKK = {
    nikPemohon: '',
    namaPemohon: '',
    noKKLama: '',
    noKKBaru: '',
    statusHubunganLama: { ...BaseEntity },
    statusHubunganBaru: { ...BaseEntity },
};
